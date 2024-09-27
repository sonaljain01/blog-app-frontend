"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/helper/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Blog {
  title: string;
  created_at: string;
  type: string;
  slug: string;
}
export const UserBlog = () => {
  const router = useRouter();
  const { id } = useSelector((state: RootState) => state.auth);
  const [blog, setBlog] = useState<any[]>([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("/blog/user", {
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

  function isAuthenticated() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blog.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

const BlogCard = (props: { blog: Blog }) => {
  const { title, created_at, type, slug } = props.blog;
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">Created: {DateFormatter(created_at)}</p>
      <div className="flex gap-3">
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
            type === "publish"
              ? "bg-green-200 text-green-700"
              : "bg-yellow-200 text-yellow-700"
          }`}
        >
          {type === "publish" ? "Published" : "Draft"}
        </span>
        <Link
          href={`/blog/edit/${slug}`}
          className="text-indigo-500 hover:text-indigo-700 font-semibold"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

function DateFormatter(publishedAt: string) {
  const optionsDate: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateObject = new Date(publishedAt);
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date format");
  }

  const formattedDate = dateObject.toLocaleDateString("en-US", optionsDate);
  const formattedTime = dateObject.toLocaleTimeString("en-US", optionsTime);

  return `${formattedDate} at ${formattedTime}`;
}
