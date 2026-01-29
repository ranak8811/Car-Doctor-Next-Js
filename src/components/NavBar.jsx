"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  const { data: session, status } = useSession();

  const navMenu = () => {
    return (
      <>
        <li><Link href={"/"} className="font-semibold hover:text-orange-500 transition-colors">Home</Link></li>
        <li><Link href={"/about"} className="font-semibold hover:text-orange-500 transition-colors">About</Link></li>
        <li><Link href={"/services"} className="font-semibold hover:text-orange-500 transition-colors">Services</Link></li>
        <li><Link href={"/blogs"} className="font-semibold hover:text-orange-500 transition-colors">Blogs</Link></li>
        <li><Link href={"/my-bookings"} className="font-semibold hover:text-orange-500 transition-colors">My Bookings</Link></li>
      </>
    );
  };

  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
              {navMenu()}
            </ul>
          </div>
          <Link href={"/"} className="btn btn-ghost text-xl h-auto p-0 hover:bg-transparent">
            <Image src={"/assets/logo.svg"} width={80} height={60} alt="brand logo" className="h-[50px] w-auto" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            {navMenu()}
          </ul>
        </div>
        <div className="navbar-end gap-4">
          <ul className="menu menu-horizontal px-1">
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <Image
                        src={session?.user?.image || "/assets/images/team/1.jpg"}
                        width={40}
                        height={40}
                        alt="user-logo"
                      />
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                      <p className="justify-between">
                        {session?.user?.name || "User"}
                      </p>
                    </li>
                    <li><button onClick={() => signOut()}>Logout</button></li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href={"/login"} className="btn btn-ghost btn-sm font-semibold">Login</Link>
                <Link href={"/register"} className="btn btn-outline btn-warning btn-sm font-semibold">Register</Link>
              </div>
            )}
          </ul>
          <Link href="/appointment" className="btn btn-outline btn-primary btn-sm hidden md:flex">Appointment</Link>
        </div>
      </div>
    </div>
  );
}
