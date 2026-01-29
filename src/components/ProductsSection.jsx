import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const products = [
    {
        id: 1,
        title: "Car Engine Plug",
        price: "20.00",
        rating: 5,
        img: "/assets/images/products/1.png",
    },
    {
        id: 2,
        title: "Car Air Filter",
        price: "20.00",
        rating: 5,
        img: "/assets/images/products/2.png",
    },
    {
        id: 3,
        title: "Cools Led Light",
        price: "20.00",
        rating: 5,
        img: "/assets/images/products/3.png",
    },
    {
        id: 4,
        title: "Cools Led Light",
        price: "20.00",
        rating: 5,
        img: "/assets/images/products/4.png",
    },
    {
        id: 5,
        title: "Cools Led Light",
        price: "20.00",
        rating: 5,
        img: "/assets/images/products/5.png",
    },
    {
        id: 6,
        title: "Cools Led Light",
        price: "20.00",
        rating: 5,
        img: "/assets/images/products/6.png",
    },
];

export default function ProductsSection() {
    return (
        <div className="my-12 container mx-auto">
            <div className="text-center mb-10 space-y-2">
                <h3 className="text-xl font-bold text-[#FF3811]">Popular Products</h3>
                <h2 className="text-4xl font-bold">Browse Our Products</h2>
                <p className="text-[#737373] w-1/2 mx-auto">
                    The majority have suffered alteration in some form, by injected humour,
                    or randomised words which don&apos;t look even slightly believable.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="card w-96 bg-base-100 shadow-xl border border-gray-200 mx-auto pt-6">
                        <figure className="px-10 pt-10 bg-[#F3F3F3] m-4 rounded-xl h-64 flex items-center justify-center">
                            <Image
                                src={product.img}
                                alt={product.title}
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <div className="flex text-[#FF912C] gap-1">
                                {[...Array(product.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <h2 className="card-title font-bold text-2xl text-[#444]">{product.title}</h2>
                            <div className="card-actions">
                                <p className="text-[#FF3811] font-bold text-xl">${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-8">
                <button className="btn btn-outline text-[#FF3811] hover:bg-[#FF3811] hover:text-white border-[#FF3811]">
                    More Products
                </button>
            </div>
        </div>
    );
}
