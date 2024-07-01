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

  const today = new Date();

  const newEvents = events.filter((event) => {
    return (
      new Date(event.eventEndDate) > today &&
      new Date(event.eventStartDate) < today
    );
  });

  return (
    <div className="name-display" id="name-display">
      <h2>New Events !!</h2>
      <div className="name-display-list">
        {newEvents.length > 0 ? (
          newEvents.map((event, index) => {
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
      <hr />
    </div>
  );
};

export default NameDisplay;
