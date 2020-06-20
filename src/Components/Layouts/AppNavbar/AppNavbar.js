import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar,Nav} from 'react-bootstrap';
import Auth from '../../Auth/Auth';
import { withRouter } from "react-router-dom";
 class AppNavbar extends Component {
  constructor(props){
    super(props);
  }

  logout = () => {
    
    
    Auth.logout(() => {
      this.props.history.push("/login");
    });

  }

  render() {
    return <div><Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <NavLink className="navbar-brand" to="/">Dingi-Project</NavLink>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink exact className='nav-link' activeClassName="active" to="/">Dashboard</NavLink>
        <NavLink className='nav-link' activeClassName="active" to='/item-list'>Item List</NavLink>

      </Nav>
      <Nav>
        <Nav.Link href="#" onClick={this.logout}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar></div>;
  }
}

export default withRouter(AppNavbar);
