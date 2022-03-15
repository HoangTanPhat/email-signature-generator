import React, { useState, useEffect, useRef } from 'react'
import {
    Container,
    FormControl,
    Tabs,
    Tab,
    TabContent,
    Button,
    Row,
    Col,
    Table
  } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
//   import { BsX, BsFillXCircleFill, BsFillCloudArrowUpFill } from "react-icons/bs";
import socialdata from "../socialdata";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Result() {
  const [copyText, setCopyText] = useState("");
  const userInfo = useSelector(info => info.emailInfo);
  const socialLinks = useSelector(link => link.socialList); 
  const socialTemplate = useSelector(item => item.emailInfo.socialsAdded[0]);
  console.log(socialTemplate);
  // const userInfoWidth = useSelector(width => width.emailInfo.imageWidth);
  const [key, setKey] = useState("template1");
  const [imageWidthDynamic, setImageWidthDynamic] = useState(userInfo.imageWidth)
  const [bannerWidthDynamic, setBannerWidthDynamic] = useState(userInfo.bannerWidth)
  const template1Ref = useRef(null);
  const el = template1Ref.current;
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
  const copyToClipboard = (el) => {
    var doc = document
		, text = el
		, range, selection;
    console.log(el);
	if (doc.body.createTextRange)
    {
		range = doc.body.createTextRange();
		range.moveToElementText(text);
		range.select();
	} 
    
    else if (window.getSelection)
    {
		selection = window.getSelection();        
		range = doc.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
 	}
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
    // const doc = document;
    // const text = element.current;
    // let range;
    // let selection;
    //     range = doc.createRange();
    //     range.setStart(text,0);
    //     range.setEnd(text,0);
    //     // range.select();
    //     console.log(range);
    //     console.log(range.toString());
    // } else if ( window.getSelection ) {

    //     selection = window.getSelection();

    //     range = doc.createRange();
    //     range.setStart(text,0);
    //     range.setEnd(text,0);        
    //     selection.removeAllRanges();
    //     selection.addRange(range);
    // }

    // document.execCommand( 'copy' );
    // window.getSelection().removeAllRanges();
    // document.getElementById( 'clickMe' ).value = 'Copied to clipboard!';
  }
  console.log(template1Ref.current);
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
            <Tab eventKey="template1" title="Template 1" id="template-1">
                <Table className="bg-white py-4 px-3"
                style={{
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }} ref={template1Ref}>
                    <tbody>
                      <tr className="d-flex flex-row flex-wrap">
                        <td className="d-flex flex-wrap align-items-center justify-content-center p-4 flex-grow-0" style={{width: "30%"}}>
                          <a className="d-block" style={{width: `${imageWidthDynamic}px`, height: `${imageWidthDynamic}px`}}>
                            <img className="rounded-circle" src={userInfo.image} style={{maxWidth: "100%", height: `${imageWidthDynamic}px`, objectFit:"cover", width:`${imageWidthDynamic}px`}} />  
                          </a>
                        </td>
                        <td className="py-4 px-4 flex-grow-1">
                            <h2 onClick={() => chooseField('fieldName')} className="fw-bold">{userInfo.name}</h2>
                            <hr />
                            <h4 className="fw-bold">{userInfo.position}</h4>
                            <span className="info company">{userInfo.company}</span>
                            {userInfo.department != " " &&
                            <span className='info department position-relative'> &#8226; {userInfo.department}</span>}
                            <p><span className="fw-bold">Phone: </span>{userInfo.phone}</p>
                            <p><span className="fw-bold">Website: </span><a href={userInfo.website}>{userInfo.website}</a></p>
                            <p>{userInfo.caption}</p>
                            <table>
                              <tr className="d-flex flex-row flex-wrap" style={{height: "30px"}}>
                              {socialLinks.map((link) => {
                                const {id, name, iconPath, color} = link;
                                const obj = Object.values(socialTemplate);
                                return (
                                  <td className="me-2" style={{height:"30px"}}>
                                  <a key={id} className="me-2" href={socialTemplate[name]} style={{
                                    display: "inline-flex flex-grow-1",
                                    width: "30px",
                                    height: "30px",
                                    fill: color,
                                  }}>
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

                                )
                              })}
                              </tr>
                            </table>
                        </td>
                      </tr>
                      <tr>
                        {userInfo.banner !== " " && 
                        <a href={userInfo.bannerLink != " " ? userInfo.bannerLink : "#"} className="d-block p-0 my-3" style={{width: `${bannerWidthDynamic}px`, height: `${bannerWidthDynamic / 3}px`}}>
                            <img src={userInfo.banner} style={{maxWidth: "100%", height: `${bannerWidthDynamic / 3}px`, objectFit:"cover", width:`${bannerWidthDynamic}px`}} />  
                        </a>
                        }
                      </tr>
                    </tbody>
                </Table>
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
        <Container className="d-flex flex-row flex-wrap mt-4">
        <CopyToClipboard onCopy={() => copyToClipboard(el)} text={copyText}>
        <Button className="fs-5 flex-grow-1 rounded-pill mx-4 transition generate-btn"
            variant="primary"
            type="button"
            style={{ backgroundColor: "white", color:"black", boxShadow: '0px 1px 30px rgba(0,0,0,.5)' , border: "none"}}
            // onClick={() => copyToClipboard(el)}

          >
            Copy to Clipboard
          </Button>
        </CopyToClipboard>
          <Button className="fs-5 flex-grow-1 rounded-pill mx-4 transition generate-btn"
            variant="primary"
            style={{ backgroundColor: "white", color:"black" , boxShadow: '0px 1px 30px rgba(0,0,0,.5)',  border: "none"}}

          >
            Save as Image
          </Button>
          <Button className="fs-5 flex-grow-1 rounded-pill mx-4 transition generate-btn"
            variant="primary"
            style={{ backgroundColor: "white", color:"black", boxShadow: '0px 1px 30px rgba(0,0,0,.5)',  border: "none" }}

          >
            Copy Html
          </Button>
        </Container>
    </Container>
  )
}
