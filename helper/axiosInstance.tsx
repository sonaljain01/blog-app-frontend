import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: "http://206.1.60.108/api",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});