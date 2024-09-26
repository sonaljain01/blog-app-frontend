import { axiosInstance } from "@/helper/axiosInstance";
import { useState } from "react";

interface Props {
  id: string;
  isAuth: boolean;
}

const CommentPost = ({ id, isAuth }: Props) => {
  const [commentInput, setCommentInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sendData = {
        blog_id: id,
        comment: commentInput,
      };
      const res = await axiosInstance.post("/comment/create", sendData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) {
        setCommentInput("");
        alert(res?.data?.message);
        window.location.reload();
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div id="comment-post">
      <input
        type="text"
        name="comment"
        id="comment"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Write a comment"
        className="border-b-2 border-indigo-500 outline-none w-full text-xl"
        disabled={!isAuth}
      />
      {!isAuth && <p>You must be logged in to comment</p>}
      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-4 border border-gray-600 bg-gray-600 text-white rounded-lg px-4 py-2"
        disabled={!isAuth}
      >
        PUBLISH
      </button>
    </div>
  );
};

export default CommentPost;
