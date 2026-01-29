export const dynamic = "force-dynamic"; // Ensure dynamic rendering if needed
import ServicesSection from "@/app/components/ServicesSection";
import React from "react";

export const metadata = {
    title: "Services",
    description: "Our Services",
};

export default function ServicesPage() {
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
            <ServicesSection />
        </div>
    );
}
