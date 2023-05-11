import axios from "axios";

const api = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3333",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Max-Age": 86400,
    // Authorization: "Bearer " + access,
  },
  baseURL: "http://localhost:3333",
});

export default api;
