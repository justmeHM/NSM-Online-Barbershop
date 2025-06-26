"use client";  // <-- Add this at the very top to mark as Client Component

import React, { useState } from "react";
import toast from "react-hot-toast";
import BackButton from "@/components/BackButton";
export default function BookPage() {
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
  });

  // Example handleChange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.service) {
      toast.error("Please select a service.");
      return;
    }

    // Your form submission logic here...

    toast.success("Booking submitted!");
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Your Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="service" className="block mb-1 font-semibold">Service</label>
          <select
            name="service"
            id="service"
            value={form.service}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a service</option>
            <option value="haircut">Haircut</option>
            <option value="shave">Shave</option>
            <option value="trim">Trim</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-semibold">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="time" className="block mb-1 font-semibold">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
        >
          Submit Booking
        </button>
      </form>
      
      <div className= 'text-center justify-center mt-6'>
        <BackButton />
      </div>
       
    </div>
    

  );
}
