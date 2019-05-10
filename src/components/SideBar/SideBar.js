import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import './SideBar.css'
import API from '../../API';


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
                { localStorage.getItem("token") && <Link to='/' ><button onClick={this.handleLogOut}>LOG OUT</button></Link>   }
                
                <h3 className="logo">MyFliX</h3>
            </div>
        )
    }
}

export default SideBar