import axios from 'axios';
import {createSelector} from "reselect";

export const AUTH_TOKEN_OBTAIN_ENDPOINT = '/api/auth/token/obtain/';
export const AUTH_TOKEN_REFRESH_ENDPOINT = '/api/auth/token/refresh/';
export const AUTH_REGISTER_ENDPOINT = '/api/auth/register/';

export const NOTE_ADD_ENDPOINT = '/api/notes/add/';
export const NOTES_FETCH_ENDPOINT = '/api/notes/';

export const TIMELINE_FETCH_ENDPOINT = '/api/notes/timeline/';


export const loginHandler = (username, password) => {
  // console.log("in login handler", username, password)
  return axios.post(AUTH_TOKEN_OBTAIN_ENDPOINT, {
    username: username,
    password: password,
  })
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    })
};

export const registerHandler = (fields) => {
  // console.log("in login handler", username, password)
  let data = {
    username: fields.username,
    first_name: fields.first_name,
    last_name: fields.last_name,
    email: fields.email,
    password: fields.password,
  };
  return axios.post(AUTH_REGISTER_ENDPOINT, data)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    })
};

export const noteAddHandler = (title, body, image) => {
  // console.log("in note add handler", image)
  // var imageForm = null;
  // if(image != undefined){
  //   imageForm = new FormData();
  //   imageForm.append('image', image, image.name);
  // }

  // TODO figure out what to do when the form fails due to non-form related issues
  let formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);
  if(image != null) formData.append('image', image);
  return axios.post(NOTE_ADD_ENDPOINT, formData
    , { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(response => response.data)
    .catch(error => {
      // console.log(error)
      throw error.response.data
    })
};

export const fetchNotesHandler = () => {
  return axios.get(NOTES_FETCH_ENDPOINT)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};

// TODO handle how errors are handled in this callback
export const refreshAccessToken = (refresh_token, callback = (res) => res.data) => {
  return axios.post(AUTH_TOKEN_REFRESH_ENDPOINT, {refresh: refresh_token})
    .then(response => callback(response.data.access))
    .catch(error => {
      console.log(error)
      // throw error.response.data
    });
}

export const fetchTimelineHandler = () => {
  return axios.get(TIMELINE_FETCH_ENDPOINT)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};

export const makeNotePublicHandler = (note_id) => {
  return axios.get(TIMELINE_FETCH_ENDPOINT)
    .then(response => response.data)
    .catch(error => {
      throw error.response.data
    });
};