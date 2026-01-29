import { getServiceById } from "@/lib/getServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Banner from "@/components/Banner";

export async function generateMetadata({ params }) {
  const p = await params;
  const service = await getServiceById(p.id);
  return {
    title: service?.title || "Service Details",
    description: service?.description,
  };
}

export default async function ServiceDetailsPage({ params }) {
  const p = await params;
  const data = await getServiceById(p.id);

  if (!data) {
    return <div className="text-center mt-20">Service not found</div>;
  }

  const { title, img, price, facility, description } = data;

  return (
    <div className="container mx-auto my-10 px-4">
      {/* Banner Section */}
      <Banner title="Service Details" path="Home/Service Details" />


      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
            <Image
              src={data.img}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold text-[#444]">{data.title}</h2>
          <p className="text-[#737373] text-justify leading-relaxed">
            {data.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.facility?.map((item, index) => (
              <div
                key={index}
                className="bg-[#F3F3F3] p-6 rounded-lg border-t-2 border-[#FF3811]"
              >
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-[#737373]">{item.details}</p>
              </div>
            ))}
          </div>

          <p className="text-[#737373] text-justify leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Right Side: Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#F3F3F3] p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Services</h3>
            <div className="space-y-4">
              <button className="btn w-full bg-white justify-between hover:bg-[#FF3811] hover:text-white text-[#444]">
                <span>Full Car Repair</span> <span className="text-[#FF3811] hover:text-white">➔</span>
              </button>
              <button className="btn w-full bg-[#FF3811] text-white justify-between">
                <span>Engine Repair</span> <span>➔</span>
              </button>
              <button className="btn w-full bg-white justify-between hover:bg-[#FF3811] hover:text-white text-[#444]">
                <span>Automatic Services</span> <span className="text-[#FF3811] hover:text-white">➔</span>
              </button>
            </div>
          </div>

          <div className="bg-[#151515] text-white p-8 rounded-lg text-center space-y-4">
            <Image src="/assets/logo.svg" width={100} height={40} alt="Logo" className="mx-auto bg-white p-2 rounded" />
            <h3 className="text-xl font-bold">Need Help? We Are Here To Help You</h3>
            <div className="bg-white text-black p-4 rounded-lg relative">
              <h4 className="font-bold"><span className="text-[#FF3811]">Car Doctor</span> Special</h4>
              <p className="text-xs">Save up to <span className="text-[#FF3811]">60% off</span></p>
            </div>
            <button className="btn btn-error bg-[#FF3811] border-none text-white w-full">Get A Quote</button>
          </div>


          <h3 className="text-3xl font-bold text-[#444]">Price: ${data.price}</h3>
          <Link href={`/checkout/${data._id || data.service_id}`}>
            <button className="btn btn-primary w-full bg-[#FF3811] border-[#FF3811] text-white text-lg">
              Proceed Checkout
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
