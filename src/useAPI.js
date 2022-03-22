import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import qs from 'qs'

// require("dotenv").config();

export async function uploadImagesToServer(url) {
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
  )
  .then(response => {
    responseUrl = response.data.data.url;
})
    .catch(err => console.log(JSON.stringify(err,null,4)));
  return responseUrl;
};

export async function googleFontsAPI() {
    let fontList;
    const API_KEY = "P0Sww1xDRGSbGuXiXNq8Kvuc9hlWbvM5";
    const requestUrl = "https://www.googleapis.com/webfonts/v1/webfonts"
    const data = qs.stringify({
        "key": API_KEY,
        "sort": "alpha"
    })
    await axios({
        method: 'GET',
        url: requestUrl,
        params: {
            key: API_KEY,
            sort: "popularity"
        }
    }).then(response => fontList = response.data.items)
    .catch(err => console.log(JSON.stringify(err,null,4)))
    return fontList.filter((item, index) => index < 100);
}
