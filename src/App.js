import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsTranslate, BsX } from "react-icons/bs";
import Result from "./Components/Result";
import GenerateBoard from "./Components/GenerateBoard";
import avatar from "./img/IMG_7248_2.jpg";
import History from "./Components/History";
import { addGoogleFonts, changeStyle } from "./redux/actions";
import { googleFontsAPI } from "./useAPI";
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [image, setImage] = useState(avatar);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isBannerLoading, setIsBannerLoading] = useState(false);
  const [isFontDoneLoading, setIsFontDoneLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isAnswerYes, setIsAnswerYes] = useState(false);
  const handleCloseModal = () => {
    setRequestSent(false);
    document.querySelector("canvas").remove();
    document.body.style.overflow="auto";
  }
  const handleResetAnswer = (text) => {
    if(text === "Yes") {
      setIsAnswerYes(true);
      // dispatch(changeStyle({
      //   font: "Roboto",
      //   titleSize_name: 32,
      //   titleSize_position: 24,
      //   titleColor: "#000000",
      //   textColor: "#000000",
      //   textSize: 16
      // }))
    }
    setIsReset(false);
  }
  // useEffect(() => {
  //   const id = uuid();
  //   googleFontsAPI().then(data => {
  //     data.map((item) => {
  //       const {family, variants, files} = item;
  //       dispatch(addGoogleFonts({
  //         id: id,
  //         family: family,
  //         variants: variants,
  //         files: files
  //       }))
  //     });
  //     setIsFontDoneLoading(true);
  //   }    
  //   )
  //   .catch(err => console.log(err))   
  // },[])
  return (
  <>
    <Container
      className="d-flex align-items-center flex-column pb-5 pt-3 position-relative"
      id="container"
    >
      <Container className="py-5 d-flex flex-column">
        <h1
          className="text-uppercase fw-bold text-center m-auto big-headline text-dark" style={{letterSpacing: "3px"}}
        >
          EMAIL SIGNATURE GENERATOR
        </h1>

      </Container>
      <Container className="d-none d-md-flex flex-column flex-lg-row">
            <GenerateBoard setRequestSent={setRequestSent} requestSent={requestSent} success={success} setSuccess={setSuccess} image={image} setImage={setImage} setIsImageLoading={setIsImageLoading} setIsBannerLoading={setIsBannerLoading} isAnswerYes={isAnswerYes} setIsReset={setIsReset} setIsAnswerYes={setIsAnswerYes} />
        <Container className="flex-grow-1 position-relative pe-0 result-container">
            <Result setSuccess={setSuccess} requestSent={requestSent} setRequestSent={setRequestSent} image={image} isImageLoading={isImageLoading} isBannerLoading={isBannerLoading} isFontDoneLoading={isFontDoneLoading}/>
        </Container>
      </Container>
      <Container className="d-none d-md-flex flex-column mt-4">
        <h2 className="fs-5 fw-bold">Restore your works</h2>
        <History></History>  
      </Container>
      <Container className="d-flex d-md-none flex-column mt-4 p-4" style={{
        backgroundColor: "#f9f9f9",
        borderRadius: "0.5rem",
        border: '1px solid black',
      }}>
        <p className="fs-5 text-center mb-0">For better experience, please try the application with your laptop</p>
        <p className="fs-5 text-center mt-3">Sorry for the inconvenience</p>
      </Container>       
       <Container
        className={`success-alert position-fixed transition d-flex align-items-center ${
          success ? "opacity-1" : "opacity-0"
        }`}
        style={{
          backgroundColor: "#5cb85c",
          width: "300px",
          height: "60px",
          top: "20px",
          right: "20px",
          borderRadius: "1.3rem",
        }}
      >
        <span className="m-auto fs-6" style={{ color: "white" }}>
          Copied to Clipboard
        </span>
      </Container>
      <Container className={`success-alert position-fixed p-4 transition d-flex flex-column align-items-center`}
        style={{
          backgroundColor: "#f9f9f9",
          width: "500px",
          top: isReset ? "20px" : "-400px",
          left: "50%",
          transform:"translateX(-50%)",
          borderRadius: "0.5rem",
          border: '1px solid black',
        }} id="alert-notification">
          <span className="m-auto fs-5" style={{ color: "black", fontWeight: 700 }}>
          RESET ALL STYLES
        </span>
        <span className="m-auto fs-6" style={{ color: "black" }}>
          Are you sure you want to continue?
        </span>
        <div className="d-flex flex-row flex-wrap mt-4">
          <Button className="me-3 px-5 rounded-pill transition generate-btn" style={{
            backgroundColor: "white",
            backgroundColor: "#f9f9f9",
            border:'none',
            backdropFilter: "blur(30px)",
            color: "rgba(0,0,0,0.9)",
          }} onClick={() => handleResetAnswer("Yes")}>Yes</Button>
          <Button className="ms-3 px-5 rounded-pill transition generate-btn" style={{
            backgroundColor: "white",
            backgroundColor: "#f9f9f9",
            border:'1px solid #dee2e6',
            backdropFilter: "blur(30px)",
            color: "rgba(0,0,0,0.9)",
            fontWeight:700
          }} onClick={() => handleResetAnswer("No")}>No</Button>
        </div>
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
