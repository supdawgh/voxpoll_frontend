import React, { useContext, useState, useRef } from "react";
import "./Web.css";
import Webcam from "react-webcam";
import { StoreContext } from "../../context/StoreContext";
import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URl } from "../../assets/assets";
import toast from "react-hot-toast";

const Web = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const webcamRef = useRef(null);
  const { auth, setAuth, axiosins } = useContext(StoreContext);
  const [identityError, setIdentityError] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const fetcher = (url) => axiosins.get(url).then((r) => r.data);

  const {
    data: candidate,
    error,
    isLoading,
  } = useSWR(`${API_BASE_URl}/events/candidate/${id}`, fetcher);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const sendImage = async () => {
    setIdentityError(false);
    setIsVoting(true);
    capture();
    try {
      if (capturedImage) {
        const response = await axiosins.post("document/compare-image", {
          webCamImage: capturedImage,
          citizenshipNumber: "31-65-014543",
          rastriyaPrarichayaPatraNumber: "R123",
          candidate: id,
          voter: auth.user._id,
        });
        if (response.status === 201) {
          const newUser = await fetcher(
            `${API_BASE_URl}/users/my/${auth.user._id}`
          );

          console.log(newUser);
          setAuth(newUser);
          toast.success("Vote Successful");
          navigate("/host?tab=votes");
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        setIdentityError(true);
        toast.error("Face did not match");
      }
      console.error(
        "Error sending image:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsVoting(false);
    }
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div
        style={{
          width: "30%",
          margin: "auto",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ fontWeight: "bold" }}> VOTE FOR</div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <img
              style={{ width: "100px", height: "100px" }}
              src={candidate.photo}
            />
          </div>
          <div>
            <div style={{ color: "grey", fontWeight: "bold" }}>
              {candidate.name}
            </div>
            <div style={{ color: "grey" }}>{candidate.bio}</div>
          </div>
        </div>
      </div>
      <div className="web-face">
        {isCameraOpen ? (
          <div className="web-cam-container">
            <Webcam
              audio={false}
              className="web-cam"
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <button
              className="close-button"
              onClick={() => setIsCameraOpen(false)}
            >
              x
            </button>
            {isVoting ? (
              <button className="web-verify" disabled>
                VOTING...
              </button>
            ) : (
              <button className="web-verify" onClick={sendImage}>
                VOTE
              </button>
            )}
            {identityError && (
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Try Again !!
                <br />
                with better lighting,
                <br />
                no glasses,
                <br />
                and no strong expression
                <br />
              </p>
            )}
          </div>
        ) : (
          <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
        )}
      </div>
    </>
  );
};

export default Web;
