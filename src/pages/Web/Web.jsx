import React, { useContext, useState, useRef } from "react";
import "./Web.css";
import Webcam from "react-webcam";
import { StoreContext } from "../../context/StoreContext";
import useSWR from "swr";

const Web = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const { axiosins } = useContext(StoreContext);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const sendImage = async () => {
    capture();
    try {
      if (capturedImage) {
        const response = await axiosins.post("document/compare-image", {
          webCamImage: capturedImage,
          citizenshipNumber: "31-65-014543",
          rastriyaPrarichayaPatraNumber: "R123",
        });

        console.log(response.data);
      }
    } catch (error) {
      console.error(
        "Error sending image:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
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
          <button className="web-verify" onClick={sendImage}>
            Verify Identity
          </button>
        </div>
      ) : (
        <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
      )}
    </div>
  );
};

export default Web;
