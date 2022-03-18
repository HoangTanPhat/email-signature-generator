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
import socialdata from "./../socialdata";
import { useDispatch, useSelector } from "react-redux";
import {
  addSocialAction,
  removeSocialAction,
  syncEmailInfoData,
  addSocialLinksToTemplate,
} from "./../redux/actions";
import avatar from "./../img/IMG_7248_2.jpg";
import uploadImagesToServer from "../useAPI";
import qs from "qs";

export default function GenerateBoard({ setSuccess, success }) {
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
  const [socialLink, setSocialLink] = useState({
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    youtube: "",
    behance: "",
    discord: "",
    reddit: "",
    github: "",
    tumblr: "",
    telegram: "",
    snapchat: "",
    viber: "",
    pinterest: "",
    tiktok: "",
    whatsapp: "",
    tinder: "",
    zalo: "",
    messenger: "",
  });
  const [socialBrandsList, setSocialBrandsList] = useState(socialdata);
  const [searchIcons, setSearchIcons] = useState("");

  const imageReaderRef = useRef(null);
  const imageInputRef = useRef(null);
  const closeImageRef = useRef(null);
  const bannerReaderRef = useRef(null);
  const bannerInputRef = useRef(null);
  const closeBannerRef = useRef(null);
  const searchIconsRef = useRef(null);

  const dispatch = useDispatch();
  const socialListAdded = useSelector((state) => state.socialList);

  const onUploadImage = () => {
    const file = imageInputRef.current.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const url = reader.result;
      const request = uploadImagesToServer(url);
      request.then((response) => setImage(response));
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
    setImageWidth(e.target.value);
  };

  const handleBannerWidthChange = (e) => {
    setBannerWidth(e.target.value);
  };

  const handleSocialLink = (event) => {
    let chooseField = event.target.name;
    setSocialLink({
      ...socialLink,
      [chooseField]: event.target.value,
    });
    console.log(socialLink);
  };

  const handleAddSocial = (id, name, iconPath, baseUrl, color) => {
    dispatch(
      addSocialAction({
        id: id,
        name: name,
        iconPath: iconPath,
        baseUrl: baseUrl,
        color: color,
      })
    );
  };
  const handleCloseSocial = (id) => {
    dispatch(removeSocialAction(id));
  };

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
      caption: caption,
    };
    for (const data in info) {
      dispatch(
        syncEmailInfoData({
          name: data,
          info: info[data],
        })
      );
    }
  }, [
    name,
    company,
    position,
    department,
    phone,
    website,
    email,
    image,
    imageWidth,
    imageLink,
    banner,
    bannerWidth,
    bannerLink,
    caption,
  ]);

  useEffect(() => {
    dispatch(addSocialLinksToTemplate(socialLink));
  }, [socialLink]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSuccess(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [success]);

  return (
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
                    accept=".jpg,.jpeg,.png,.gif,.bmp"
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
              <p class="text-muted fst-italic" style={{ fontSize: "13px" }}>
                Recommend using square photo (150px x 150px)
              </p>
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
                    accept=".jpg,.jpeg,.png,.gif,.bmp"
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
              <p class="text-muted fst-italic" style={{ fontSize: "13px" }}>
                Recommend using rectangle photo (450px x 150px){" "}
              </p>
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
                      <img
                        src={iconPath}
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
                  <BsX
                    className="position-absolute"
                    style={{ right: "0", cursor: "pointer" }}
                    onClick={() => handleCloseSocial(id)}
                  />
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
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleAddSocial(id, name, iconPath, baseUrl, color)
                      }
                    >
                      <img
                        src={iconPath}
                        style={{
                          display: "block",
                          width: "40px",
                          height: "40px",
                        }}
                      />
                    </a>
                  );
                })}
            </div>
          </TabContent>
        </Tab>
      </Tabs>
    </Container>
  );
}
