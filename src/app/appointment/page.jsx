
import React from 'react';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { getServices } from '@/lib/getServices';
import Banner from '@/components/Banner';

export const metadata = {
    title: "Appointment",
    description: "Book an appointment",
};

export default async function AppointmentPage() {
    const services = await getServices();

    return (
        <div className="container mx-auto my-10">
            <Banner title="Appointment" path="Home/Appointment" />
            <div className="bg-[#F3F3F3] p-12 rounded-xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#FF3811]">Book an Appointment</h2>
                <AppointmentForm services={services} />
            </div>
        </div>
    );
}
