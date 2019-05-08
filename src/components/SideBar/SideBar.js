import React, { Component } from 'react';
import './SideBar.css'

class SideBar extends Component {


    render() {
        return (
            <div className="sidebar">
                <button>MOVIES</button>
                <button onClick={this.props.userFavorites}>COLLECTION</button>
                <button onClick={this.props.handleLogOut}>Log Out</button>
                <h3 className="logo">MyFliX</h3>
            </div>
        )
    }
}

export default SideBar