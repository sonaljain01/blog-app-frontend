"use client";

import { ChangeEvent, useState } from "react";
import { Editor } from "../editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const BlogInput = () => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tag, setTag] = useState("random");

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

  return (
    <div className="p-4">
      <div className="mb-3">
        <input
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
        <Select onValueChange={(value) => setTag(value)}>
          <SelectTrigger className="w-full mt-5">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="light">Technical</SelectItem>
            <SelectItem value="buisness">Buisness</SelectItem>
            <SelectItem value="management">Management</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Editor />
    </div>
  );
};
