import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./Host.css";

const Host = () => {
  const [candidates, setCandidates] = useState([
    {
      candidateName: "Adarsh",
      candidateBio: "Kuch karke dikhayenge",
      photo:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ]);

  return (
    <div className="">
      <form className="host-container">
        <div className="host-title">
          <h2>Fill the form to host an event</h2>
          <p>The administrator will verify your event before it is hosted</p>
        </div>
        <div className="host-input">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            placeholder="Name of your event"
            required
          ></input>
          <label htmlFor="organizerEmail">Organizer Email</label>

          <input type="email" placeholder="Organizer Email" required></input>
          <label htmlFor="eventName">Event Description</label>

          <textarea
            type="text"
            placeholder="Event Description"
            required
          ></textarea>

          <div className="date-input-container">
            <div>
              <label htmlFor="startDate">Event Start Date</label>
              <input
                type="date"
                id="startDate"
                placeholder="Event Start Date"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="endDate">Event End Date</label>
              <input
                type="date"
                id="endDate"
                placeholder="Event Finish Date"
                required
              ></input>
            </div>
          </div>
          <label htmlFor="eventBanner">Event Banner</label>
          <input
            type="text"
            id="eventBanner"
            placeholder="Url of the banner image"
            required
          ></input>
          <h3>Candidates</h3>

          {candidates.map((candidate, index) => {
            return (
              <div key={index} className="candidate">
                <div className="candiadte-info">
                  <img className="candidate-photo" src={candidate.photo}></img>
                  <div>
                    <div>{candidate.candidateName}</div>
                    <div>{candidate.candidateBio}</div>
                  </div>
                </div>
                <div className="cross">X</div>
              </div>
            );
          })}

          <div className="new-candidate">
            <h3>New Candidate</h3>
            <label htmlFor="newCandidateName">Candidate Name</label>
            <input
              type="text"
              id="newCandidateName"
              placeholder="Name"
              required
            ></input>
            <label htmlFor="newCandidateBio">Candidate Bio</label>
            <input
              type="text"
              id="newCandidateBio"
              placeholder="Bio"
              required
            ></input>
            <label htmlFor="candidateURL">Candidate Photo URL</label>
            <input
              type="text"
              id="candidateURL"
              placeholder="Photo url"
              required
            ></input>
          </div>

          <button type="button" className="candidate-button">
            Add Candidate
          </button>
        </div>
        <div className="host-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the details provided is accurate</p>
        </div>
        <button>Submit Event</button>
      </form>
    </div>
  );
};

export default Host;
