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
    // <div classNameName="flex ml-52">
    //   <h1>Profile</h1>
    //   {user && (
    //     <div>
    //       <p>Name: {user?.name}</p>
    //       <p>Email: {user?.email}</p>
    //       <p>Type: {user?.type}</p>
    //       <Image
    //         src={user?.profile_image}
    //         width={100}
    //         height={100}
    //         alt="Picture of the author"
    //       />
    //     </div>
    //   )}
    // </div>

    <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This is some information about the user.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        {user && (
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Profile image</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Image
                  src={user?.profile_image}
                  width={100}
                  height={100}
                  alt="Picture of the author"
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
};
