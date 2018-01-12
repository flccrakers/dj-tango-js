import moment from "moment/moment";
let currentServerBasePath = 'http://localhost:3434';

// noinspection JSAnnotator
export function postJSON(url: string, bodyPayload: any, queryPayload?:any) {
  // console.log(bodyPayload);
  let finalUrl = composeUrl(url, queryPayload);
  // console.log(currentServerBasePath + finalUrl);
  return fetch(currentServerBasePath + finalUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyPayload)
  }).then(function (response) {
    let contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  }).then((response: IJSONWrapper) => {
    if (response.hasOwnProperty('IsSuccess')) {
      // Probably a NXResultContainer
      if (response.IsSuccess === true) {
        return response.Payload;
      } else {
        throw new Error(response.GeneralException);
      }
    }
    else return response;
  });
}

export function composeUrl(baseUrl: string, queryPayload?:any) : string{
  let finalUrl = baseUrl;
  if (queryPayload != null) {
    if(!finalUrl.endsWith("?"))
      finalUrl = finalUrl+"?";

    finalUrl = Object.keys(queryPayload).reduce((currentUrl, key)=>{
      let value = queryPayload[key];

      if(Array.isArray(value)){
        value.forEach((cell)=>{
          currentUrl= currentUrl+`${key}=${encodeURIComponent(cell)}&`;
        });
      }
      else if(value instanceof Date){
        currentUrl =currentUrl+`${key}=${encodeURIComponent(moment(value).local().format('MM/DD/YYYY HH:mm:ss.SSS'))}&`;

      }
      else{
        currentUrl =currentUrl+`${key}=${encodeURIComponent(value)}&`;
      }
      return currentUrl;
    }, finalUrl)
  }
  return finalUrl
}

export function getJSON(baseUrl:string, queryPayload?: any) {
  let finalUrl = composeUrl(baseUrl, queryPayload);
  // console.log(currentServerBasePath +finalUrl);

  return fetch(currentServerBasePath + finalUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  }).then(function (response) {
    //console.log(response.headers.get("content-type"));
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  }).then((response) => {
    if (response.hasOwnProperty('IsSuccess')) {
      // Probably a NXResultContainer
      if (response.IsSuccess === true) {
        return response.Payload;
      } else {
        throw new Error(response.GeneralException);
      }
    }
    else return response;
  })
}

export function getSongFile(baseUrl:string, queryPayload?: any){
  let finalUrl = baseUrl+ queryPayload;
  console.log(finalUrl);
  return fetch(currentServerBasePath + finalUrl,{
    method:'GET',
    credentials:'include',
    headers:{
      'Accept': '*/*',
      'Content-Type': 'audio/mpeg'
    },
  }).then(function(response){
    console.log(response);
    let blob = response.blob();
    return response.url;
  })
}
