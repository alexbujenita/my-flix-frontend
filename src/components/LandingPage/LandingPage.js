import React from 'react';
import { Redirect } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import "./LandingPage.css";
import Signup from '../../Signup/Signup';

const LandingPage = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    return isLoggedIn ? 
    (
      <Redirect to="/movies" />
    )
    :
    (
      <div className="container">
        <h1 className="title">Welcome to MyFliX</h1>
        <h3>Please login or sign up</h3>
        <LogIn />
        <Signup />
      </div>
    )
  }


export default LandingPage