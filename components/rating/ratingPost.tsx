import { axiosInstance } from "@/helper/axiosInstance";
import { useState } from "react";
import ReactStars from "react-stars";

export const PostRating = ({ id, isAuth }: { id: string; isAuth: boolean }) => {
  const [ratingInput, setratingInput] = useState(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sendData = {
        blog_id: id,
        rating: ratingInput,
      };
      const res = await axiosInstance.post("/rating/create", sendData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) {
        setratingInput(0);
        alert(res?.data?.message);
        window.location.reload();
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      alert(err?.response?.data?.message);
    }
  };
  const ratingChanged = (newRating: number) => {
    setratingInput(newRating);
  };
  return (
    <div id="comment-post">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={50}
        color2={"#ffd700"}
      />
      {!isAuth && <p>You must be logged in to post rating</p>}
      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-4 border border-gray-600 bg-gray-600 text-white rounded-lg px-4 py-2"
        disabled={!isAuth}
      >
        Rate
      </button>
    </div>
  );
};
