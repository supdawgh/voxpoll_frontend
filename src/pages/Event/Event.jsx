import React, { useContext } from "react";
import "./Event.css";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { API_BASE_URl } from "../../assets/assets";
//import { name_list } from '../../assets/assets';
//import { Link } from 'react-router-dom'
const fetcher = (url) => fetch(url).then((r) => r.json());

const Event = ({ category, setCategory }) => {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="event">
      <div className="event-name">
        <div className="event-name-list">
          <h2>All Competition</h2>
          <p>These are all the Competitions happening now.</p>
        </div>
        <br />
        <hr />
        <div className="name-display-list">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={event._id} className="name-item">
                <Link to={`/event/${event._id}`}>
                  <div className="name-item-img-container">
                    <img
                      className="name-item-image"
                      src={event.eventBanner}
                      alt={event.eventName}
                    />
                  </div>
                  <div className="name-item-info">
                    <h3>{event.eventName}</h3>
                    <p>{event.eventDescription}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>No Events</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
