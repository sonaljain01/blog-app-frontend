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
import axios from "axios";

export const BlogInput = () => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [category, setCategory] = useState<any[]>([]);
  const [childcategory, setchildCategory] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [parentCategory, setparentCategory] = useState("arihant");
  const [childCategoryValue, setchildCategoryValue] = useState("arihant");
  const [description, setdescription] = useState("");

  const fetchCategory = async () => {
    try {
      const res = await axiosInstance.get("/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setCategory(res.data.data);
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const fetchchildCategory = async (parentCategory: string) => {
    try {
      const res = await axiosInstance.get(`/category/child/${parentCategory}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setchildCategory(res.data.data || []);
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].type.includes("image")
    ) {
      setImage(event.target.files[0]);
    } else {
      alert("Please select an image file");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (parentCategory) {
      const selectedid = category.find(
        (item: { name: string }) => item.name === parentCategory
      );
      if (selectedid) {
        fetchchildCategory(selectedid?.id);
      }
    }
  }, [parentCategory]);

  const handlePublish = async (value: string) => {
    const parent = category.find(
      (item: { name: string }) => item.name === parentCategory
    );

    const child = childcategory.find(
      (item: { name: string }) => item.name === childCategoryValue
    );

    const data: any = new FormData();
    data.append("title", updatedTitle);
    data.append("category", parent.id.toString());
    data.append("sub_category", child.id.toString());
    data.append("image", image);
    data.append("description", description);
    data.append("type", value);
    data.append("tag", "1");

    try {
      const res = await axiosInstance.post("/blog/create", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

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
        <Select onValueChange={(value) => setparentCategory(value)}>
          <SelectTrigger className="w-full mt-5">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {category.map((item: any) => (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {childcategory.length > 0 && (
          <Select onValueChange={(value) => setchildCategoryValue(value)}>
            <SelectTrigger className="w-full mt-5">
              <SelectValue placeholder="Child Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {childcategory.map((item: any) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <Editor description={description} setdescription={setdescription} />

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
