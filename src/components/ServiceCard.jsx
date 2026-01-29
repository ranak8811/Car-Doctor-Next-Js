import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const ServiceCard = ({ service }) => {
    const { title, img, price, _id, service_id } = service;
    return (
        <div className="card w-96 bg-base-100 shadow-xl border border-gray-200">
            <figure className="px-5 pt-5">
                {/* Use a valid image path or fallback */}
                <Image
                    src={img}
                    alt={title}
                    width={314}
                    height={208}
                    className="rounded-xl h-52 object-cover"
                    unoptimized={true} // Bypassing Next.js optimization due to timeout issues with external host
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-2xl text-[#444]">{title}</h2>
                <div className="card-actions justify-between items-center text-[#FF3811]">
                    <p className="text-xl font-semibold">Price : ${price}</p>
                    <Link href={`/services/${_id || service_id}`}>
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
