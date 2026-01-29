import MyAllBookingsTable from "@/components/tables/MyBookingsTable";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

import Banner from "@/components/Banner";

export const metadata = {
  title: "My Bookings",
  description: "Manage your bookings",
};

const fetchMyBookings = async (session) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/booking?email=${session?.user?.email}`,
    {
      cache: "no-store", // Ensure dynamic fetching
    }
  );
  if (!res.ok) return [];
  const d = await res.json();
  return d;
};

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Handle unauthenticated state if needed, though middleware might handle it
    return <div className="text-center mt-20">Please log in to view your bookings.</div>;
  }

  const data = await fetchMyBookings(session);

  return (
    <div className="container mx-auto">
      <Banner title="My Bookings" path="Home/My Bookings" />
      <MyAllBookingsTable data={Array.isArray(data) ? data : []} />
    </div>
  );
}
