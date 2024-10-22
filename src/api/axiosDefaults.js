import axios from "axios";

// Create axios instance and export it for use in other components
// Code adapted from: https://axios-http.com/docs/config_defaults
// const api = axios.create({
//   baseURL: "https://syncora-api-ecc74194384c.herokuapp.com/",
// });
// // Allow images to also be uploaded when changing profile pic
// api.defaults.headers.post["Content-Type"] = "multipart/form-data";
// // Avoid CORS errors while sending cookies
// api.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "https://syncora-api-ecc74194384c.herokuapp.com/",
  headers: { post: { "Content-Type": "multipart/form-data" } },

  withCredentials: true,
});

export default api;

// axios.defaults.baseURL = "https://syncora-api-ecc74194384c.herokuapp.com/";
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// axios.defaults.withCredentials = true;

// export const axiosReq = axios.create();
// export const axiosRes = axios.create();
