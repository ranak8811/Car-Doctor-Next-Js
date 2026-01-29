"use client";
import Image from "next/image";

const HeroSection = () => {
    const slides = [
        {
            id: 1,
            image: "/assets/images/homeCarousel/1.jpg",
            title: "Affordable Price For Car Servicing",
            description:
                "There are many variations of passages of  available, but the majority have suffered alteration in some form",
        },
        {
            id: 2,
            image: "/assets/images/homeCarousel/2.jpg",
            title: "Affordable Price For Car Servicing",
            description:
                "There are many variations of passages of  available, but the majority have suffered alteration in some form",
        },
        {
            id: 3,
            image: "/assets/images/homeCarousel/3.jpg",
            title: "Affordable Price For Car Servicing",
            description:
                "There are many variations of passages of  available, but the majority have suffered alteration in some form",
        },
        {
            id: 4,
            image: "/assets/images/homeCarousel/4.jpg",
            title: "Affordable Price For Car Servicing",
            description:
                "There are many variations of passages of  available, but the majority have suffered alteration in some form",
        },
    ];

    return (
        <div className="container mx-auto mt-4">
            <div className="carousel w-full h-[600px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        id={`slide${slide.id}`}
                        className="carousel-item relative w-full"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover rounded-xl"
                                priority={index === 0}
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] rounded-xl w-full">
                                <div className="text-white space-y-7 pl-12 w-1/2">
                                    <h2 className="text-6xl font-bold leading-tight">
                                        {slide.title}
                                    </h2>
                                    <p>{slide.description}</p>
                                    <div className="flex gap-5">
                                        <button className="btn btn-error text-white border-none bg-[#FF3811] hover:bg-[#FF3811]">
                                            Discover More
                                        </button>
                                        <button className="btn btn-outline text-white hover:text-[#FF3811] hover:border-[#FF3811]">
                                            Latest Project
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 gap-5">
                            <a
                                href={`#slide${slide.id === 1 ? slides.length : slide.id - 1}`}
                                className="btn btn-circle bg-opacity-20 border-none hover:bg-[#FF3811] hover:text-white text-white"
                            >
                                ❮
                            </a>
                            <a
                                href={`#slide${slide.id === slides.length ? 1 : slide.id + 1}`}
                                className="btn btn-circle bg-[#FF3811] text-white border-none"
                            >
                                ❯
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
