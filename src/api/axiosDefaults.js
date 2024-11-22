import axios from "axios";

// Create axios instance and export it for use in other components
// Code adapted from: https://axios-http.com/docs/config_defaults
// Allow images to also be uploaded when changing profile pic
// Avoid CORS errors while sending cookies
const api = axios.create({
  baseURL: "https://syncora-api-ecc74194384c.herokuapp.com/",
  headers: { post: { "Content-Type": "multipart/form-data" } },
  withCredentials: true,
});

export default api;

// Create request and response interceptors for the api
export const apiReq = api.create();
export const apiResp = api.create();
