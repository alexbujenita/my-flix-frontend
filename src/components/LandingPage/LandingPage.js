import React, { Component } from 'react'
import LogIn from '../LogIn/LogIn';

class LandingPage extends Component {

 

  render() {
    return (
      <div>
        <h1 style={{color: 'white'}}>Welcome to MyFliX</h1>
        <h2>Please login or sign up</h2>
        <h2>Link to login</h2>
        <h2>Link to signup</h2>
        <LogIn loginUser={this.props.loginUser} />
      </div>
    )
  }
}

export default LandingPage