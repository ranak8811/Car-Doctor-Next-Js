"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings/all");
            const data = await res.json();
            setBookings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await fetch("/api/bookings/all", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                toast.success(`Booking ${newStatus}`);
                fetchBookings();
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/bookings/all?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                toast.success("Booking deleted");
                setBookings(bookings.filter(b => b._id !== id));
            }
        } catch {
            toast.error("Delete failed");
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage All Bookings</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>
                                    <div className="font-bold">{booking.customerName}</div>
                                    <div className="text-sm opacity-50">{booking.email}</div>
                                </td>
                                <td>{booking.service_name}</td>
                                <td>{booking.date}</td>
                                <td>
                                    <span
                                        className={`badge ${booking.status === "confirm" ? "badge-success text-white" : "badge-warning"
                                            }`}
                                    >
                                        {booking.status || "Pending"}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {booking.status !== 'confirm' && (
                                        <button
                                            onClick={() => handleStatusUpdate(booking._id, "confirm")}
                                            className="btn btn-xs btn-success text-white"
                                        >
                                            Confirm
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="btn btn-xs btn-error text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookingsPage;
