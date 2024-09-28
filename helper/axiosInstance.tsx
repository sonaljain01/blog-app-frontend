import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://laravel_blog_post.test/api",
  baseURL: "http://206.1.58.168/api",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});
