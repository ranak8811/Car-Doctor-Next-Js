"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
    const userCollection = dbConnect(collectionNamesObj.userCollection)

    // Validation
    const { email, password } = payload;
    if (!email || !password) return null;

    const user = await userCollection.findOne({ email: payload.email })

    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10)
        // Ensure image is included in the payload if present, otherwise it might be undefined or empty string
        const newUser = {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            image: payload.image || "", // Save image URL
            role: "user" // Default role
        }
        const result = await userCollection.insertOne(newUser);
        return { ...result, insertedId: result.insertedId.toString() };
    }
    return null;


}