import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNamesObj = {
    servicesCollection: "services",
    userCollection: "users",
    bookingCollection: "bookings",
    reviewCollection: "reviews"
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URI
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

let client
let clientPromise

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default function dbConnect(collectionName) {

    if (!global._mongoClient) {
        client = new MongoClient(uri, options)
        global._mongoClient = client
    }
    return global._mongoClient.db(process.env.DB_NAME).collection(collectionName)
}
