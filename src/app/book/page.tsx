"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import BackButton from "@/components/BackButton";

export default function BookPage() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") || "";
  const [form, setForm] = useState({
    service: defaultService,
    type: "shop",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.service || !form.date || !form.time) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Booking failed");

      toast.success("Booking successful!");
    } catch (error) {
      toast.error("Error submitting booking.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-yellow-400">
      <BackButton />

      <h2 className="text-3xl font-bold mb-6 text-center">Book a Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Service:
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded bg-black border border-yellow-600 text-yellow-300"
          >
            <option value="">Select a service</option>
            <option value="haircut">Haircut</option>
            <option value="beard">Beard Trim</option>
            <option value="deluxe">Deluxe Package</option>
          </select>
        </label>

        <label className="block">
          Type:
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded bg-black border border-yellow-600 text-yellow-300"
          >
            <option value="shop">At Shop</option>
            <option value="home">Home Visit</option>
          </select>
        </label>

        <label className="block">
          Date:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded bg-black border border-yellow-600 text-yellow-300"
          />
        </label>

        <label className="block">
          Time:
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded bg-black border border-yellow-600 text-yellow-300"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}
