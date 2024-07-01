import useSWR from "swr";
import { API_BASE_URl } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import NameItem from "../NameItem/NameItem";

function NameDisplay3() {
  const { auth, axiosins } = useContext(StoreContext);

  const datatleraaija = (url) => axiosins.get(url).then((r) => r.data);

  const {
    data: events,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events`, datatleraaija);

  const today = new Date();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const upcomingEvents = events.filter((event) => {
    return today < new Date(event.eventStartDate);
  });

  return (
    <div className="name-display" id="name-display">
      <h2>Upcoming event</h2>
      <div className="name-display-list">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => {
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
          <div>No Upcoming Events </div>
        )}
      </div>
      <hr />
    </div>
  );
}

export default NameDisplay3;
