import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import ItemList from "./Components/Pages/ItemList/ItemList";
import { ProtectedRoute } from './Components/Auth/ProtectedRoute'
import { ProtectedLogin } from './Components/Auth/ProtectedLogin'
function App() {

  const Routes = ({component: Component, ...rest}) => {
    return (
      <Switch>
      <ProtectedLogin exact path="/login" component={Login} />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/item-list' component={ItemList} />
      <Route path="*" component={() => "404 NOT FOUND"} />
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
