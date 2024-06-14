import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin, setShowHost }) => {
  const [menu, setMenu] = useState("home");

  const { auth, setAuth } = useContext(StoreContext);

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
        {auth.user ? (
          <>
            <div>{auth.user.name}</div>
            <button
              onClick={() => {
                if (window.confirm("Are You Sure?")) setAuth({});
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}
        {/* <img src={assets.searchicon} alt="" className="searchicon" /> */}
      </div>
    </div>
  );
};

export default Navbar;
