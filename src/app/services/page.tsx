"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "haircut",
    name: "Haircut",
    description: "Professional haircut with clean finishing touches.",
    price: 80,
    homePrice: 120,
  },
  {
    id: "beard",
    name: "Beard Trim",
    description: "Precise beard shaping and styling service.",
    price: 50,
    homePrice: 90,
  },
  {
    id: "deluxe",
    name: "Deluxe Package",
    description: "Haircut + Beard Trim + Styling at premium quality.",
    price: 150,
    homePrice: 200,
  },
];

export default function ServicesPage() {
  const router = useRouter();

  const handleBookNow = (serviceId: string) => {
    router.push(`/book?service=${serviceId}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-black text-yellow-400 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center mb-10 drop-shadow-lg">
        Our Services
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-yellow-900/20 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-yellow-400/70 transition-shadow duration-300"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>
              <p className="text-yellow-200 mb-4">{service.description}</p>
              <div className="text-yellow-300 space-y-1 mb-6 text-sm">
                <p>
                  <span className="font-semibold">At Shop:</span> ZMW {service.price}
                </p>
                <p>
                  <span className="font-semibold">Home Visit:</span> ZMW {service.homePrice}
                </p>
              </div>
            </div>

            <Button
              className="w-full text-black bg-yellow-400 hover:bg-yellow-500 font-semibold shadow-md"
              size="sm"
              onClick={() => handleBookNow(service.id)}
            >
              Book Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
