import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Tabs,
  Tab,
  TabContent,
  Button,
  Table,
} from "react-bootstrap";
//   import { BsX, BsFillXCircleFill, BsFillCloudArrowUpFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import html2canvas from "html2canvas";
import blankProfile from "./../img/Blank-profile.png";
import ReactLoading from "react-loading";
import bannerPlaceholder from "./../img/banner-placeholder.jpg";
import { getCurrentCustomStyle, currentCustomStyleSelector } from '../redux/selectors'

export default function Result({
  setSuccess,
  setRequestSent,
  isImageLoading,
  isBannerLoading,
  isFontDoneLoading
}) {
  const [copyText, setCopyText] = useState("");
  const [font, setFont] = useState("");
  const [titleColor, setTitleColor] = useState("")
  const [customTitleSize, setCustomTitleSize] = useState();
  const [isFontDoneRendering, setIsFontDoneRendering] = useState(false);
  const userInfo = useSelector((info) => info.emailInfo);
  const socialLinks = useSelector((link) => link.socialList);
  const socialTemplate = useSelector((item) => item.emailInfo.socialsAdded[0]);
  // console.log(currentCustomStyle.font)
  const currentCustomStyle = useSelector((item) => item.style[0])
  const percentageChange_name = currentCustomStyle.titleSize_name / 32;
  const percentageChange_position = currentCustomStyle.titleSize_position / 24;
  
  // setTitleColor(currentCustomStyle.titleColor)
  // console.log(currentCustomStyle)
  // const returnFonts = useSelector((item) => Object.keys(item.font).filter(data => data.family == currentCustomStyle.font), shallowEqual);

  //   const returnFonts = useSelector((item) => {
  //     if(isFontDoneLoading) {
  //     return item.font.filter((data) => data.family == item.style[0].font);
  //     } else return 'Default';
  //   })
  // console.log(getCurrentCustomStyle);
  // console.log(returnFonts);
  // const userInfoWidth = useSelector(width => width.emailInfo.imageWidth);
  const [key, setKey] = useState("template1");
  const [imageWidthDynamic, setImageWidthDynamic] = useState(
    userInfo.imageWidth
  );
  const [bannerWidthDynamic, setBannerWidthDynamic] = useState(
    userInfo.bannerWidth
  );
  const template1Ref = useRef(null);

  const el = template1Ref.current;
  useEffect(() => {
    setImageWidthDynamic(userInfo.imageWidth);
  }, [userInfo.imageWidth]);
  useEffect(() => {
    setBannerWidthDynamic(userInfo.bannerWidth);
  }, [userInfo.bannerWidth]);

  const chooseField = (item) => {
    if (item === "fieldName") {
    }
  };
  const copyToClipboard = (el) => {
    var doc = document,
      text = el,
      range,
      selection;
    console.log(el);
    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setSuccess(true);
  };

  const handleSaveAsImage = (el) => {
    html2canvas(el, {
      useCORS: true
    })
      .then((canvas) => {
        document.getElementById("saveAsImageContainer").appendChild(canvas);
        setRequestSent(true);
        console.log(canvas);
        return canvas;
      })
      .then((canvas) => {
        const image = canvas.toDataURL("image/jpg");
        const a = document.createElement("a");
        a.setAttribute("download", "signature.jpg");
        a.setAttribute("href", image);
        a.click();
      });
      document.body.style.overflow="hidden";
  };
  return (
    <Container className="position-sticky pe-0 mt-4 mt-lg-0 result-container-child" style={{ top: "20%" }}>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="d-flex flex-grow-1"
        style={{
          backgroundColor: "#f9f9f9",
          borderTopRightRadius: "0.5rem",
          borderTopLeftRadius: "0.5rem",
          // backgroundColor:"rgba(255,255,255,0.5)"

        }}
      >
        <Tab eventKey="template1" title="Template 1" id="template-1">
        <TabContent
            className="bg-white py-4 px-3"
            style={{
              border:'1px solid #dee2e6',
              borderTop:'0px',
              borderBottomLeftRadius: "0.5rem",
              borderBottomRightRadius: "0.5rem",
              overflow:"hidden"
            }}
          >
          <Table
            className="bg-white py-4 px-3"
            style={{
              borderBottomLeftRadius: "0.5rem",
              borderBottomRightRadius: "0.5rem",
              borderColor: "white",
              overflow:"hidden"
            }}
            ref={template1Ref}
          >
            <tbody>
              <tr className="d-flex flex-row">
                <td
                  className="d-flex justify-content-center align-items-center p-4"
                  style={{
                    // width: "30%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={userInfo.imageLink != " " ? userInfo.imageLink : null}
                    className="d-block rounded-circle position-relative"
                    style={{
                      width: `${imageWidthDynamic}px`,
                      height: `${imageWidthDynamic}px`,
                    }}
                  >
                    {isImageLoading && (
                      <div
                        className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.2)",
                          top: "0",
                          left: "0",
                          bottom: "0",
                          right: "0",
                        }}
                      >
                        <ReactLoading
                          type="bubbles"
                          color="white"
                          height={"50%"}
                          width={"50%"}
                          className="d-block"
                        />
                      </div>
                    )}
                    <img
                      className="rounded-circle"
                      src={
                        userInfo.image != " " ? userInfo.image : blankProfile
                      }
                      style={{
                        maxWidth: "100%",
                        height: `${imageWidthDynamic}px`,
                        objectFit: "cover",
                        width: `${imageWidthDynamic}px`,
                      }}
                    />
                  </a>
                </td>
                <td className="py-3 px-4">
                  <h2
                    onClick={() => chooseField("fieldName")}
                    className="custom-font"
                    style={{ margin: "0", fontWeight: "700", color: currentCustomStyle.titleColor, fontSize: currentCustomStyle.titleSize_name * percentageChange_name + "px", whiteSpace:"nowrap", textOverflow: "clip", overflow:"hidden", direction: "ltr"}}
                  >
                    {userInfo.name}
                  </h2>
                  <hr style={{ margin: "0.5rem 0px", backgroundColor: "rgba(33,37,41,0.25)" }} />
                  <h4 style={{ margin: "0p", fontWeight: "700", color: currentCustomStyle.titleColor, fontSize: currentCustomStyle.titleSize_position * percentageChange_position + "px", whiteSpace:"nowrap",  textOverflow: "clip", overflow:"hidden", direction: "ltr" }} className="custom-font">
                    {userInfo.position}
                  </h4>
                  <span className="info company custom-font"  style={{color: currentCustomStyle.textColor, fontSize: currentCustomStyle.textSize + 'px', whiteSpace:"nowrap"}} >{userInfo.company}</span>
                  {userInfo.department != " " && (
                    <span className="info department position-relative custom-font"  style={{color: currentCustomStyle.textColor, fontSize: currentCustomStyle.textSize, whiteSpace:"nowrap"}}>
                      {" "}
                      &#8226; {userInfo.department}
                    </span>
                  )}
                  {userInfo.phone != " " && (
                    <p className="m-0 custom-font" style={{color: currentCustomStyle.textColor, fontSize: currentCustomStyle.textSize + 'px', whiteSpace:"nowrap"}}>
                      <span style={{fontWeight: "700", color: currentCustomStyle.titleColor, fontSize: currentCustomStyle.textSize + 'px'}}>Phone: </span>
                      {userInfo.phone}
                    </p>
                  )}
                  {userInfo.email != " " && (
                    <p className="m-0 custom-font" style={{color: currentCustomStyle.textColor, fontSize: currentCustomStyle.textSize + 'px', whiteSpace:"nowrap"}}>
                      <span  style={{fontWeight: "700", color: currentCustomStyle.titleColor, fontSize: currentCustomStyle.textSize + 'px'}}>Email: </span>
                      {userInfo.email}
                    </p>
                  )}
                  {userInfo.website != " " && (
                    <p className="m-0 custom-font" style={{fontSize: currentCustomStyle.textSize + 'px', whiteSpace:"nowrap"}}>
                      <span style={{fontWeight: "700", color: currentCustomStyle.titleColor, fontSize: currentCustomStyle.textSize + 'px' }}>Website: </span>
                      <a href={userInfo.website} style={{fontSize: currentCustomStyle.textSize + 'px'}}>{userInfo.website}</a>
                    </p>
                  )}
                  <p className="m-0 custom-font" style={{color: currentCustomStyle.textColor, fontSize: currentCustomStyle.textSize + 'px'}}>{userInfo.caption}</p>
                  <table>
                    <tbody>
                      <tr
                        className="d-flex flex-row flex-wrap mt-2"
                        style={{ height: "30px" }}
                      >
                        {socialLinks.map((link) => {
                          const { id, name, iconPath, color } = link;
                          const obj = Object.values(socialTemplate);
                          return (
                            <td
                              key={id}
                              className="me-2"
                              style={{ height: "30px" }}
                            >
                              <a
                                className="me-2"
                                href={socialTemplate[name]}
                                style={{
                                  display: "inline-flex flex-grow-1",
                                  width: "30px",
                                  height: "30px",
                                  fill: color,
                                }}
                              >
                                <img
                                  src={iconPath}
                                  style={{
                                    display: "block",
                                    width: "30px",
                                    height: "30px",
                                  }}
                                />
                              </a>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                {isBannerLoading && (
                  <td
                    className="position-relative d-block p-0 my-3"
                    style={{
                      width: `${bannerWidthDynamic}px`,
                      height: `${bannerWidthDynamic / 3}px`,
                    }}
                  >
                    <hr
                      style={{
                        margin: "0.5rem 0px",
                        padding: "0px",
                        backgroundColor: "currentcolor",
                      }}
                    />
                    <div
                      className="position-absolute d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.1)",
                        top: "0",
                        left: "0",
                        bottom: "0",
                        right: "0",
                      }}
                    >
                      <ReactLoading
                        type="bubbles"
                        color="white"
                        width={"50%"}
                        className="d-flex justify-content-center"
                      />
                    </div>
                    <img
                      src={bannerPlaceholder}
                      style={{
                        maxWidth: "100%",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                )}
                {userInfo.banner !== " " && (
                  <td>
                    <hr
                      style={{
                        margin: "0.5rem 0px",
                        padding: "0px",
                        backgroundColor: "rgba(33,37,41,0.25)",
                      }}
                    />
                    <a
                      href={
                        userInfo.bannerLink != " " ? userInfo.bannerLink : null
                      }
                      className="position-relative d-block p-0 my-3"
                      style={{
                        width: `${bannerWidthDynamic}px`,
                        height: `${bannerWidthDynamic / 3}px`,
                      }}
                    >
                      <img
                        src={userInfo.banner}
                        style={{
                          maxWidth: "100%",
                          height: `${bannerWidthDynamic / 3}px`,
                          objectFit: "cover",
                          width: `${bannerWidthDynamic}px`,
                        }}
                      />
                    </a>
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
          </TabContent>
        </Tab>

        <Tab eventKey="template2" title="Template 2">
        <TabContent
            className="bg-white py-4 px-3"
            style={{
              border:'1px solid #dee2e6',
              borderTop:'0px',
              borderBottomLeftRadius: "0.5rem",
              borderBottomRightRadius: "0.5rem",
            }}
          >
            <p className="text-center">New template will be updated soon</p>
          </TabContent>
        </Tab>


        <Tab eventKey="template3" title="Template 3">
        <TabContent
            className="bg-white py-4 px-3"
            style={{
              border:'1px solid #dee2e6',
              borderTop:'0px',
              borderBottomLeftRadius: "0.5rem",
              borderBottomRightRadius: "0.5rem",
            }}
          >
            <p className="text-center">New template will be updated soon</p>

          </TabContent>
        </Tab>
      </Tabs>
      <Container className="d-flex flex-row flex-wrap mt-4">
        <CopyToClipboard onCopy={() => copyToClipboard(el)} text={copyText}>
          <Button
            className="fs-5 flex-grow-1 rounded-pill mx-4 transition generate-btn"
            variant="primary"
            type="button"
            style={{
              backgroundColor: "white",
              // color: "black",
              backgroundColor: "#f9f9f9",
              border:'1px solid #dee2e6',
              backdropFilter: "blur(30px)",
              color: "rgba(0,0,0,0.9)",
              // border: "none",
            }}
            // onClick={() => copyToClipboard(el)}
          >
            Copy to Clipboard
          </Button>
        </CopyToClipboard>
        <Button
          className="fs-5 flex-grow-1 rounded-pill mx-4 transition generate-btn"
          variant="primary"
          style={{
            backgroundColor: "white",
            backgroundColor: "#f9f9f9",
            border:'1px solid #dee2e6',
            backdropFilter: "blur(30px)",
            color: "rgba(0,0,0,0.9)",
          }}
          onClick={() => handleSaveAsImage(el)}
        >
          Save as Image
        </Button>
        {/* <Button className="fs-5 flex-grow-1 rounded-pill mx-4 transition generate-btn"
            variant="primary"
            style={{ backgroundColor: "white", color:"black", boxShadow: '0px 1px 30px rgba(0,0,0,.5)',  border: "none" }}

          >
            Copy Html
          </Button> */}
      </Container>
    </Container>
  );
}
