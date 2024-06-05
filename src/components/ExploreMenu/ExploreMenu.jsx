import React from "react";
import "./ExploreMenu.css";
import { category_list } from "../../assets/assets";
import { Link } from "react-router-dom";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Events</h1>
      <p className="explore-menu-text">
        Vote for the candidate that you think is hakdar
      </p>
      <div className="explore-menu-list">
        {category_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <Link to={`/event/category/${item.param}`}>
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt=""
                />
              </Link>
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
