"use client";

import { axiosInstance } from "@/helper/axiosInstance";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/redux/userProfile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface User {
  name: string;
  email: string;
  type: string;
}
export const Profile = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [user, setUser] = useState<User>();
  const fetchUserProfile = async () => {
    try {
      const res = await axiosInstance.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        setUser(res.data.data);
        dispatch(
          profile({
            id: res.data.data.id,
            name: res.data.data.name,
            email: res.data.data.email,
            type: res.data.data.type,
          })
        );
      }
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex ml-52">
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Type: {user?.type}</p>
        </div>
      )}
    </div>
  );
};
