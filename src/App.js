import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import ItemList from "./Components/Pages/ItemList/ItemList";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { isLoggedIn } = this.props.auth;
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              component={() => {
                if (isLoggedIn) {
                  return <Redirect to="/"></Redirect>;
                } else {
                  return <Login />;
                }
              }}
            />
            <Route
              exact
              path="/"
              component={(props) => {
                if (!isLoggedIn) {
                  return <Redirect to="/login"></Redirect>;
                } else {
                  return <Home />;
                }
              }}
            />
            <Route
              exact
              path="/item-list"
              component={(props) => {
                if (!isLoggedIn) {
                  return <Redirect to="/login"></Redirect>;
                } else {
                  return <ItemList />;
                }
              }}
            />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  token: state.token,
});

export default connect(mapStateToProps, {})(App);
