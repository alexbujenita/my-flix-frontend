import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import API from "../../API";
import "./LogIn.css";

class LogIn extends PureComponent {
  state = {
    email: "",
    password: ""
  };
  // LOGIN
  loginUser = credentials => {
    API.login(credentials).then(authData => {
      if (authData.error) {
        alert("Wrong username or password");
      } else {
        localStorage.setItem("token", authData.jwt);
        this.props.history.push("/movies");
      }
    });
  };
  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.loginUser(this.state);
  };

  render() {
    return (
      <div className="login-form">
        <form className="login-text" onSubmit={this.handleSubmit}>
          <h5 className="login-title">Log In</h5>
          <div className="input-field">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="input-field">
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LogIn);
