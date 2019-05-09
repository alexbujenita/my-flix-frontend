import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


import './SideBar.css'


class SideBar extends Component {

      // LOGOUT
  handleLogOut = () => {
    localStorage.clear('token');
  }

  //

    render() {
        return (
            <div className="sidebar">
                <Link to="/movies">
                    <button>MOVIES</button>
                </Link>
                <Link to="/collection">
                <button>COLLECTION</button>
                </Link>
                { localStorage.getItem("token") && <Link to='/' exact ><button onClick={this.handleLogOut}>LOG OUT</button></Link>   }
                <h3 className="logo">MyFliX</h3>
            </div>
        )
    }
}

export default SideBar