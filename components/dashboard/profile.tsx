"use client";

import { axiosInstance } from "@/helper/axiosInstance";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/redux/userProfile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";

interface User {
  name: string;
  email: string;
  type: string;
  profile_image: string;
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
          <Image
            src={user?.profile_image}
            width={100}
            height={100}
            alt="Picture of the author"
          />
        </div>
      )}
    </div>
  );
};
