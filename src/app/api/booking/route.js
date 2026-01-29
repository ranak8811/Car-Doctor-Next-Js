
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json();
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    const result = await bookingCollection.insertOne(body);
    return NextResponse.json(result);
}

export const GET = async (req) => {
    const email = req.nextUrl.searchParams.get("email");
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    let query = {};
    if (email) {
        query = { email: email };
    }
    const result = await bookingCollection.find(query).toArray();
    return NextResponse.json(result);
}
