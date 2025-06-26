"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

type Booking = {
  id: string;
  service: string;
  type: string;
  date: string;
  time: string;
  userId: string;
};

export default function AdminBookingsPage({ bookings }: { bookings: Booking[] }) {
  const [allBookings, setAllBookings] = useState(bookings);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this booking?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAllBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Failed to delete booking.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-gold mb-6">Manage Bookings</h2>

      {allBookings.length === 0 ? (
        <p className="text-center text-gold-light italic">No bookings available.</p>
      ) : (
        <div className="grid gap-4">
          {allBookings.map((b) => (
            <div
              key={b.id}
              className="bg-[#121212] border border-gold rounded-lg p-5 shadow-gold-glow flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="mb-3 sm:mb-0">
                <div className="font-semibold text-gold text-lg">
                  {b.service} <span className="text-gold-light text-sm">({b.type})</span>
                </div>
                <div className="text-gold-light text-sm mt-1">
                  📅 {b.date} — 🕒 {b.time}
                </div>
                <div className="text-gray-400 text-xs mt-1 truncate max-w-xs">
                  User ID: {b.userId}
                </div>
              </div>

              <button
                onClick={() => handleDelete(b.id)}
                className="self-stretch sm:self-auto bg-red-700 hover:bg-red-600 text-white rounded-md p-2 transition focus:outline-none focus:ring-2 focus:ring-red-500"
                title="Delete booking"
                aria-label={`Delete booking for ${b.service} on ${b.date}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
