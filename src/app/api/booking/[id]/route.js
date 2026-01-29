
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    const p = await params;
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    const query = { _id: new ObjectId(p.id) };
    const result = await bookingCollection.deleteOne(query);
    return NextResponse.json(result);
}

export const PATCH = async (req, { params }) => {
    const p = await params;
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    const query = { _id: new ObjectId(p.id) };
    const body = await req.json();
    const updateDoc = {
        $set: {
            status: body.status
        }
    };
    const result = await bookingCollection.updateOne(query, updateDoc);
    return NextResponse.json(result);
}
