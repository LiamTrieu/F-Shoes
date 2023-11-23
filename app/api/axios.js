import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://172.16.33.187:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;
