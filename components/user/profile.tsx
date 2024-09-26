"use client";

import { axiosInstance } from "@/helper/axiosInstance";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  type: string;
}
export const Profile = () => {
  const router = useRouter();
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
      }
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  const isAuthenticated = () => {
    if (!localStorage.getItem("token")) {
      router.push("/auth/login");
    }
  };
  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
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
