import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsX } from "react-icons/bs";
import Result from "./Components/Result";
import GenerateBoard from "./Components/GenerateBoard";
import avatar from "./img/IMG_7248_2.jpg";

function App() {
  const [success, setSuccess] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [image, setImage] = useState(avatar);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isBannerLoading, setIsBannerLoading] = useState(false);

  const handleCloseModal = () => {
    setRequestSent(false);
    document.querySelector("canvas").remove();
    document.body.style.overflow="auto";
  }
  return (
  <>
    <Container
      className="d-flex align-items-center flex-column pb-5 pt-3 position-relative"
      id="container"
    >
      <Container className="py-5 d-flex flex-column" style={{height:"100vh"}}>
        <h1
          className="text-uppercase fw-bold text-center m-auto big-headline"
        >
          EMAIL SIGNATURE GENERATOR
        </h1>

      </Container>
      <Container className="d-flex flex-row">
            <GenerateBoard setRequestSent={setRequestSent} requestSent={requestSent} success={success} setSuccess={setSuccess} image={image} setImage={setImage} setIsImageLoading={setIsImageLoading} setIsBannerLoading={setIsBannerLoading}/>
        <Container className="flex-grow-1 position-relative">
            <Result setSuccess={setSuccess} requestSent={requestSent} setRequestSent={setRequestSent} image={image} isImageLoading={isImageLoading} isBannerLoading={isBannerLoading}/>
        </Container>
      </Container>
                  
       <Container
        className={`success-alert position-absolute transition d-flex align-items-center ${
          success ? "opacity-1" : "opacity-0"
        }`}
        style={{
          backgroundColor: "#5cb85c",
          width: "300px",
          height: "60px",
          top: "20px",
          right: "-50px",
          borderRadius: "1.3rem",
        }}
      >
        <span className="m-auto fs-6" style={{ color: "white" }}>
          Copied to Clipboard
        </span>
      </Container>
    </Container>
    <Container
    fluid
    className={`position-fixed transition ${
      requestSent ? "d-block" : "d-none"
    }`}
    style={{
      backgroundColor: "rgba(0,0,0,0.2)",
      width: "100vw",
      left: "50%",
      right: "50%",
      height: "100vh",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backdropFilter: "blur(5px)",
    }}
  >
    <BsX
      className="position-absolute"
      style={{
        width: "50px",
        height: "auto",
        top: "2rem",
        right: "5rem",
        color: "white",
        cursor: "pointer",
      }}
      onClick={handleCloseModal}
    />
    <div
      id="saveAsImageContainer"
      className="position-absolute"
      style={{
        width: "auto",
        height: "auto",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        borderRadius: "1.2rem",
      }}
      >
    </div>
  </Container>
  </>
  );
}

export default App;
