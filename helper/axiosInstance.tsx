import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://206.1.58.168/api/",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});
