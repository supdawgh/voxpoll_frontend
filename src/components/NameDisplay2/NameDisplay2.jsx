import React, { useContext } from "react";
import "./NameDisplay2.css";
import { StoreContext } from "../../context/StoreContext";
import NameItem from "../NameItem/NameItem";
import { API_BASE_URl } from "../../assets/assets";
import useSWR from "swr";

const NameDisplay2 = () => {
  // const {name_list}=useContext(StoreContext)
  const { auth, axiosins } = useContext(StoreContext);

  const datatleraaija = (url) => axiosins.get(url).then((r) => r.data);

  const {
    data: events,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events`, datatleraaija);

  const today = new Date();

  console.log(events);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const finishedEvents = events.filter((event) => {
    return today > new Date(event.eventEndDate);
  });

  console.log(finishedEvents);

  return (
    <div className="name-display" id="name-display">
      <h2>Finished event</h2>
      <div className="name-display-list">
        {finishedEvents.length > 0 ? (
          finishedEvents.map((event, index) => {
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
          <div>No Finished Competitions</div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default NameDisplay2;
