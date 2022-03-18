import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import qs from 'qs'

export default async function uploadImagesToServer(url) {
    let responseUrl;
    const key = "be40e701d4a418d0146cc38b1e5adbb5";
    const image = url.split(",").pop();
    const sendUrl = "https://api.imgbb.com/1/upload";
    const data = qs.stringify({
      'key': key,
      'image': image
    });

  await axios.post(sendUrl, data,
  {
    headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
    },
  }
  ).then(response => {
    responseUrl = response.data.data.url;
    console.log(responseUrl)
})
    .catch(err => console.log(JSON.stringify(err,null,4)));
  return responseUrl;
}
