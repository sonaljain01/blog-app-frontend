"use client";

import { Profile } from "./profile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const router = useRouter();
  const isAuthenticated = () => {
    if (!localStorage.getItem("token")) {
      router.push("/auth/login");
    }
  };
  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div>
      <Profile />
    </div>
  );
};
