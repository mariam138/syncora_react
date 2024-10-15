import axios from "axios";

// Create axios instance and export it for use in other components
const api = axios.create({
  baseURL: "https://syncora-api-ecc74194384c.herokuapp.com/",
});
// Allow images to also be uploaded when changing profile pic
api.defaults.headers.post["Content-Type"] = "multipart/form-data";
// Avoid CORS errors while sending cookies
api.defaults.withCredentials = true;

export default api;