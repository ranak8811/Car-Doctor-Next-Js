import Link from "next/link";
import React, { Suspense } from "react";
import LoginForm from "./components/LoginForm";
import Image from "next/image";

export const metadata = {
  title: "Login",
  description: "Login to Car Doctor",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Image */}
          <div className="hidden lg:flex justify-center flex-col items-center">
            <div className="relative w-full max-w-lg">
              <Image
                className="w-full h-auto drop-shadow-xl"
                src={"/assets/images/login/login.svg"}
                width={460}
                height={500}
                alt={"Authentication Illustration"}
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="flex justify-center lg:justify-start w-full">
            <div className="w-full max-w-lg">
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
