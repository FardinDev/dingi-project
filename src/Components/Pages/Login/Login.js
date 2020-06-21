import React, { Component } from "react";

import axios from "axios";
import { connect } from "react-redux";
import { authState } from "../../../Redux/Actions/AuthAction";

class Login extends Component {
  constructor(props) {
    super(props);
    let isAuthenticated = false;
    let error = false;
    this.state = {
      username: "",
      password: "",
      usernameError: null,
      passwordError: null,
      loading: false,
      loginError: "",
      isAuthenticated,
      error,
    };
  }

  validate = () => {
    let status = true;
    this.setState({
      loginError: null,
    });
    if (this.state.username === "") {
      status = false;
      this.setState({
        usernameError: "Username Can Not Be Empty",
      });
    } else {
      status = true;
      this.setState({
        usernameError: null,
      });
    }
    if (this.state.password === "") {
      status = false;
      this.setState({
        passwordError: "Password Can Not Be Empty",
      });
    } else {
      status = true;
      this.setState({
        passwordError: null,
      });
    }

    return status;
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.validate()) {
      this.setState({
        loading: true,
      });

      ///login success store auth = true
      let self = this;
      axios
        .post(
          "http://frontend.interview.dingi.work/user/login/",
          {
            username: this.state.username,
            password: this.state.password,
          },
          {
            validateStatus: function (status) {
              return status < 500; // Resolve only if the status code is less than 500
            },
          }
        )
        .then(function (response) {
          // console.log(response);
          self.setState({
            loading: false,
          });
          if (response.status === 200) {
            self.props.authState(true, response.data.jwt_token);
            // self.props.history.push("/");
          } else {
            self.setState({
              loginError: response.data.detail,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          self.setState({
            loading: false,
          });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.onSubmit}>
              <h3>
                <img src="dingi.png" alt="" />
              </h3>
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  className={
                    "form-control " +
                    (this.state.usernameError || this.state.loginError
                      ? "is-invalid"
                      : "")
                  }
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                {this.state.usernameError && (
                  <div className="invalid-feedback">
                    {this.state.usernameError}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className={
                    "form-control " +
                    (this.state.passwordError || this.state.loginError
                      ? "is-invalid"
                      : "")
                  }
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {this.state.passwordError && (
                  <div className="invalid-feedback">
                    {this.state.passwordError}
                  </div>
                )}
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  disabled={this.state.loading}
                  className={
                    "btn btn-primary btn-block " +
                    (this.state.loginError ? "is-invalid" : "")
                  }
                >
                  {" "}
                  {this.state.loading ? "Logging in..." : "Login"}
                </button>
                {this.state.loginError && (
                  <div className="invalid-feedback text-center text-bold">
                    {this.state.loginError}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { authState })(Login);
