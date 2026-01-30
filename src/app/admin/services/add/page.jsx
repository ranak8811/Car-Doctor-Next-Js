"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddServicePage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        img: "",
        facility: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Basic validation
            if (!formData.title || !formData.price) return;

            const res = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Service added successfully");
                router.push("/admin/services");
            } else {
                toast.error("Failed to add service");
            }
        } catch (error) {
            toast.error("Error submitting form");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Add New Service</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">Image URL</label>
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-control">
                    <label className="label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full h-32"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full bg-[#FF3811] border-none mt-4">
                    Create Service
                </button>
            </form>
        </div>
    );
};

export default AddServicePage;
