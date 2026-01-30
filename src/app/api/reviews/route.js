
import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { serviceId, rating, comment } = body;

    if (!serviceId || !rating || !comment) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const review = {
        serviceId,
        userEmail: session.user.email,
        userName: session.user.name,
        userImage: session.user.image,
        rating: parseInt(rating),
        comment,
        date: new Date(),
    };

    const reviewsCollection = dbConnect(collectionNamesObj.reviewCollection);
    const result = await reviewsCollection.insertOne(review);

    return NextResponse.json({ message: "Review submitted", result }, { status: 201 });
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get("serviceId");

    if (!serviceId) {
        return NextResponse.json({ message: "Service ID required" }, { status: 400 });
    }

    const reviewsCollection = dbConnect(collectionNamesObj.reviewCollection);
    // Sort by date descending
    const reviews = await reviewsCollection.find({ serviceId }).sort({ date: -1 }).toArray();

    return NextResponse.json(reviews);
}
