"use client";

import { axiosInstance } from "@/helper/axiosInstance";
import { useEffect, useState } from "react";

export const BlogDisplay = () => {
  const [blog, setBlog] = useState([]);
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get("/blog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setBlog(res?.data?.data);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (blog.length === 0) {
    return (
      <>
        <h1>No Blog Found</h1>
      </>
    );
  }
  return (
    <>
      <h1>Blog Display</h1>
    </>
  );
};
