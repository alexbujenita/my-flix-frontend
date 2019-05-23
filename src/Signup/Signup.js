import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import API from "../API";
import "./Signup.css";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    name: ''
  };
  // SIGN UP
  signupUser = (state) => {
    API.createUser(this.state)
      .then(authData => {
        localStorage.setItem("token", authData.jwt);
        this.props.history.push("/movies");
      })
  }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.signupUser(this.state)    
  }

  render() {
    return (
      <div className="login-form">
        <form className="login-text" onSubmit={this.handleSubmit}>
          <h5 className="login-title">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="name">Name: </label>
            <input
              type="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
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
              <button type="submit">Create account</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
