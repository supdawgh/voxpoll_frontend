import React, { useContext } from "react";
import "./CategorizedEvents.css";
import { StoreContext } from "../../context/StoreContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { API_BASE_URl } from "../../assets/assets";
//import { name_list } from '../../assets/assets';
//import { Link } from 'react-router-dom'
const fetcher = (url) => fetch(url).then((r) => r.json());

const CategorizedEvents = ({ category, setCategory }) => {
  let { pathname } = useLocation();

  category = pathname.split("/").at(-1);

  let title = "";
  let des = "";

  const {
    data: events,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events/category/${category}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  switch (category) {
    case "sing":
      title = "Singing";
      des = "singing";
      // code block
      break;
    case "art":
      title = "Art";
      des = "art";
      // code block
      break;

    case "pageant":
      title = "Beauty";
      des = "beauty";
      // code block
      break;
    case "dance":
      title = "Dancing";
      des = "dancing";
      // code block
      break;
  }

  return (
    <div className="event">
      <div className="event-name">
        <div className="event-name-list">
          <h2>{title} Competitions</h2>
          <p>These are all the {des} Competitions happening now.</p>
        </div>
        <br />
        <hr />
        <div className="name-display-list">
          {events.map((event, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorizedEvents;
