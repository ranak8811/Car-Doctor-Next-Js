import CheckoutForm from "@/components/forms/CheckoutForm";
import { getServiceById } from "@/lib/getServices";
import Image from "next/image";
import React from "react";
import Banner from "@/components/Banner";

export async function generateMetadata({ params }) {
  const p = await params;
  const service = await getServiceById(p.id);
  return {
    title: `Checkout - ${service?.title || "Service"}`,
    description: `Checkout for ${service?.title}`,
  };
}

export default async function CheckoutPage({ params }) {
  const p = await params;
  const data = await getServiceById(p.id);

  if (!data) {
    return <div className="text-center mt-20">Service not found</div>;
  }

  return (
    <div className="container mx-auto my-10 px-4">
      {/* Banner Section */}
      <Banner title="Check Out" path="Home/Checkout" />

      <div className="bg-[#F3F3F3] p-12 rounded-xl">
        <CheckoutForm data={data} />
      </div>

    </div>
  );
}
