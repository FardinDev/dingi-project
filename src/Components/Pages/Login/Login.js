import React, { Component } from 'react';

import axios from "axios";
class Login extends Component {
  
  constructor(props){
    super(props)
    let isAuthenticated = false;
    let error = false;
    this.state = {
      username: '',
      password: '',
      isAuthenticated,
      error
    }

  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  } 
  onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://frontend.interview.dingi.work/user/login/',
      {
        username: this.state.username,
        password: this.state.password
      },
      {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
      }
    }
      
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // this.setState({
    //   isAuthenticated: true
    // });

    // localStorage.setItem('token', this.state.password);




  } 

  render() {
     
    return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.onSubmit}>
              <h3>LogIn</h3>
              <div className="form-group">
                  <label>User Name</label>
                  <input type="text" name="username" className="form-control" placeholder="Enter User Name" value={this.state.username} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password}  onChange={this.onChange}/>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>  
          </form>
      </div>
      </div>


    </React.Fragment>
    );
  }
}

export default Login;
