"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function SocialLogin() {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleSocialLogin = (providerName) => {
    signIn(providerName, {
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push(path ? path : "/");
      // toast.success("Successfully Logged In"); // Removed to avoid double toast on redirect
    }
  }, [session?.status, router, path]);

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => handleSocialLogin("google")}
        className="btn btn-circle btn-outline hover:bg-[#FF3811] hover:text-white text-[#FF3811] border-[#FF3811] hover:border-[#FF3811] transition-all"
        aria-label="Login with Google"
      >
        <FaGoogle className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleSocialLogin("github")}
        className="btn btn-circle btn-outline hover:bg-[#FF3811] hover:text-white text-[#FF3811] border-[#FF3811] hover:border-[#FF3811] transition-all"
        aria-label="Login with GitHub"
      >
        <FaGithub className="w-5 h-5" />
      </button>
    </div>
  );
}
