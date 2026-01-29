"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const toastId = toast.loading("Logging in...");
    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: path ? path : "/",
        redirect: false,
      });
      if (response.ok) {
        toast.success("Logged In successfully", { id: toastId });
        router.push(path ? path : "/");
        form.reset();
      } else {
        toast.error("User or Password not match", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("FAILED to Log In", { id: toastId });
    }
  };
  return (
    <div className="card w-full max-w-lg shadow-2xl bg-base-100 border border-gray-200 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#444] mb-4">Login</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-[#444]">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            className="input input-bordered focus:input-primary focus:outline-none"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-[#444]">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered focus:input-primary focus:outline-none"
            required
          />
          <label className="label mt-2">
            <a href="#" className="label-text-alt link link-hover text-[#FF3811] font-semibold">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white font-bold text-lg bg-[#FF3811] border-[#FF3811] hover:bg-[#ff2400] hover:border-[#ff2400]">Sign In</button>
        </div>
      </form>
      <div className="divider text-sm text-[#444] font-semibold mt-6">Or Sign In with</div>
      <SocialLogin />
      <div className="text-center mt-6 text-sm text-[#737373]">
        Have an account?{" "}
        <Link href="/register" className="text-[#FF3811] font-bold hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
