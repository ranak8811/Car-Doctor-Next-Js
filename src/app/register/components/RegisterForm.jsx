"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { registerUser } from "@/app/actions/auth/registerUser";
import SocialLogin from "@/app/login/components/SocialLogin";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];
    const toastId = toast.loading("Creating account...");

    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;
        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          imageUrl = data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      await registerUser({ name, email, password, image: imageUrl });
      toast.success("Account created successfully", { id: toastId });
      form.reset();
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed", { id: toastId });
    }
  };
  return (
    <div className="card w-full max-w-lg shadow-2xl bg-base-100 border border-gray-200 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#444] mb-4">Sign Up</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-[#444]">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            className="input input-bordered focus:input-primary focus:outline-none"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-[#444]">Email</span>
          </label>
          <input
            type="email" // Changed to email type
            name="email"
            placeholder="email@example.com"
            className="input input-bordered focus:input-primary focus:outline-none"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-[#444]">Profile Picture</span>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-[#444]">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            className="input input-bordered focus:input-primary focus:outline-none"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white font-bold text-lg bg-[#FF3811] border-[#FF3811] hover:bg-[#ff2400] hover:border-[#ff2400]">Sign Up</button>
        </div>
      </form>
      <div className="divider text-sm text-[#444] font-semibold mt-6">Or Sign Up with</div>

      <SocialLogin />

      <div className="text-center mt-6 text-sm text-[#737373]">
        Already have an account?{" "}
        <Link href="/login" className="text-[#FF3811] font-bold hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
