"use client";

import { axiosInstance } from "@/helper/axiosInstance";

interface Error {
  response: {
    data: {
      message: string;
    };
  };
}
export const DeleteBlog = ({ id }: { id: string }) => {
  const deleteBlog = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.delete(`/blog/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        alert(res?.data?.message);
        window.location.reload();
      }
    } catch (err: Error | any) {
      // const error = err as AxiosError;
      alert(err.response.data.message);
    }
  };

  const confirmDelete = () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteBlog();
    }
  };
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={confirmDelete}
    >
      Delete
    </button>
  );
};
