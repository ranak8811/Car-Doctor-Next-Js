export const dynamic = "force-dynamic";
import ServiceFilter from "@/components/ServiceFilter";
import { getServices } from "@/lib/getServices";
import React from "react";

export const metadata = {
    title: "Services",
    description: "Our Services",
};

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-orange-500">Service</h3>
                <h2 className="text-5xl font-bold">Our Service Area</h2>
                <p className="py-4 text-gray-500 max-w-2xl mx-auto">
                    The majority have suffered alteration in some form, by injected humour,
                    or randomised words which don't look even slightly believable.
                </p>
            </div>
            <ServiceFilter services={services} />
        </div>
    );
}
