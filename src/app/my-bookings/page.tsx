"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Booking = {
  id: string;
  service: string;
  type: string;
  date: string;
  time: string;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/my");
        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Something went wrong while loading your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-yellow-400">
      <h2 className="text-3xl font-bold mb-8 text-center drop-shadow-lg">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-yellow-200/70">
          You haven’t made any bookings yet.
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="border border-yellow-700 p-4 rounded-lg shadow-md bg-black text-yellow-300"
            >
              <div className="font-semibold text-xl">{b.service}</div>
              <div className="text-sm mt-1">
                {b.type === "home" ? "🏠 Home Visit" : "🏢 At Shop"} <br />
                📅 {b.date} at 🕒 {b.time}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
