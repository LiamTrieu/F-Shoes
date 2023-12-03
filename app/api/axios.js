import axios from "axios";

const axiosApi = axios.create({
  // baseURL: "http://192.168.11.101:8080/api",
  // baseURL: "https://fshoes.onrender.com/api",
  baseURL: "https://f-shoes-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;
