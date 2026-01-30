"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";

const ServiceReviews = ({ serviceId }) => {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?serviceId=${serviceId}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [serviceId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session) {
            toast.error("Please login to leave a review");
            return;
        }

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    serviceId,
                    rating,
                    comment,
                }),
            });

            if (res.ok) {
                toast.success("Review submitted successfully!");
                setComment("");
                setRating(5);
                fetchReviews(); // Refresh list
            } else {
                toast.error("Failed to submit review");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < count ? "text-orange-500" : "text-gray-300"} />
        ));
    };

    return (
        <div className="mt-12 bg-[#F3F3F3] p-8 rounded-lg">
            <h3 className="text-3xl font-bold mb-6">Reviews ({reviews.length})</h3>

            <div className="space-y-6 mb-12">
                {loading ? (
                    <p>Loading reviews...</p>
                ) : reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                {review.userImage ? (
                                    <Image
                                        src={review.userImage}
                                        alt={review.userName}
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                                        {review.userName?.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold">{review.userName}</h4>
                                    <p className="text-sm text-gray-500">
                                        {new Date(review.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex mb-2 text-sm">{renderStars(review.rating)}</div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                )}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
                <h4 className="text-2xl font-bold mb-2">Leave a Review</h4>
                <p className="mb-6 text-gray-500">
                    {session ? "Share your experience with this service." : "Please login to leave a review."}
                </p>

                {session ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Rating</span>
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`text-2xl ${star <= rating ? "text-orange-500" : "text-gray-300"}`}
                                    >
                                        <FaStar />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Your Review</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24"
                                placeholder="Tell us about your experience..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn bg-[#FF3811] text-white border-none hover:bg-orange-700">
                            Submit Review
                        </button>
                    </form>
                ) : (
                    <div className="alert alert-warning">
                        You need to be logged in to post a review.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceReviews;
