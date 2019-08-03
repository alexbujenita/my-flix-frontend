import React from "react";
import { Link } from "react-router-dom";

import "./SideBar.css";

const SideBar = () => {
  // LOGOUT
  function handleLogOut() {
    localStorage.clear("token");
  }

  return (
    <div className="sidebar">
      <Link to="/movies">
        <button>MOVIES</button>
      </Link>
      <Link to="/collection">
        <button>COLLECTION</button>
      </Link>
      {localStorage.getItem("token") && (
        <Link to="/">
          <button onClick={handleLogOut}>LOG OUT</button>
        </Link>
      )}
      <h3 className="logo">MyFliX</h3>
    </div>
  );
};

export default SideBar;
