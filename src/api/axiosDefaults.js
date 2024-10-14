import axios from "axios";

// Define url of API
axios.defaults.baseURL = "https://syncora-api-ecc74194384c.herokuapp.com/";
// Allow images to also be uploaded when changing profile pic
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// Avoid CORS errors while sending cookies
axios.defaults.withCredentials = true;
