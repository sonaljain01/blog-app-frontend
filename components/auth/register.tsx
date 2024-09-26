"use client";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/helper/axiosInstance";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Register = () => {
  const router = useRouter();
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().min(1),
    // type: z.string().min(1),
  });

  type schemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<schemaType> = async (data) => {
    const sendData = {
      ...data,
      type: "writer",
    };
    try {
      const res = await axiosInstance.post("/auth/register", sendData);
      if (res.data.status) {
        alert("Register Success");
        router.push("login");
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border border-black w-1/3 p-4 mt-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            className="border border-black p-1 rounded-md"
            placeholder="Your name"
            {...register("name")}
          />
        </div>
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
        <Link className="text-blue-500 underline" href="login">
          Login
        </Link>
      </p>
    </div>
  );
};
