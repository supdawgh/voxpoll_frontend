import React, { useContext, useState } from "react";
import "./EventDetails.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URl } from "../../assets/assets";
import useSWR from "swr";
import { format } from "date-fns";
import Web from "../Web/Web";

function getCandidateWithHighestVotes(candidates) {
  if (candidates.length === 0) {
    return null; // Return null if the candidates array is empty
  }

  let highestVoteCandidate = candidates[0];

  for (let i = 1; i < candidates.length; i++) {
    if (candidates[i].voteCount > highestVoteCandidate.voteCount) {
      highestVoteCandidate = candidates[i];
    }
  }

  return highestVoteCandidate;
}

const fetcher = (url) => fetch(url).then((r) => r.json());

const EventDetails = ({ setShowLogin }) => {
  const { id } = useParams();
  const { auth } = useContext(StoreContext);
  const navigate = useNavigate();
  const {
    data: event,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events/${id}`, fetcher);

  let candidates = [];

  if (event) {
    candidates = event.candidates;
  }

  const winner = getCandidateWithHighestVotes(candidates);
  const today = new Date();

  if (event) {
    candidates = event;
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="event">
      <div className="event-name">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="event-name-list">
            <h2>{event.eventName}</h2>
            <p>{event.eventDescription}</p>
            <p>Candidates :{event.candidates.length}</p>
            <p>Ends on :{format(event.eventEndDate, "PPP")}</p>
          </div>
          {new Date(event.eventEndDate) < today && (
            <div>
              <div className="name-item">
                <div className="name-item-img-container">
                  <img
                    className="name-item-image"
                    src={winner.photo}
                    alt={winner.name}
                  />
                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    Winnerrr !!
                  </p>
                </div>
                <div className="name-item-info">
                  <h3 style={{ textAlign: "center" }}>{winner.name}</h3>
                </div>
              </div>
            </div>
          )}
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
                {new Date(event.eventEndDate) > today &&
                  new Date(event.eventStartDate) < today && (
                    <button
                      className="vote-button"
                      onClick={() => {
                        if (!auth.user) return setShowLogin(true);
                        navigate("/web");
                      }} //esma ho
                    >
                      Vote
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
