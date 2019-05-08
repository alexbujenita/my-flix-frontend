import React, { Component } from "react";
import "./LogIn.css";

class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state)    
  }

  render() {
    return (
      <div>
        <form className="login-text" onSubmit={this.handleSubmit}>
          <h5>Log In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="input-field">
              <button>Login</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
