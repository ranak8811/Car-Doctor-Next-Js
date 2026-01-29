"use client";
import React from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const AppointmentForm = ({ services }) => {
    const { data: session } = useSession();

    const handleBooking = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const serviceId = form.service.value;
        const message = form.message.value;

        const selectedService = services.find(s => s._id === serviceId || s.service_id === serviceId);

        if (!selectedService) {
            toast.error("Please select a service");
            return;
        }

        const booking = {
            customerName: name,
            email,
            date,
            service: selectedService.title,
            service_content_id: selectedService._id || selectedService.service_id,
            price: selectedService.price,
            phone,
            message,
            img: selectedService.img,
            status: 'Pending'
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/booking`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(booking),
            });
            const data = await res.json();
            if (data.insertedId) {
                toast.success("Service Booked Successfully");
                form.reset();
            }
        } catch (error) {
            toast.error("Booking Failed");
        }
    };

    return (
        <form onSubmit={handleBooking} className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={session?.user?.name}
                        placeholder="Your Name"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name="date" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={session?.user?.email}
                        placeholder="Your Email"
                        className="input input-bordered"
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Your Phone"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label">
                        <span className="label-text">Service</span>
                    </label>
                    <select name="service" className="select select-bordered w-full" defaultValue="" required>
                        <option value="" disabled>Select a Service</option>
                        {services.map((service) => (
                            <option key={service._id || service.service_id} value={service._id || service.service_id}>
                                {service.title} (${service.price})
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-control mt-6">
                <label className="label">
                    <span className="label-text">Message</span>
                </label>
                <textarea
                    name="message"
                    className="textarea textarea-bordered h-24"
                    placeholder="Your Message"
                ></textarea>
            </div>
            <div className="form-control mt-6">
                <input
                    className="btn btn-primary btn-block text-white bg-[#FF3811] hover:bg-[#d02e0e] border-none"
                    type="submit"
                    value="Order Confirm"
                />
            </div>
        </form>
    );
};

export default AppointmentForm;
