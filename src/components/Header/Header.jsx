import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Vote for your Favorite Candidate!</h2>
        <p>Details of the candidates</p>
        <Link to={`/event`}>
          <button>Explore Events</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
