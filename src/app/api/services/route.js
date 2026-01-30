
import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";

function isAdmin(session) {
    // For simplicity, allow all logged in users or check specific email
    // In production, add a role check
    return !!session;
}

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!isAdmin(session)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);

    const result = await servicesCollection.insertOne(body);
    return NextResponse.json({ message: "Service created", result }, { status: 201 });
}

export async function PUT(req) {
    const session = await getServerSession(authOptions);
    if (!isAdmin(session)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { _id, ...updateData } = body;

    const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);
    // Handle both ObjectId and string id
    let query = {};
    try {
        query = { _id: new ObjectId(_id) };
    } catch {
        query = { _id: _id }; // Attempt to use as string if not valid objectid
    }

    const result = await servicesCollection.updateOne(query, { $set: updateData });
    return NextResponse.json({ message: "Service updated", result }, { status: 200 });
}

export async function DELETE(req) {
    const session = await getServerSession(authOptions);
    if (!isAdmin(session)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);

    let query = {};
    try {
        query = { _id: new ObjectId(id) };
    } catch {
        query = { _id: id };
    }

    const result = await servicesCollection.deleteOne(query);
    return NextResponse.json({ message: "Service deleted", result }, { status: 200 });
}
