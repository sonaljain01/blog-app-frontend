import { axiosInstance } from "@/helper/axiosInstance";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";

export const ShowRating = ({ id }: { id: string }) => {
  const [rating, setRating] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const displayRating = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get(`/rating/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res.data.data);
        setRating(res.data.data);
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      //   alert(err?.response?.data?.message);
    }
  };
  const displayAvgRating = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get(`/rating/avg/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setAvgRating(res.data.data);
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      //   alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    displayAvgRating();
    displayRating();
  }, [id]);


  return (
    <div id="comments" className="mb-5">
      <p className="text-xl font-bold mb-2">Ratings</p>
      <p>
        <span className="underline">Average Rating:</span> {avgRating}
      </p>
      <div id="main-comment-box" className="flex flex-col gap-5">
        <p>{rating.length} Ratings</p>
        {rating.map((comment: any) => (
          <ReactStars value={comment?.rating} count={5} size={25} color2={"#ffd700"} edit={false} />
        ))}
      </div>
    </div>
  );
};
