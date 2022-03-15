import React, { useState, useEffect, useRef } from 'react'
import {
    Container,
    Form,
    Tabs,
    Tab,
    TabContent,
    FormControl,
    Row,
    Col
  } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
//   import { BsX, BsFillXCircleFill, BsFillCloudArrowUpFill } from "react-icons/bs";
import socialdata from "../socialdata";
import { useDispatch, useSelector } from "react-redux";

export default function Result() {
  const userInfo = useSelector(info => info.emailInfo);
  const socialLinks = useSelector(link => link.socialList); 
  const socialTemplate = useSelector(item => item.emailInfo.socialsAdded[0]);
  console.log(socialTemplate);
  // const userInfoWidth = useSelector(width => width.emailInfo.imageWidth);
  const [key, setKey] = useState("template1");
  const [imageWidthDynamic, setImageWidthDynamic] = useState(userInfo.imageWidth)
  const [bannerWidthDynamic, setBannerWidthDynamic] = useState(userInfo.bannerWidth)

  useEffect(() => {
    setImageWidthDynamic(userInfo.imageWidth)
  },[userInfo.imageWidth])
  useEffect(() => {
    setBannerWidthDynamic(userInfo.bannerWidth)
  },[userInfo.bannerWidth])

  const chooseField = (item) => {
    if(item === 'fieldName') {

    }
  }
  
  return (
    <Container className="position-sticky" style={{top: "20%"}}>
        <Tabs 
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="d-flex flex-grow-1"
            style={{
              backgroundColor: "#f1f1f1",
              borderTopRightRadius: "1rem",
              borderTopLeftRadius: "1rem",
            }}>
            <Tab eventKey="template1" title="Template 1">
                <TabContent className="bg-white py-4 px-3"
                style={{
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}>
                    <Container>
                      <Row>
                        <Col sm={4}className="border border-dark d-flex flex-wrap align-items-center justify-content-center p-4">
                          <a href={userInfo.imageLink}className="d-block" style={{width: `${imageWidthDynamic}px`, height: `${imageWidthDynamic}px`}}>
                            <img className="rounded-circle" src={userInfo.image} style={{maxWidth: "100%", height: `${imageWidthDynamic}px`, objectFit:"cover", width:`${imageWidthDynamic}px`}} />  
                          </a>
                        </Col>
                        <Col className="border border-dark border-start-0 py-2 px-4">
                            <h2 onClick={() => chooseField('fieldName')} className="fw-bold">{userInfo.name}</h2>
                            <hr />
                            <h4 className="fw-bold">{userInfo.position}</h4>
                            <span className="info company">{userInfo.company}</span>
                            {userInfo.department != " " &&
                            <span className='info department position-relative'> &#8226; {userInfo.department}</span>}
                            <p><span className="fw-bold">Phone: </span>{userInfo.phone}</p>
                            <p><span className="fw-bold">Website: </span><a href={userInfo.website}>{userInfo.website}</a></p>
                            <p>{userInfo.caption}</p>
                            <div className="d-flex flex-row flex-wrap">
                              {socialLinks.map((link) => {
                                const {id, name, iconPath, color} = link;
                                const obj = Object.values(socialTemplate);
                                return (
                                  <a key={id} className="me-2" href={socialTemplate[name]} style={{
                                    display: "inline-flex flex-grow-1",
                                    width: "30px",
                                    height: "30px",
                                    fill: color,
                                  }}>
                                    <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              display: "block",
                              width: "30px",
                              height: "30px",
                            }}
                          >
                            {iconPath}
                          </svg>
                                  </a>
                                )
                              })}
                            </div>

                        </Col>
                      </Row>
                      <Row>
                        {userInfo.banner !== " " && 
                        <a href={userInfo.bannerLink} className="d-block p-0 my-3" style={{width: `${bannerWidthDynamic}px`, height: `${bannerWidthDynamic / 3}px`}}>
                            <img src={userInfo.banner} style={{maxWidth: "100%", height: `${bannerWidthDynamic / 3}px`, objectFit:"cover", width:`${bannerWidthDynamic}px`}} />  
                        </a>
                        }
                      </Row>
                    </Container>
                </TabContent>
            </Tab>
            <Tab eventKey="template2" title="Template 2">
                <TabContent className="bg-white py-4 px-3"
                style={{
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}>
                    
                </TabContent>
            </Tab>
            <Tab eventKey="template3" title="Template 3">
                <TabContent className="bg-white py-4 px-3"
                style={{
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}> 
                </TabContent>
            </Tab>
        </Tabs>
    </Container>
  )
}
