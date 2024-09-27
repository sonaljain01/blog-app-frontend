"use client";

import { Profile } from "./profile";
import { SidePanel } from "./sidepanel";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
    <>
      <SidePanel />
      <Profile />
    </>
  );
};
