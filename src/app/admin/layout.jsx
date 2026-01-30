"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const links = [
        { href: "/admin/services", label: "Manage Services" },
        { href: "/admin/bookings", label: "Manage Bookings" },
        // { href: "/admin/users", label: "Manage Users" }, // Future
    ];

    return (
        <div className="flex min-h-screen bg-base-200">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#FF3811]">Admin Panel</h2>
                </div>
                <ul className="menu p-4 space-y-2">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={pathname.startsWith(link.href) ? "active bg-[#FF3811] text-white" : ""}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/">Back to Home</Link>
                    </li>
                </ul>
            </aside>

            {/* Mobile Nav (Simple) */}
            <div className="md:hidden fixed bottom-0 w-full bg-white z-50 border-t flex justify-around p-4 shadow-lg">
                {links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm font-bold text-[#444]">
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
