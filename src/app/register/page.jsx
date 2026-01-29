import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import RegisterForm from "./components/RegisterForm";

export const metadata = {
  title: "Register",
  description: "Register for Car Doctor",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Image */}
          <div className="hidden lg:flex justify-center flex-col items-center">
            <div className="relative w-full max-w-lg">
              <Image
                className="w-full h-auto drop-shadow-xl"
                src={"/assets/images/login/login.svg"} // Using same image as placeholder/intended
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
                <RegisterForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
