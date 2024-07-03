import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./Host.css";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import useSWR, { mutate } from "swr";
import { API_BASE_URl } from "../../assets/assets";
import { format } from "date-fns";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

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
  const navigate = useNavigate();
  const fetcher = (url) => axiosins.get(url).then((r) => r.data);
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URl}/myevent/all`,
    fetcher
  );

  const [searchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "events";

  const [newEventForm, setNewEventForm] = useState(false);
  const [formState, setFormState] = useState(formInitialState);
  const [candidates, setCandidates] = useState(candidateInitialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function handleAddCandidate(e) {
    e.preventDefault();
    if (!candidates.name || !candidates.bio || !candidates.photo)
      return toast.error("Provide all fields");

    setFormState((prev) => ({
      ...prev,
      candidates: [...prev.candidates, { ...candidates, id: uuidv4() }],
    }));
    setCandidates(candidateInitialState);
  }

  function handleRemoveCandidate(id) {
    if (!id) return;
    setFormState((prev) => ({
      ...prev,
      candidates: prev.candidates.filter((candidate) => candidate.id !== id),
    }));
  }

  const handleSubmitEvent = (data) => {
    if (formState.candidates.length === 0) {
      return toast.error("Add at least one candidate");
    }

    const {
      eventName,
      eventType,
      eventDescription,
      eventBanner,
      eventStartDate,
      eventEndDate,
    } = data;

    try {
      axiosins
        .post("/myevent", {
          eventName,
          eventType,
          eventDescription,
          eventBanner,
          eventStartDate,
          eventEndDate,
          candidates: formState.candidates,
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Event Submit Successful");
            setFormState(formInitialState);
            setNewEventForm(false);
            mutate(`${API_BASE_URl}/myevent/all`);
          }
        })
        .catch((error) => {
          if (error.response?.status === 500) {
            toast.error("Server Error");
          } else {
            toast.error("An error occurred");
          }
        });
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  let content;
  if (!auth.user) {
    return (
      <div>
        <div className="no-user-host-container">
          <h2>You are Not Logged in!!</h2>
          <p>Please login to start hosting your events</p>
          <button onClick={() => setShowLogin(true)}>Login</button>
        </div>
      </div>
    );
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="host-container">
          <div className="host-title">
            <div style={{ display: "flex", gap: "50px" }}>
              <h2
                onClick={() => {
                  navigate("/host?tab=events");
                }}
                style={{
                  textDecoration: tab === "events" ? "underline" : "",
                  cursor: "pointer",
                }}
              >
                Your Events
              </h2>
              <h2
                onClick={() => {
                  navigate("/host?tab=votes");
                }}
                style={{
                  textDecoration: tab === "votes" ? "underline" : "",
                  cursor: "pointer",
                }}
              >
                Your Votes
              </h2>
            </div>
            <p>{data.events?.length > 0 ? null : "No events"}</p>
            {tab === "events" && (
              <div>
                {data.events &&
                  data.events.map((event) => {
                    const startDate = new Date(event.eventStartDate);
                    const endDate = new Date(event.eventEndDate);
                    return (
                      <Link
                        to={`/host/${event._id}`}
                        key={event._id}
                        className="product-card-link"
                      >
                        <div className="product-card">
                          <div className="badge">{event.eventStatus}</div>
                          <div className="product-tumb">
                            <img
                              src={event.eventBanner}
                              alt="Event Banner"
                            ></img>
                          </div>
                          <div className="product-details">
                            <span className="product-catagory">
                              {event.eventType}
                            </span>
                            <h4>
                              <a>{event.eventName}</a>
                            </h4>
                            <p>{event.eventDescription}</p>
                            <p>Start: {format(startDate, "PPP")}</p>
                            <p>End: {format(endDate, "PPP")}</p>
                            <div className="product-bottom-details">
                              <div className="product-price">
                                Candidates: {event.candidates.length}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        {tab === "events" && (
          <div className="host-container">
            <button onClick={() => setNewEventForm((prev) => !prev)}>
              {newEventForm ? "Close" : "New Event"}
            </button>
          </div>
        )}
        {tab === "votes" && (
          <div>
            {data.votes.map((vote, index) => {
              return (
                <div
                  className="host-container"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "1px solid black",
                    borderRadius: "0",
                  }}
                  key={vote._id}
                >
                  <div>{index + 1}</div>
                  <div style={{ fontWeight: "bold" }}>{vote.name}</div>
                  <div>{vote.bio}</div>
                </div>
              );
            })}
          </div>
        )}
        {newEventForm && (
          <div>
            <form
              className="host-container"
              onSubmit={handleSubmit(handleSubmitEvent)}
            >
              <div className="host-title">
                <h2>Fill the form to host an event</h2>
                <p>
                  The administrator will verify your event before it is hosted
                </p>
              </div>
              <div className="host-input">
                <label htmlFor="eventName">Event Name</label>
                <input
                  {...register("eventName", {
                    required: "Event name is required",
                  })}
                  value={formState.eventName}
                  onChange={(e) =>
                    setFormState({ ...formState, eventName: e.target.value })
                  }
                  type="text"
                  id="eventName"
                  placeholder="Name of your event"
                ></input>
                {errors.eventName && (
                  <p className="error-message">{errors.eventName.message}</p>
                )}

                <label htmlFor="eventType">Event Type</label>
                <select
                  {...register("eventType", {
                    required: "Event type is required",
                  })}
                  value={formState.eventType}
                  onChange={(e) =>
                    setFormState({ ...formState, eventType: e.target.value })
                  }
                  id="eventType"
                >
                  <option value="dance">Dancing Competition</option>
                  <option value="sing">Singing Competition</option>
                  <option value="art">Art Competition</option>
                  <option value="pageant">Beauty Pageant</option>
                </select>
                {errors.eventType && (
                  <p className="error-message">{errors.eventType.message}</p>
                )}

                <label htmlFor="eventDescription">Event Description</label>
                <textarea
                  {...register("eventDescription", {
                    required: "Event description is required",
                  })}
                  value={formState.eventDescription}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      eventDescription: e.target.value,
                    })
                  }
                  placeholder="Event Description"
                ></textarea>
                {errors.eventDescription && (
                  <p className="error-message">
                    {errors.eventDescription.message}
                  </p>
                )}

                <div className="date-input-container">
                  <div>
                    <label htmlFor="startDate">Event Start Date</label>
                    <input
                      {...register("eventStartDate", {
                        required: "Start date is required",
                      })}
                      value={formState.eventStartDate}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          eventStartDate: e.target.value,
                        })
                      }
                      type="date"
                      id="startDate"
                      placeholder="Event Start Date"
                    ></input>
                    {errors.eventStartDate && (
                      <p className="error-message">
                        {errors.eventStartDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="endDate">Event End Date</label>
                    <input
                      {...register("eventEndDate", {
                        required: "End date is required",
                      })}
                      value={formState.eventEndDate}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          eventEndDate: e.target.value,
                        })
                      }
                      type="date"
                      id="endDate"
                      placeholder="Event Finish Date"
                    ></input>
                    {errors.eventEndDate && (
                      <p className="error-message">
                        {errors.eventEndDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <label htmlFor="eventBanner">Event Banner</label>
                <input
                  {...register("eventBanner", {
                    required: "Banner URL is required",
                  })}
                  value={formState.eventBanner}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      eventBanner: e.target.value,
                    })
                  }
                  type="text"
                  id="eventBanner"
                  placeholder="Url of the banner image"
                ></input>
                {errors.eventBanner && (
                  <p className="error-message">{errors.eventBanner.message}</p>
                )}

                <h3>Candidates</h3>
                {formState.candidates.map((candidate) => (
                  <div key={candidate.id} className="candidate">
                    <div className="candidate-info">
                      <img
                        className="candidate-photo"
                        src={candidate.photo}
                        alt="Candidate"
                      />
                      <div>
                        <div>{candidate.name}</div>
                        <div>{candidate.bio}</div>
                      </div>
                    </div>
                    <div
                      className="cross"
                      onClick={() => handleRemoveCandidate(candidate.id)}
                    >
                      <RxCross2 />
                    </div>
                  </div>
                ))}

                <div className="new-candidate">
                  <h3>New Candidate</h3>
                  <label htmlFor="newCandidateName">Candidate Name</label>
                  <input
                    value={candidates.name}
                    onChange={(e) =>
                      setCandidates({ ...candidates, name: e.target.value })
                    }
                    type="text"
                    id="newCandidateName"
                    placeholder="Name"
                  ></input>
                  <label htmlFor="newCandidateBio">Candidate Bio</label>
                  <input
                    value={candidates.bio}
                    onChange={(e) =>
                      setCandidates({ ...candidates, bio: e.target.value })
                    }
                    type="text"
                    id="newCandidateBio"
                    placeholder="Bio"
                  ></input>
                  <label htmlFor="candidateURL">Candidate Photo URL</label>
                  <input
                    value={candidates.photo}
                    onChange={(e) =>
                      setCandidates({ ...candidates, photo: e.target.value })
                    }
                    type="text"
                    id="candidateURL"
                    placeholder="Photo URL"
                  ></input>
                </div>

                <button
                  type="button"
                  className="candidate-button"
                  onClick={handleAddCandidate}
                >
                  Add Candidate
                </button>
              </div>
              <button type="submit">Submit Event</button>
            </form>
          </div>
        )}
      </>
    );
  }
};

export default Host;
