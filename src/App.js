import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import ItemList from "./Components/Pages/ItemList/ItemList";

function App() {

  const Routes = ({component: Component, ...rest}) => {
    return (
      <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path='/' component={Home} />
      <Route exact path='/item-list' component={ItemList} />
      </Switch>
    );
  };

  return (
    <React.Fragment>
      <Router>
            <Routes />
      </Router>
    </React.Fragment>
  );
}

export default App;
