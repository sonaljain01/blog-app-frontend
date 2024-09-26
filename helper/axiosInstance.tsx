import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: "http://laravel_blog_post.test/api",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});