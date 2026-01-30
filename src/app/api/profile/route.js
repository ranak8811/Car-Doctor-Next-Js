
import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PUT(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, image } = body;

    const userCollection = dbConnect(collectionNamesObj.userCollection);
    const filter = { email: session.user.email };
    const updateDoc = {
        $set: {
            name: name,
            image: image,
        },
    };

    const result = await userCollection.updateOne(filter, updateDoc);

    if (result.modifiedCount === 0) {
        // This might happen if the data is the same, but we still consider it a success or a no-op
        // preventing error if nothing changed
    }

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
}
