import MyAllBookingsTable from "@/components/tables/MyBookingsTable";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

import Banner from "@/components/Banner";

export const metadata = {
  title: "My Bookings",
  description: "Manage your bookings",
};

import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";

const fetchMyBookings = async (session) => {
  const email = session?.user?.email;
  const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
  let query = {};
  if (email) {
    query = { email: email };
  }
  const result = await bookingCollection.find(query).toArray();
  return result;
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
