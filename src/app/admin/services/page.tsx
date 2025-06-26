import AdminServicesClient from "./_client";
import { getAllServices } from "@/lib/admin/services";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>
      <AdminServicesClient initialServices={services} />
    </div>
  );
}
