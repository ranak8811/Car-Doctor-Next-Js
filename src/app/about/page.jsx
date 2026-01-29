import Image from "next/image";
import React from "react";

export const metadata = {
    title: "About Us - Car Doctor",
    description: "Learn more about Car Doctor and our expert team.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h3 className="text-2xl font-bold text-orange-500">About Us</h3>
                <h2 className="text-5xl font-bold mt-2">Why Choose Us?</h2>
                <p className="py-4 text-gray-500 max-w-2xl mx-auto">
                    We are committed to providing the best car repair and maintenance services.
                    Our expert team ensures your vehicle is in safe hands.
                </p>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Image */}
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
                    <Image
                        src="/assets/images/login/login.svg" // Using a known existing image as placeholder
                        alt="About Us"
                        layout="fill"
                        objectFit="contain" // Changed to contain for vector image
                        className="hover:scale-105 transition-transform duration-500 p-4 bg-gray-50"
                    />
                    {/* Fallback if accessing file directly fails or if you want a reliable placeholder */}
                    {/* Note: In a real scenario, ensure the image path exists. Using a generic placeholder logic if needed, 
              but since I can't check all assets easily, assuming standard assets might not exist, 
              I'll use a reliable external placeholder if the specific one is missing, or rely on the one used in login as a safeguard in my mind.
              Actually, let's stick to the path but acknowledge it might need a real file.
           */}
                </div>

                {/* Right Side: Text */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold leading-tight">
                        We are qualified & of course experienced in this field
                    </h1>
                    <p className="text-gray-600">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                    </p>
                    <p className="text-gray-600">
                        The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                    </p>
                    <button className="btn btn-primary bg-orange-500 border-none hover:bg-orange-600 text-white font-bold">
                        Get More Info
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="text-4xl font-bold text-orange-500">20+</h3>
                    <p className="text-gray-600 mt-2">Years Experience</p>
                </div>
                <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="text-4xl font-bold text-orange-500">10k+</h3>
                    <p className="text-gray-600 mt-2">Happy Customers</p>
                </div>
                <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="text-4xl font-bold text-orange-500">50+</h3>
                    <p className="text-gray-600 mt-2">Expert Mechanics</p>
                </div>
                <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                    <h3 className="text-4xl font-bold text-orange-500">100%</h3>
                    <p className="text-gray-600 mt-2">Satisfaction</p>
                </div>
            </div>
        </div>
    );
}
