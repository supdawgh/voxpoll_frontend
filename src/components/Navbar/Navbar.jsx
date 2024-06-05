import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
const Navbar = ({ setShowLogin, setShowHost }) => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu == "home" ? "active" : ""}
        >
          home
        </Link>
        <Link
          to="/host"
          // onClick={() => setShowHost(true)}
          onClick={() => setMenu("host")}
          className={menu == "host" ? "active" : ""}
        >
          host event
        </Link>
        <li
          onClick={() => setMenu("contact-us")}
          className={menu == "contact-us" ? "active" : ""}
        >
          contact-us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.searchicon} alt="" className="searchicon" />
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
