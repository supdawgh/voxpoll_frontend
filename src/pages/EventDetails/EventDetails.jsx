import React, { useContext } from "react";
import "./EventDetails.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URl } from "../../assets/assets";
import useSWR from "swr";
import { format } from "date-fns";
//import { name_list } from '../../assets/assets';
//import { Link } from 'react-router-dom'

const fetcher = (url) => fetch(url).then((r) => r.json());
const EventDetails = ({ category, setCategory }) => {
  const { id } = useParams();

  const {
    data: event,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events/${id}`, fetcher);

  console.log(event);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="event">
      <div className="event-name">
        <div className="event-name-list">
          <h2>{event.eventName}</h2>
          <p>{event.eventDescription}</p>
          <p>Candidates :{event.candidates.length}</p>
          <p>Ends on :{format(event.eventEndDate, "PPP")}</p>
        </div>
        <br />
        <hr />
        <div className="name-display-list">
          {event.candidates.map((candidate) => (
            <div key={candidate._id} className="name-item">
              <div className="name-item-img-container">
                <img
                  className="name-item-image"
                  src={candidate.photo}
                  alt={candidate.name}
                />
              </div>
              <div className="name-item-info">
                <h3>{candidate.name}</h3>
                <p>{candidate.bio}</p>
                <button className="vote-button">Vote</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
