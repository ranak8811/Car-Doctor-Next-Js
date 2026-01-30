
import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";

function isAdmin(session) {
    return !!session;
}

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!isAdmin(session)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    const bookings = await bookingCollection.find({}).sort({ date: -1 }).toArray();

    return NextResponse.json(bookings);
}

export async function PATCH(req) {
    const session = await getServerSession(authOptions);
    if (!isAdmin(session)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, status } = body;

    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    const query = { _id: new ObjectId(id) };

    const result = await bookingCollection.updateOne(query, {
        $set: { status: status }
    });

    return NextResponse.json({ message: "Booking updated", result }, { status: 200 });
}

export async function DELETE(req) {
    const session = await getServerSession(authOptions);
    if (!isAdmin(session)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    const query = { _id: new ObjectId(id) };

    const result = await bookingCollection.deleteOne(query);

    return NextResponse.json({ message: "Booking deleted", result }, { status: 200 });
}
