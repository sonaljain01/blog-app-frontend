"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Editor } from "../editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/helper/axiosInstance";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const BlogEdit = ({ slug }: { slug: string }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [category, setCategory] = useState<any[]>([]);
  const [childCategory, setChildCategory] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [parentCategory, setParentCategory] = useState<string>("");
  const [childCategoryValue, setChildCategoryValue] = useState<string>("");
  const [description, setDescription] = useState("");

  const fetchCategory = async () => {
    try {
      const res = await axiosInstance.get("/category", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 200) {
        setCategory(res.data.data);
      }
    } catch (err: any) {
      console.error(err?.response?.data?.message);
    }
  };

  const fetchChildCategory = async (parentCategoryId: string) => {
    try {
      const res = await axiosInstance.get(
        `/category/child/${parentCategoryId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.status === 200) {
        setChildCategory(res.data.data || []);
      }
    } catch (err: any) {
      console.error(err?.response?.data?.message);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.includes("image")) {
      setImage(file);
    } else {
      alert("Please select a valid image file");
    }
  };

  const fetchBlogData = async () => {
    try {
      const res = await axiosInstance.get(`/blog/${slug}`);
      if (res.status === 200) {
        const blogData = res.data.data;
        setUpdatedTitle(blogData.title);
        setDescription(blogData.description);
        setImage(blogData.photo);
        setParentCategory(blogData.parent_category.name);
        setChildCategoryValue(blogData.child_category.name);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  const handlePublish = async (type: string) => {
    const parent = category.find((item) => item.name === parentCategory);
    const child = childCategory.find(
      (item) => item.name === childCategoryValue
    );

    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("parent_category", parent?.id.toString() || "");
    formData.append("child_category", child?.id.toString() || "");
    formData.append("description", description);
    formData.append("type", type);
    formData.append("tag", "1");

    if (image && typeof image !== "string") {
      formData.append("image", image);
    }

    try {
      const res = await axiosInstance.post(
        `/blog/update/${slug}?_method=PUT`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.status === 200) {
        alert(res.data.message);
        if (type === "publish") {
          router.push("/blog");
        }
      }
    } catch (err: any) {
      console.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    const parent = category.find((item) => item.name === parentCategory);
    if (parent) {
      fetchChildCategory(parent.id);
    }
  }, [parentCategory, category]);

  useEffect(() => {
    fetchBlogData();
  }, [slug]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please login first");
      router.push("/auth/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="p-4">
      <div className="mb-3">
        <input
          required
          type="text"
          value={updatedTitle}
          placeholder="Insert title here"
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="border-b-0 border-black w-full text-3xl hover:border-b-2 focus:outline-none focus:border-b-2 focus:border-black"
        />
      </div>
      <div className="mb-5">
        <Input
          id="picture"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          required
        />
        <Select onValueChange={setParentCategory} value={parentCategory}>
          <SelectTrigger className="w-full mt-5">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {category.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {childCategory.length > 0 && (
          <Select
            onValueChange={setChildCategoryValue}
            value={childCategoryValue}
          >
            <SelectTrigger className="w-full mt-5">
              <SelectValue placeholder={"Sub Category"} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {childCategory.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <Editor description={description} setdescription={setDescription} />

      <div className="flex gap-5">
        <button
          onClick={() => handlePublish("publish")}
          className="mt-5 bg-black text-white p-2"
        >
          Publish
        </button>
        <button
          onClick={() => handlePublish("draft")}
          className="mt-5 text-black p-2 border-2 border-black"
        >
          Draft
        </button>
      </div>
    </div>
  );
};
