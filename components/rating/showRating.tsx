import { axiosInstance } from "@/helper/axiosInstance";
import { useEffect, useState } from "react";

export const ShowRating = ({ id }: { id: string }) => {
  const [rating, setRating] = useState([]);
  const displayRating = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get(`/rating/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setRating(res.data.data);
      }
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      //   alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    displayRating();
  }, []);

  return <h1>q</h1>;
};
