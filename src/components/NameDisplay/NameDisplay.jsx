import React, { useContext } from "react";
import "./NameDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import NameItem from "../NameItem/NameItem";
import useSWR from "swr";
import { API_BASE_URl } from "../../assets/assets";

const NameDisplay = ({ category }) => {
  const { auth, axiosins } = useContext(StoreContext);

  const datatleraaija = (url) => axiosins.get(url).then((r) => r.data);

  const {
    data: events,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events`, datatleraaija);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="name-display" id="name-display">
      <h2>Upcoming Events</h2>
      <div className="name-display-list">
        {events.length > 0 ? (
          events.map((event, index) => {
            if (index > 5) return;
            return (
              <NameItem
                key={event._id}
                id={event._id}
                name={event.eventName}
                description={event.eventDescription}
                image={event.eventBanner}
              />
            );
          })
        ) : (
          <div>No recent events</div>
        )}
      </div>
    </div>
  );
};

export default NameDisplay;
