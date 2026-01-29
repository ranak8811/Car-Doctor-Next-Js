import React from "react";

export const metadata = {
    title: "Blogs - Car Doctor",
    description: "Latest news and updates from Car Doctor.",
};

const blogs = [
    {
        id: 1,
        title: "How to maintain your car engine?",
        date: "Dec 01, 2023",
        author: "Admin",
        content: "Regular maintenance is key to keeping your car running smoothly...",
    },
    {
        id: 2,
        title: "Top 5 tips for long drive",
        date: "Dec 05, 2023",
        author: "John Doe",
        content: "Planning a long trip? Here are the top 5 tips you should know...",
    },
    {
        id: 3,
        title: "Best engine oil for your car",
        date: "Dec 10, 2023",
        author: "Jane Doe",
        content: "Choosing the right engine oil can be confusing. Here is a guide...",
    },
];

export default function BlogsPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-orange-500">Blogs</h3>
                <h2 className="text-5xl font-bold">Latest News</h2>
                <p className="py-4 text-gray-500 max-w-2xl mx-auto">
                    Stay updated with the latest trends and tips in car maintenance and repair.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog.id} className="card bg-base-100 shadow-xl border">
                        <div className="card-body">
                            <h2 className="card-title hover:text-orange-500 cursor-pointer">{blog.title}</h2>
                            <div className="text-sm text-gray-400 mb-2">
                                <span>{blog.date}</span> | <span>{blog.author}</span>
                            </div>
                            <p>{blog.content}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary btn-outline btn-sm">Read More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
