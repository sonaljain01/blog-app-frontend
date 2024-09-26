"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/userProfile";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  function logoutBtn() {
    dispatch(logout());
    router.push("/auth/login");
  }
  return (
    <div>
      <button onClick={logoutBtn}>Logout</button>
    </div>
  );
};
