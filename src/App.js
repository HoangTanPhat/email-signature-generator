import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Tabs,
  Tab,
  TabContent,
  FormControl,
} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsX, BsFillXCircleFill, BsFillCloudArrowUpFill } from "react-icons/bs";
import axios from "axios";
import socialdata from "./socialdata";
import { useDispatch, useSelector } from "react-redux";
import { addSocialAction, removeSocialAction, syncEmailInfoData, addSocialLinksToTemplate } from "./redux/actions";
import Result from "./Components/Result";
import avatar from './img/IMG_7248_2.jpg'

function App() {
  const [key, setKey] = useState("general");
  const [name, setName] = useState("Hoang Tan Phat");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("Front-End Developer");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("+84 123456789");
  const [website, setWebsite] = useState("https://hoangtanphatvn.com");
  const [email, setEmail] = useState("hoangtanphat97.xm@gmail.com");
  const [image, setImage] = useState(avatar);
  const [imageWidth, setImageWidth] = useState(150);
  const [imageLink, setImageLink] = useState("");
  const [banner, setBanner] = useState("");
  const [bannerWidth, setBannerWidth] = useState(450);
  const [bannerLink, setBannerLink] = useState("");
  const [caption, setCaption] = useState("Contact me through:");
  const [success, setSuccess] = useState(false);
  const [socialLink, setSocialLink] = useState({
    facebook:'',
    linkedin: '',
    instagram: '',
    twitter: '',
    youtube: '',
    behance: '',
    discord: '',
    reddit: '',
    github: '',
    tumblr: '',
    telegram: '',
    snapchat: '',
    viber: '',
    pinterest: '',
    tiktok: '',
    whatsapp: '',
    tinder: '',
    zalo: '',
    messenger: '',
  });
  const [socialBrandsList, setSocialBrandsList] = useState(socialdata);
  const [searchIcons, setSearchIcons] = useState("");
  const [isImageOnChange, setIsImageOnChange] = useState(false);

  
  // const [error, setError] = useState(false);
  // const [requestSent, setRequestSent] = useState(false);
  
  const imageReaderRef = useRef(null);
  const imageInputRef = useRef(null);
  const closeImageRef = useRef(null);
  const bannerReaderRef = useRef(null);
  const bannerInputRef = useRef(null);
  const closeBannerRef = useRef(null);
  const searchIconsRef = useRef(null);

  const dispatch = useDispatch();
  const socialListAdded = useSelector((state) => state.socialList);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  // };

  const onUploadImage = () => {
    const file = imageInputRef.current.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const url = reader.result;
      setImage(url);
    });
    reader.readAsDataURL(file);
  };

  const cancelImageUpload = () => {
    setImage("");
  };

  const onUploadBanner = () => {
    const file = bannerInputRef.current.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const url = reader.result;
      setBanner(url);
    });
    reader.readAsDataURL(file);
  };

  const cancelBannerUpload = () => {
    setBanner("");
  };

  const handleImageWidthChange = (e) => {
    // setIsImageOnChange(true);
    setImageWidth(e.target.value);
    // setIsImageOnChange(false);
    // console.log(imageWidth)
  }

  const handleBannerWidthChange = (e) => {
    // setIsBannerOnChange(true);
    setBannerWidth(e.target.value);
    // setIsImageOnChange(false);
    // console.log(imageWidth)
  }

  const handleSocialLink = (event) => {
  let chooseField = event.target.name;
  setSocialLink({
    ...socialLink,
    [chooseField]: event.target.value
  })
  console.log(socialLink);
  };


  const handleAddSocial = (id, name, iconPath, baseUrl, color) => {
    dispatch(addSocialAction({
      id: id,
      name: name,
      iconPath: iconPath,
      baseUrl: baseUrl,
      color: color
    }))
  }
  const handleCloseSocial = (id) => {
    dispatch(removeSocialAction(id))
  }

  // const handleInfo = (e) => {
  //   setName(e.target.value);
  //   dispatch(syncEmailInfoData())
  // }

  useEffect(() => {
    const info = {
      name: name,
      company: company, 
      position: position, 
      department: department, 
      phone: phone, 
      website: website,
      email: email, 
      image: image, 
      imageWidth: imageWidth,
      imageLink: imageLink, 
      banner: banner, 
      bannerWidth: bannerWidth, 
      bannerLink: bannerLink,
      caption: caption
    };
    for(const data in info) {
        dispatch(syncEmailInfoData({
          name: data,
          info: info[data]
        }))
  }},[name, company, position, department, phone, website, email, image, imageWidth, imageLink, banner, bannerWidth, bannerLink, caption])

  useEffect(() => {
    dispatch(addSocialLinksToTemplate(socialLink));
  },[socialLink])
 
  useEffect(() => {
    const timeout = setTimeout(()=> {
      setSuccess(false);
    },1500);
    return () => clearTimeout(timeout)
  },[success])
  return (
    <Container
      className="d-flex align-items-center flex-column pb-5 pt-3 position-relative"
      id="container"
    >
      <Container className="py-5 d-flex flex-column">
        <h1
          className="text-uppercase fw-bold fs-1 text-center m-auto"
          // style={{ color: "white" }}
        >
          EMAIL SIGNATURE GENERATOR
        </h1>
        {/* <p
          className="text-uppercase fs-5 text-center m-auto"
          style={{ color: "white" }}
        >
          Try it out
        </p> */}
      </Container>
      <Container className="d-flex flex-row">
        <Container
          fluid
          className="text-dark app-container m-auto flex-grow-1 p-0"
          style={{ width: "60%", height: "fit-content" }}
        >
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="d-flex flex-grow-1"
            style={{
              backgroundColor: "#f1f1f1",
              borderTopRightRadius: "1rem",
              borderTopLeftRadius: "1rem",
            }}
          >
            <Tab eventKey="general" title="General">
              <TabContent
                className="bg-white py-4 px-3"
                style={{
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <InputGroup
                  className="py-1 px-4 mt-2 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Name
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Company
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={company}
                    maxLength="19"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Position
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={position}
                    maxLength="19"
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Department
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={department}
                    maxLength="19"
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Phone
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={phone}
                    maxLength="19"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Website
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={website}
                    maxLength="19"
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Email
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={email}
                    maxLength="19"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </TabContent>
            </Tab>
            {/* =============================================================== */}
            {/* ====================== PROFILE TAB ============================ */}
            {/* =============================================================== */}

            <Tab eventKey="images" title="Images">
              <TabContent
                className="bg-white py-4 px-3"
                style={{
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <InputGroup
                  className="py-1 px-4 flex-column"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="text-black fs-6 fw-bold"
                    style={{ width: "30%" }}
                  >
                    Logo / Photo
                  </Form.Text>
                  <div className="position-relative d-flex flex-wrap mt-4">
                    <a
                      className={`file-upload-wrapper position-relative d-flex flex-column ${
                        image != "" ? "d-none" : ""
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="text-center">
                        <BsFillCloudArrowUpFill
                          style={{ width: "35px", height: "35px" }}
                        />
                      </div>
                      <span className="text-center">Choose file</span>
                      {/* <p class="text-muted fst-italic">Recommend using square photo</p> */}

                      <FormControl
                        type="file"
                        onChange={onUploadImage}
                        className="position-absolute input-fileupload"
                        style={{ width: "100%" }}
                        ref={imageInputRef}
                      />
                    </a>
                    <div
                      className={`position-relative ${
                        image != "" ? "d-block" : "d-none"
                      } `}
                    >
                      <a
                        className="show-image-wrapper d-block"
                        style={{ width: "50%", height: "auto" }}
                        ref={imageReaderRef}
                      >
                        {image && (
                          <img
                            className="d-block"
                            style={{ maxWidth: "100%", width: "100%" }}
                            src={`${image}`}
                            alt="Logo"
                          />
                        )}
                      </a>
                      <BsFillXCircleFill
                        className="position-absolute"
                        style={{
                          top: "0",
                          right: "50%",
                          transform: "translate(50%,-50%)",
                          fill: "#dc3545",
                          backgroundColor: "transparent",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                        ref={closeImageRef}
                        onClick={cancelImageUpload}
                      />
                    </div>
                  </div>
                </InputGroup>
                <div className="py-1 px-4 align-items-center">
                  <p class="text-muted fst-italic" style={{fontSize: "13px"}}>Recommend using square photo (150px x 150px)</p>
                </div>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Label
                    className="fw-light text-black fs-6 mb-0"
                    style={{ width: "30%" }}
                  >
                    Image Width
                  </Form.Label>
                  <Form.Range
                    className="fs-6 p-0 flex-grow-1 bg-light bg-gradient transition"
                    type="range"
                    value={imageWidth}
                    min="50"
                    max="200"
                    onChange={handleImageWidthChange}
                    style={{ width: "auto" }}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Add Link
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={imageLink}
                    maxLength="19"
                    onChange={(e) => setImageLink(e.target.value)}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 flex-column mt-4"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="text-black fs-6 fw-bold"
                    style={{ width: "30%" }}
                  >
                    Banner
                  </Form.Text>
                  <div
                    className="position-relative d-flex flex-wrap mt-4"
                    style={{ width: "100%" }}
                  >
                    <a
                      className={`file-upload-wrapper position-relative d-flex flex-column ${
                        banner != "" ? "d-none" : ""
                      }`}
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <div className="text-center">
                        <BsFillCloudArrowUpFill
                          style={{ width: "35px", height: "35px" }}
                        />
                      </div>
                      <span className="text-center">Choose file</span>
                      <FormControl
                        type="file"
                        onChange={onUploadBanner}
                        className="position-absolute input-fileupload"
                        style={{ width: "100%" }}
                        ref={bannerInputRef}
                      />
                    </a>
                    <div
                      className={`position-relative ${
                        banner != "" ? "d-block" : "d-none"
                      } `}
                    >
                      <a
                        className="show-image-wrapper d-block"
                        style={{ width: "100%", height: "auto" }}
                        ref={bannerReaderRef}
                      >
                        {banner && (
                          <img
                            className="d-block"
                            style={{ maxWidth: "100%", width: "100%" }}
                            src={`${banner}`}
                            alt="Logo"
                          />
                        )}
                      </a>
                      <BsFillXCircleFill
                        className="position-absolute"
                        style={{
                          top: "0",
                          right: "0",
                          transform: "translate(50%,-50%)",
                          fill: "#dc3545",
                          backgroundColor: "transparent",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                        ref={closeBannerRef}
                        onClick={cancelBannerUpload}
                      />
                    </div>
                  </div>
                </InputGroup>
                <div className="py-1 px-4 align-items-center">
                  <p class="text-muted fst-italic" style={{fontSize: "13px"}}>Recommend using rectangle photo (450px x 150px) </p>
                </div>
                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Label
                    className="fw-light text-black fs-6 mb-0"
                    style={{ width: "30%" }}
                  >
                    Banner Width
                  </Form.Label>
                  <Form.Range
                    className="fs-6 p-0 flex-grow-1 bg-light bg-gradient transition"
                    type="range"
                    value={bannerWidth}
                    min="300"
                    max="500"
                    onChange={handleBannerWidthChange}
                    style={{ width: "auto" }}
                  />
                </InputGroup>

                <InputGroup
                  className="py-1 px-4 mt-4 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Add Link
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={bannerLink}
                    maxLength="19"
                    onChange={(e) => setBannerLink(e.target.value)}
                  />
                </InputGroup>
              </TabContent>
            </Tab>
            <Tab eventKey="social" title="Social">
              <TabContent
                className="bg-white py-4 px-3"
                style={{
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <InputGroup
                  className="py-1 px-4 my-3 align-items-center"
                  style={{
                    borderRadius: "1.2rem",
                    position: "relative !important",
                  }}
                >
                  <Form.Text
                    className="fw-light text-black fs-6"
                    style={{ width: "30%" }}
                  >
                    Caption
                  </Form.Text>
                  <Form.Control
                    className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                    style={{ borderRadius: "1.2rem" }}
                    type="text"
                    value={caption}
                    maxLength="19"
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </InputGroup>

                {/* Social */}

                {socialListAdded.map((item) => {
                  const { id, name, iconPath, baseUrl, color } = item;
                  return (
                    <InputGroup
                      key={id}
                      className="py-1 pe-4 my-3 align-items-center"
                      style={{
                        borderRadius: "1.2rem",
                        position: "relative !important",
                      }}
                    >
                      <Form.Text
                        className="fw-light text-black fs-6"
                        style={{ width: "15%" }}
                      >
                        <i
                          style={{
                            display: "inline-flex flex-grow-1",
                            width: "40px",
                            height: "40px",
                            fill: color,
                          }}
                        >
                          <img src={iconPath}
                            style={{
                              display: "block",
                              width: "40px",
                              height: "40px",
                            }}
                          />

                        </i>
                      </Form.Text>
                      <Form.Control
                        className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                        style={{ borderRadius: "1.2rem" }}
                        type="text"
                        placeholder={baseUrl}
                        value={socialLink[name]}
                        name={name}
                        onChange={handleSocialLink}
                      />
                      <BsX className="position-absolute" style={{right: "0", cursor: "pointer"}} onClick={() => handleCloseSocial(id)}/>
                    </InputGroup>
                  );
                })}
                <hr />
                <div className="all-icons d-flex flex-wrap">
                  <InputGroup
                    className="py-1 px-4 my-2 align-items-center"
                    style={{
                      borderRadius: "1.2rem",
                      position: "relative !important",
                    }}
                    ref={searchIconsRef}
                  >
                    <Form.Control
                      className="fs-6 p-0 flex-grow-1 py-2 px-3 bg-light bg-gradient transition"
                      style={{ borderRadius: "1.2rem" }}
                      type="search"
                      value={searchIcons}
                      maxLength="19"
                      placeholder="Search"
                      onChange={(e) => setSearchIcons(e.target.value)}
                    />
                  </InputGroup>

                  {/* =============================================================================== */}
                  {/* ========================FULL LIST OF SOCIAL MEDIA ICONS ======================= */}
                  {/* =============================================================================== */}

                  {socialBrandsList
                    .filter((icon) =>
                      searchIcons ? icon.name.startsWith(searchIcons) : icon
                    )
                    .map((brand) => {
                      const { id, name, iconPath, baseUrl, color } = brand;
                      return (
                        <a
                          key={id}
                          className=""
                          style={{
                            display: "inline-flex flex-grow-1",
                            width: "40px",
                            height: "40px",
                            fill: color,
                            cursor:"pointer"
                          }}
                          onClick={() => handleAddSocial(id, name, iconPath, baseUrl, color)}
                        >
                          {/* <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              display: "block",
                              width: "40px",
                              height: "40px",
                            }}
                          >
                            <title>{name}</title>
                            {iconPath}
                          </svg> */}
                          <img src={iconPath} style={{
                              display: "block",
                              width: "40px",
                              height: "40px",
                            }}/>
                        </a>
                      );
                    })}
                </div>
              </TabContent>
            </Tab>
          </Tabs>
        </Container>
        <Container className="flex-grow-1 position-relative">
            <Result setSuccess={setSuccess}/>
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
      {/* <Container
        fluid
        className={`position-absolute transition ${
          requestSent ? "d-block" : "d-none"
        }`}
        style={{
          backgroundColor: "rgba(0,0,0,0.2)",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
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
          onClick={() => setRequestSent(false)}
        />
        <img
          className="position-absolute qr-code"
          style={{
            width: "350px",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            borderRadius: "1.2rem",
          }}
        />
      </Container> */}
    </Container>
  );
}

export default App;
