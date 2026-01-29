import Image from "next/image";
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const teamMembers = [
    {
        id: 1,
        name: "Car Engine Plug",
        role: "Engine Expert",
        img: "/assets/images/team/1.jpg",
    },
    {
        id: 2,
        name: "Car Engine Plug",
        role: "Engine Expert",
        img: "/assets/images/team/2.jpg",
    },
    {
        id: 3,
        name: "Car Engine Plug",
        role: "Engine Expert",
        img: "/assets/images/team/3.jpg",
    },
];

export default function TeamSection() {
    return (
        <div className="my-12 container mx-auto">
            <div className="text-center mb-10 space-y-2">
                <h3 className="text-xl font-bold text-[#FF3811]">Team</h3>
                <h2 className="text-4xl font-bold">Meet Our Team</h2>
                <p className="text-[#737373] w-1/2 mx-auto">
                    The majority have suffered alteration in some form, by injected humour,
                    or randomised words which don&apos;t look even slightly believable.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                    <div key={member.id} className="card bg-base-100 shadow-xl border border-gray-200 mx-auto">
                        <figure className="px-5 pt-5">
                            <Image
                                src={member.img}
                                alt={member.name}
                                width={300}
                                height={300}
                                className="rounded-xl w-full object-cover"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title font-bold text-2xl text-[#444]">{member.name}</h2>
                            <p className="text-[#737373] font-semibold">{member.role}</p>
                            <div className="flex gap-4 mt-2">
                                <div className="bg-[#395185] p-2 rounded-full text-white cursor-pointer hover:bg-opacity-80">
                                    <FaFacebookF />
                                </div>
                                <div className="bg-[#55ACEE] p-2 rounded-full text-white cursor-pointer hover:bg-opacity-80">
                                    <FaTwitter />
                                </div>
                                <div className="bg-[#0A66C2] p-2 rounded-full text-white cursor-pointer hover:bg-opacity-80">
                                    <FaLinkedinIn />
                                </div>
                                <div className="bg-[#C13584] p-2 rounded-full text-white cursor-pointer hover:bg-opacity-80">
                                    <FaInstagram />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
