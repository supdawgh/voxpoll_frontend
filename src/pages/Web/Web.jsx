import React, { useContext, useState, useRef } from 'react';
import './Web.css';
import Webcam from 'react-webcam';
import { StoreContext } from '../../context/StoreContext';
import useSWR from 'swr';



const Web = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false); 
  const webcamRef = useRef(null);
  const { axiosins } = useContext(StoreContext);


    
  const [imageSrc, setImageSrc] = useState("");
  // Function to capture the photo
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  // const { data, error, mutate } = useSWR(
  //   '/users/faceRecognition', { image: imageSrc },
  //   fetcher,
  //   { revalidateOnFocus: false }
  // );

  const handleVerify = async () => {
    capturePhoto();
    // await mutate();
    // axiosins.post("/users/faceRecognition", {imageSrc}).then(res => {

    //   console.log(res.data); 
    // }
      
    // );
  };

  return (
    <div className='web-face'>
      {isCameraOpen ? (
        <div className='web-cam-container'>
          <Webcam
            audio={false}
            className='web-cam'
            ref={webcamRef}
            screenshotFormat='image/jpeg'
          />
          <button className='close-button' onClick={() => setIsCameraOpen(false)}>
            x
          </button>
          <button className='web-verify' onClick={handleVerify}>
            Verify Identity
          </button>
        </div>
      ) : (
        <button onClick={() => setIsCameraOpen(true)}>
          Open Camera
        </button>
      )}

      {/* {imageSrc && <img src={imageSrc} alt="Captured"/>} */}
      {imageSrc && <UploadImage imageSrc={imageSrc} axiosins={axiosins}/>}

      {/* {error && <div className='error'>Error: {error.message}</div>} */}
      {/* {data && <div className='success'>Success: {JSON.stringify(data)}</div>} */}
    </div>
  );
};


const UploadImage = ({imageSrc ,axiosins})=>{
  const uploadImage = async()=>{
    const response = await fetch(imageSrc);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("file" , blob, "webcam.jpeg");
    console.log(formData)
    const uploadResponse = axiosins.post("/users/faceRecognition", {imageSrc}).then(res => {

        console.log(res.data); 
      })
  }

  uploadImage();

  return null
}

export default Web;
