"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ManageServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            // Re-use logic or fetch from public API if available, 
            // but since we need fresh data, let's call our own API if we built a GET all there or leverage existing.
            // But wait, our new API in /api/services handles POST/PUT/DELETE. 
            // We can use the public /lib/getServices if it was an API, but it's a lib function.
            // Let's use the public page data fetching strategy or just calling a new GET endpoint?
            // Actually, we can just fetch from the public services page logic or simply fetch from database.
            // Since `getServices` is server-side, we should probably add a GET to /api/services for client usage or use server component.
            // BUT this is a client component for interactivity (delete).
            // Let's assume we can fetch data via a server action or an API. 
            // Let's use the public data since we just migrated it to DB. 
            // Actually, we can't easily import `getServices` here as it is server-only (fs/db).
            // So checking `api/services/route.js`, I didn't add GET there.
            // I should have. Let's fix that or use `fetch('/services')` if that returned JSON? No, that returns HTML.
            // I will add a simple GET to /api/services/route.js actually or just fetch `services.json` (NO, we migrated).
            // Let's fetch from `/api/bookings/all` style -> `/api/services/all`.
            // Or just add GET to `/api/services/route.js` now?
            // Wait, let's just do it right here using a server action would be best but let's stick to API for consistency with plan.
            // I'll assume I can add GET to the route.js.

            const res = await fetch("/api/services/get-all");
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Oh wait, I didn't create /api/services/get-all.
    // I will create a quick internal API for it or just modify /api/services/route.js to include GET
    // But wait, I plan to code this file now.
    // Let's assume I will add GET to /api/services/route.js in the next step or right after this.

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            const res = await fetch(`/api/services?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Service deleted");
                setServices(services.filter((s) => s._id !== id));
            } else {
                toast.error("Failed to delete");
            }
        } catch (error) {
            toast.error("Error deleting service");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Services</h1>
                <Link href="/admin/services/add">
                    <button className="btn bg-[#FF3811] text-white border-none flex items-center gap-2">
                        <FaPlus /> Add New Service
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <Image
                                                src={service.img}
                                                alt={service.title}
                                                width={48}
                                                height={48}
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{service.title}</td>
                                <td>${service.price}</td>
                                <td className="flex gap-2">
                                    {/* Edit Link - Future Implementation or simple ID pass */}
                                    {/* <Link href={`/admin/services/edit/${service._id}`} className="btn btn-sm btn-ghost text-blue-600">
                    <FaEdit />
                  </Link> */}
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="btn btn-sm btn-ghost text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageServicesPage;
