import Image from "next/image";
import React from "react";

const features = [
    {
        id: 1,
        title: "Expert Team",
        icon: "/assets/icons/group.svg",
    },
    {
        id: 2,
        title: "Timely Delivery",
        icon: "/assets/icons/deliveryt.svg", // Note: Filename from previous list_dir
        isHighlighted: true,
    },
    {
        id: 3,
        title: "24/7 Support",
        icon: "/assets/icons/person.svg",
    },
    {
        id: 4,
        title: "Best Equipment",
        icon: "/assets/icons/Wrench.svg",
    },
    {
        id: 5,
        title: "100% Guarantee",
        icon: "/assets/icons/check.svg",
    },
    {
        id: 6,
        title: "Timely Delivery",
        icon: "/assets/icons/deliveryt.svg",
    },
];

export default function CoreFeatures() {
    return (
        <div className="my-12 container mx-auto mb-20">
            <div className="text-center mb-10 space-y-2">
                <h3 className="text-xl font-bold text-[#FF3811]">Core Features</h3>
                <h2 className="text-4xl font-bold">Why Choose Us</h2>
                <p className="text-[#737373] w-1/2 mx-auto">
                    The majority have suffered alteration in some form, by injected humour,
                    or randomised words which don&apos;t look even slightly believable.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className={`flex flex-col items-center justify-center p-6 border rounded-xl hover:bg-[#FF3811] hover:text-white transition-colors duration-300 group ${feature.isHighlighted ? "bg-[#FF3811] text-white" : "border-gray-200"
                            }`}
                    >
                        <div className={`mb-4 ${feature.isHighlighted ? "" : "group-hover:brightness-0 group-hover:invert"}`}>
                            <Image
                                src={feature.icon}
                                alt={feature.title}
                                width={50}
                                height={50}

                            />
                        </div>

                        <h3 className="font-bold font-lg text-center whitespace-nowrap">{feature.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
