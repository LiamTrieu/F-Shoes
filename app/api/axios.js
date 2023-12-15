import axios from "axios";
import { url } from "../service/url";

const axiosApi = axios.create({
  baseURL: url + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;
