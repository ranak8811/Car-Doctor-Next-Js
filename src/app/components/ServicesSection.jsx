import React from "react";
import ServiceCard from "@/components/ServiceCard";
// import services from "../../../public/services.json"; 
// Note: Direct import from public might fail depending on config. 
// Using fs to read ensures it works in server component.
import { promises as fs } from 'fs';
import path from 'path';

export default async function ServicesSection() {
  const filePath = path.join(process.cwd(), 'public', 'services.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const services = JSON.parse(fileContents);

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto place-items-center">
        {services.map((service) => (
          <ServiceCard key={service.service_id} service={service} />
        ))}
      </div>
    </div>
  );
}
