import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = ({ title, path, children }) => {
    return (
        <div className="container mx-auto">
            <section className="relative w-full h-[300px] mb-8 rounded-xl overflow-hidden mt-6">
                <Image
                    src={"/assets/images/checkout/checkout.png"}
                    alt={title || "Banner"}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80 flex items-center pl-10">
                    <h1 className="text-white text-4xl font-bold">{title}</h1>
                </div>
                <div className="absolute bottom-0 left-[45%] bg-[#FF3811] text-white px-5 py-2 rounded-t-lg">
                    <p className="font-semibold">{path}</p>
                </div>
                {children}
            </section>
        </div>
    );
};

export default Banner;
