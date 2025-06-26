"use client";

import { Wand2, Home, CalendarCheck } from "lucide-react";

export default function Highlights() {
  const highlights = [
    {
      icon: <Wand2 className="w-6 h-6 text-gold-500" />,
      title: "Premium Quality",
      description: "Elite haircuts and grooming by experienced professionals.",
    },
    {
      icon: <Home className="w-6 h-6 text-gold-500" />,
      title: "Home Services",
      description: "Get groomed at the comfort of your home or office.",
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-gold-500" />,
      title: "Easy Booking",
      description: "Simple, fast online booking system available 24/7.",
    },
  ];

  return (
    <section className="w-full px-6 py-12 bg-black text-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gold-500">
        Why Choose NSM Elite Looks?
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 border border-zinc-700 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-1 text-gold-500">
              {item.title}
            </h3>
            <p className="text-sm text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
