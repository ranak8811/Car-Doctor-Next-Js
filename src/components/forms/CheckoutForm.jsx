"use client";

import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ data }) => {
  const { data: session } = useSession();

  const handleBookService = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Processing Booking...");

    const form = e.target;
    // const name = form.name.value; // Name is readOnly from session usually
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    // const email = form.email.value; // Email is readOnly

    const bookingPayload = {
      // Session
      customerName: session?.user?.name,
      email: session?.user?.email,

      // User Inputs
      date,
      phone,
      address,

      // Extra information
      service_id: data._id || data.service_id,
      service_name: data.title,
      service_img: data.img,
      service_price: data.price,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        body: JSON.stringify(bookingPayload),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        toast.success("Booking Successful", { id: toastId });
        form.reset();
      } else {
        toast.error("Booking Failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }

  };

  return (
    <form onSubmit={handleBookService}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <input
            defaultValue={session?.user?.name}
            readOnly
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full focus:outline-none focus:border-[#FF3811]"
          />
        </div>
        <div className="form-control">
          <input
            type="date"
            name="date"
            className="input input-bordered w-full focus:outline-none focus:border-[#FF3811]"
            required
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            className="input input-bordered w-full focus:outline-none focus:border-[#FF3811]"
            required
          />
        </div>
        <div className="form-control">
          <input
            defaultValue={session?.user?.email}
            readOnly
            type="email"
            name="email"
            placeholder="Your Email"
            className="input input-bordered w-full focus:outline-none focus:border-[#FF3811]"
          />
        </div>
        <div className="form-control md:col-span-2">
          <textarea
            name="address"
            className="textarea textarea-bordered h-40 w-full focus:outline-none focus:border-[#FF3811]"
            placeholder="Your Message/Address"
            required
          ></textarea>
        </div>
        <div className="form-control md:col-span-2 mt-6">
          <button className="btn btn-primary bg-[#FF3811] border-[#FF3811] text-white w-full hover:bg-[#ff2400] hover:border-[#ff2400]">
            Order Confirm
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
