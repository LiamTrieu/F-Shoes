import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://192.168.11.101:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;
