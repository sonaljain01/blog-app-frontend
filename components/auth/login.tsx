"use client";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/helper/axiosInstance";

export const Login = () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  type schemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<schemaType> = async (data) => {
    const res = await axiosInstance.post("/auth/login", data);
    if (res.data.status) {
      alert("Login Success");
      localStorage.setItem("token", res.data.token);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border border-black w-1/3 p-4 mt-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border border-black p-1 rounded-md"
            placeholder="Your email"
            {...register("email")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border border-black p-1 rounded-md"
            placeholder="Your password"
            {...register("password")}
          />
        </div>
        <button
          type="submit"
          className="w-full border border-black p-1 rounded-md bg-blue-500 text-white"
        >
          Submit
        </button>
      </form>
      <p>
        <a className="text-blue-500 underline" href="auth/register">
          Register
        </a>
      </p>
    </div>
  );
};
