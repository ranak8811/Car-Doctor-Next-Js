"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import Banner from "@/components/Banner";

const ProfilePage = () => {
    const { data: session, update } = useSession();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setImage(session.user.image || "");
        }
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, image }),
            });

            if (res.ok) {
                toast.success("Profile updated successfully!");
                // Update the session explicitly to reflect changes immediately
                await update({
                    ...session,
                    user: {
                        ...session.user,
                        name: name,
                        image: image,
                    },
                });
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!session) {
        return (
            <div className="container mx-auto my-20 text-center">
                <h2 className="text-2xl font-bold">Please log in to view your profile.</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-10">
            <Banner title="My Profile" path="Home/Profile" />

            <div className="bg-[#F3F3F3] p-12 rounded-xl max-w-2xl mx-auto mt-12">
                <div className="flex flex-col items-center mb-8">
                    {image ? (
                        <Image
                            src={image}
                            alt="Profile"
                            width={120}
                            height={120}
                            className="rounded-full object-cover border-4 border-[#FF3811]"
                            unoptimized
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-500">
                            {name?.charAt(0) || "U"}
                        </div>
                    )}
                    <h2 className="text-2xl font-bold mt-4 text-[#444]">{session.user.email}</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-[#444]">Display Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold text-[#444]">Profile Picture URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            className="input input-bordered w-full"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <label className="label">
                            <span className="label-text-alt">Provide a direct link to an image to update your avatar.</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary w-full bg-[#FF3811] border-[#FF3811] text-white ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
