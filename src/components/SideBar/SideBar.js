import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SideBar.css'


class SideBar extends Component {


    render() {
        return (
            <div className="sidebar">
                <Link to="/movies">
                    <button>MOVIES</button>
                </Link>
                <Link to="/collection">
                <button>COLLECTION</button>
                </Link>
                <h3 className="logo">MyFliX</h3>
            </div>
        )
    }
}

export default SideBar