"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function BookPage() {
  const { isSignedIn, user } = useUser();
  const [form, setForm] = useState({
    service: "",
    type: "shop",
    date: "",
    time: "",
  });
  const [hasBooking, setHasBooking] = useState(false);

  // On mount, check if user already has a booking
  useEffect(() => {
    async function fetchUserBookings() {
      if (!user) return;
      try {
        const res = await fetch("/api/bookings/user");
        if (!res.ok) throw new Error("Failed to get your bookings");
        const data = await res.json();
        setHasBooking(data.length > 0);
      } catch (error) {
        toast.error("Could not check booking status.");
      }
    }
    fetchUserBookings();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("Please sign in to make a booking.");
      return;
    }

    if (hasBooking) {
      toast.error("You already have an active booking.");
      return;
    }

    if (!form.service || !form.date || !form.time) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 400) {
        toast.error("You already have a booking.");
        setHasBooking(true);
        return;
      }

      if (!res.ok) throw new Error("Booking failed");

      toast.success("Booking successful!");
      setHasBooking(true);
    } catch {
      toast.error("Failed to submit booking.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-yellow-400">
      <h2 className="text-3xl font-bold mb-6 text-center">Book a Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Service:
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 rounded bg-black border border-yellow-600 text-yellow-300"
            disabled={hasBooking}
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
            disabled={hasBooking}
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
            disabled={hasBooking}
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
            disabled={hasBooking}
          />
        </label>

        <button
          type="submit"
          disabled={!isSignedIn || hasBooking}
          className={`w-full font-bold py-2 rounded transition ${
            isSignedIn && !hasBooking
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-yellow-400 text-black opacity-50 cursor-not-allowed"
          }`}
        >
          {hasBooking ? "You already booked" : isSignedIn ? "Submit Booking" : "Sign in to Book"}
        </button>
      </form>
    </div>
  );
}
