import React, { useContext } from "react";
import "./Candidate.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Candidate = () => {
  const navigate = useNavigate();

  return (
    <div className="candidate">
      <div className="candidate-name">
        <div className="candidate-name-list">
          <h2>Name of Candidates</h2>
          <p>gu khaa!!!</p>
        </div>
        <br></br>
        <hr />
        <div className="candidate-name-display-list">
          {/* {name_list.map((item, index) => (
            <div key={index} className="candidate-name-item">
              <div className="candidate-name-item-img-container">
                <img
                  className="candidate-name-item-image"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="candidate-name-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Candidate;
