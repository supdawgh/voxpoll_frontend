import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./Host.css";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import useSWR, { mutate } from "swr";
import { API_BASE_URl } from "../../assets/assets";
import { format } from "date-fns";

const formInitialState = {
  eventName: "",
  eventType: "dance",
  eventDescription: "",
  eventBanner: "",
  eventStartDate: "",
  eventEndDate: "",
  candidates: [],
};

const candidateInitialState = {
  name: "",
  bio: "",
  photo: "",
};

const Host = ({ setShowLogin }) => {
  const { auth, axiosins } = useContext(StoreContext);
  const fetcher = (url) => axiosins.get(url).then((r) => r.data);
  const {
    data: events,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/myevent/all`, fetcher);

  console.log(events);
  const [newEventForm, setNewEventForm] = useState(false);

  const [formState, setFormState] = useState(formInitialState);
  const [candidates, setCandidates] = useState(candidateInitialState);

  function handleAddCandidate() {
    if (!candidates.name || !candidates.bio || !candidates.photo)
      return toast.error("Provide all fields");

    setFormState((prev) => {
      return {
        ...prev,
        candidates: [
          ...formState.candidates,
          {
            ...candidates,
            id: uuidv4(),
          },
        ],
      };
    });
    setCandidates(candidateInitialState);
  }

  function handleRemoveCandidate(id) {
    if (!id) return;
    setFormState((prev) => {
      return {
        ...prev,
        candidates: prev.candidates.filter((candidate) => candidate.id !== id),
      };
    });
  }

  function handleSubmitEvent(e) {
    e.preventDefault();
    if (
      !formState.eventName ||
      !formState.eventType ||
      !formState.eventDescription ||
      !formState.eventBanner ||
      !formState.eventStartDate ||
      !formState.eventEndDate ||
      formState.candidates.length === 0
    ) {
      return toast.error("Fill all the fields");
    }

    try {
      axiosins
        .post("/myevent", {
          ...formState,
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Event Submit Successful");
            setFormState(formInitialState);
            setNewEventForm(false);
            mutate(`${API_BASE_URl}/myevent/all`);
          }
        })
        .catch((response) => {
          if (response.response.status == 500) {
            toast.error("Server Error");
          }
        });
    } catch (error) {
      toast.error(error);
    }
  }

  let content;

  if (!auth.user) {
    content = (
      <div>
        <div className="no-user-host-container">
          <h2>You are Not Logged in!!</h2>
          <p>Please login to start hosting your events</p>
          <button onClick={() => setShowLogin(true)}>Login</button>
        </div>
      </div>
    );
  } else {
    content = (
      <>
        <div className="host-container">
          <div className="host-title">
            <h2>Your Events</h2>
            <p>{events?.length > 0 ? null : "No events"}</p>
            <div>
              {events?.map((event) => {
                return (
                  <div key={event._id} className="product-card">
                    <div className="badge">{event.eventStatus}</div>
                    <div className="product-tumb">
                      <img src={event.eventBanner} alt=""></img>
                    </div>
                    <div className="product-details">
                      <span className="product-catagory">
                        {event.eventType}
                      </span>
                      <h4>
                        <a>{event.eventName}</a>
                      </h4>
                      <p>{event.eventDescription}</p>
                      <p>Start: &nbsp; {format(event.eventStartDate, "PPP")}</p>
                      <p>End: &nbsp; {format(event.eventEndDate, "PPP")}</p>
                      <div className="product-bottom-details">
                        <div className="product-price">
                          Candiates: {event.candidates.length}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="host-container">
          <button onClick={() => setNewEventForm((prev) => !prev)}>
            {" "}
            {newEventForm ? "Close" : "New Event"}
          </button>
        </div>
        {newEventForm && (
          <div>
            <form className="host-container" onSubmit={handleSubmitEvent}>
              <div className="host-title">
                <h2>Fill the form to host an event</h2>
                <p>
                  The administrator will verify your event before it is hosted
                </p>
              </div>
              <div className="host-input">
                <label htmlFor="eventName">Event Name</label>
                <input
                  value={formState.eventName}
                  onChange={(e) =>
                    setFormState((prev) => {
                      return {
                        ...prev,
                        eventName: e.target.value,
                      };
                    })
                  }
                  type="text"
                  id="eventName"
                  placeholder="Name of your event"
                  required
                ></input>
                <label htmlFor="eventType">Event Type</label>
                <select
                  value={formState.eventType}
                  onChange={(e) =>
                    setFormState((prev) => {
                      return {
                        ...prev,
                        eventType: e.target.value,
                      };
                    })
                  }
                  id="eventType"
                >
                  <option value="dance">Dancing Competition</option>
                  <option value="sing">Singing Competition</option>
                  <option value="art">Art Competition</option>
                  <option value="pageant">Beauty Pageant</option>
                </select>

                <label htmlFor="eventName">Event Description</label>

                <textarea
                  value={formState.eventDescription}
                  onChange={(e) =>
                    setFormState((prev) => {
                      return {
                        ...prev,
                        eventDescription: e.target.value,
                      };
                    })
                  }
                  type="text"
                  placeholder="Event Description"
                  required
                ></textarea>

                <div className="date-input-container">
                  <div>
                    <label htmlFor="startDate">Event Start Date</label>
                    <input
                      value={formState.eventStartDate}
                      onChange={(e) =>
                        setFormState((prev) => {
                          return {
                            ...prev,
                            eventStartDate: e.target.value,
                          };
                        })
                      }
                      type="date"
                      id="startDate"
                      placeholder="Event Start Date"
                      required
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="endDate">Event End Date</label>
                    <input
                      value={formState.eventEndDate}
                      onChange={(e) =>
                        setFormState((prev) => {
                          return {
                            ...prev,
                            eventEndDate: e.target.value,
                          };
                        })
                      }
                      type="date"
                      id="endDate"
                      placeholder="Event Finish Date"
                      required
                    ></input>
                  </div>
                </div>
                <label htmlFor="eventBanner">Event Banner</label>
                <input
                  value={formState.eventBanner}
                  onChange={(e) =>
                    setFormState((prev) => {
                      return {
                        ...prev,
                        eventBanner: e.target.value,
                      };
                    })
                  }
                  type="text"
                  id="eventBanner"
                  placeholder="Url of the banner image"
                  required
                ></input>
                <h3>Candidates</h3>

                {formState.candidates.map((candidate) => {
                  return (
                    <div key={candidate.id} className="candidate">
                      <div className="candiadte-info">
                        <img
                          className="candidate-photo"
                          src={candidate.photo}
                        ></img>
                        <div>
                          <div>{candidate.name}</div>
                          <div>{candidate.bio}</div>
                        </div>
                      </div>
                      <div
                        className="cross"
                        onClick={() => handleRemoveCandidate(candidate.id)}
                      >
                        X
                      </div>
                    </div>
                  );
                })}

                <div className="new-candidate">
                  <h3>New Candidate</h3>
                  <label htmlFor="newCandidateName">Candidate Name</label>
                  <input
                    value={candidates.name}
                    onChange={(e) =>
                      setCandidates((prev) => {
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      })
                    }
                    type="text"
                    id="newCandidateName"
                    placeholder="Name"
                  ></input>
                  <label htmlFor="newCandidateBio">Candidate Bio</label>
                  <input
                    value={candidates.bio}
                    onChange={(e) =>
                      setCandidates((prev) => {
                        return {
                          ...prev,
                          bio: e.target.value,
                        };
                      })
                    }
                    type="text"
                    id="newCandidateBio"
                    placeholder="Bio"
                  ></input>
                  <label htmlFor="candidateURL">Candidate Photo URL</label>
                  <input
                    value={candidates.photo}
                    onChange={(e) =>
                      setCandidates((prev) => {
                        return {
                          ...prev,
                          photo: e.target.value,
                        };
                      })
                    }
                    type="text"
                    id="candidateURL"
                    placeholder="Photo url"
                  ></input>
                </div>

                <button
                  onClick={handleAddCandidate}
                  type="button"
                  className="candidate-button"
                >
                  Add Candidate
                </button>
              </div>

              <button>Submit Event</button>
            </form>
          </div>
        )}
      </>
    );
  }

  return content;
};

export default Host;
