import { promises as fs } from 'fs';
import path from 'path';

export const getServices = async () => {
    const filePath = path.join(process.cwd(), 'public', 'services.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
};

export const getServiceById = async (id) => {
    const services = await getServices();
    return services.find(service => service._id === id || service.service_id === id);
};
