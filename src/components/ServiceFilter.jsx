"use client";

import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

const ServiceFilter = ({ services }) => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");
    const [filteredServices, setFilteredServices] = useState(services);

    useEffect(() => {
        let result = [...services];

        // Filter by search
        if (search) {
            result = result.filter((service) =>
                service.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sort
        if (sort === "price-asc") {
            result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sort === "price-desc") {
            result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sort === "a-z") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === "z-a") {
            result.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredServices(result);
    }, [search, sort, services]);

    return (
        <div className="container mx-auto">
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 p-4 bg-base-200 rounded-xl">
                <div className="form-control w-full max-w-md">
                    <label className="label">
                        <span className="label-text font-bold">Search Services</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Search by title (e.g. Engine)..."
                        className="input input-bordered w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-bold">Sort By</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="a-z">Alphabetical: A-Z</option>
                        <option value="z-a">Alphabetical: Z-A</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                    {filteredServices.map((service) => (
                        <ServiceCard key={service._id || service.service_id} service={service} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <h3 className="text-2xl font-bold text-gray-400">No services found.</h3>
                </div>
            )}
        </div>
    );
};

export default ServiceFilter;
