import dbConnect, { collectionNamesObj } from "./dbConnect";
import { promises as fs } from 'fs';
import path from 'path';

export const getServices = async () => {
    const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);
    let services = await servicesCollection.find({}).toArray();

    if (services.length === 0) {
        // Seed data if empty
        const filePath = path.join(process.cwd(), 'public', 'services.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const initialServices = JSON.parse(fileContents);

        // Remove _id from json if present to allow mongo to generate new ones, or keep if you drastically want to preserve them
        // Usually better to let Mongo generate valid ObjectIds, but if references exist (e.g. facility), we might want to keep the structure.
        // For simplicity, let's insert them as is, but we need to match how they are used.
        // The current json has `_id` and `service_id`. `service_id` is likely used for lookup.

        if (initialServices.length > 0) {
            // Remove _id from initialServices to avoid duplicate key errors if _id format is customized
            // or rely on mongo, but if the JSON has string _id '63...' it might clash if treated as string vs ObjectId
            // Let's rely on cleaning them up.
            const servicesToInsert = initialServices.map(s => {
                const { _id, ...rest } = s; // remove _id to let mongo generate unique ObjectId
                return { ...rest, service_id: _id }; // backup original _id as service_id if needed, though they already have service_id?
            });
            // Actually, let's just insert what's in the json but ensure no conflict.
            // The safest is to insert the array.
            await servicesCollection.insertMany(initialServices);
            services = await servicesCollection.find({}).toArray();
        }
    }

    // Serialize _id
    return services.map(service => ({
        ...service,
        _id: service._id.toString()
    }));
};

export const getServiceById = async (id) => {
    const services = await getServices();
    // Support searching by both _id (MongoDB) and service_id (Legacy JSON id)
    return services.find(service => service._id === id || service.service_id === id);
};

export const getRelatedServices = async (currentId) => {
    const services = await getServices();
    // Filter out current service
    const otherServices = services.filter(service => service._id !== currentId && service.service_id !== currentId);

    // Shuffle and pick 3
    const shuffled = otherServices.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
};
