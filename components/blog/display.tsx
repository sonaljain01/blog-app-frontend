"use client";

import { axiosInstance } from "@/helper/axiosInstance";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  category: string;
  sub_category: string;
  description: string;
  publishedAt: string;
  image: string;
  slug: string;
  users: {
    name: string;
    type: string;
    email: string;
  };
  photo: string;
}
interface Error {
  response: {
    data: {
      message: string;
    };
  };
}
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
    } catch (err: Error | any) {
      alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (blog.length === 0) {
    return (
      <>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                From the blog
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Increase your skills with the blogs from the expert...
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <p>No blog post found</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Increase your skills with the blogs from the expert...
          </p>
        </div>
        <div className="mx-auto mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:max-w-7xl">
          {blog.map((post: Post) => (
            <div
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <img
                className="w-full h-48 object-cover object-center"
                src={
                  post.photo ||
                  "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={post.title}
              />
              <div className="p-6">
                <p className="text-sm font-medium text-indigo-600">
                  {`${post.category} | ${post.sub_category}`}{" "}
                </p>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h2>

                <p>{post.description.slice(0, 100)}</p>
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={`blog/${post.slug}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
