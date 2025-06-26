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

export default function AdminBookingsPage({ bookings = [] }: { bookings?: Booking[] }) {
  // default to empty array if undefined or null
  const [allBookings, setAllBookings] = useState<Booking[]>(bookings);

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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Bookings</h2>

      {allBookings.length === 0 ? (
        <p className="text-center text-gold-light italic">No bookings available.</p>
      ) : (
        <div className="grid gap-4">
          {allBookings.map((b) => (
            <div
              key={b.id}
              className="bg-black dark:bg-zinc-900 border border-gold-light p-4 rounded-lg shadow-sm flex justify-between items-start"
            >
              <div>
                <div className="font-semibold text-gold-light">
                  {b.service} ({b.type})
                </div>
                <div className="text-sm text-gray-400">
                  📅 {b.date} — 🕒 {b.time}
                </div>
                <div className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  User ID: {b.userId}
                </div>
              </div>
              <button
                onClick={() => handleDelete(b.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete booking"
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
