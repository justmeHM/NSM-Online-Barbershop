// components/AdminBookingsPanel.tsx
"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

type Booking = {
  id: string;
  service: string;
  type: string;
  date: string;
  time: string;
  userId: string;
};

export default function AdminBookingsPanel() {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data: Booking[] = await res.json();
        setAllBookings(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Delete this booking?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAllBookings((prev) => prev.filter((b) => b.id !== id));
        toast.success("Booking deleted.");
      } else {
        toast.error("Unable to delete booking.");
      }
    } catch {
      toast.error("Error deleting booking.");
    }
  };

  const chartData = allBookings.reduce((acc, b) => {
    const found = acc.find((item) => item.service === b.service);
    if (found) found.count++;
    else acc.push({ service: b.service, count: 1 });
    return acc;
  }, [] as { service: string; count: number }[]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yellow-400">Bookings Overview</h2>

      {loading ? (
        <p className="text-yellow-400">Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="bg-black p-4 rounded shadow border border-yellow-800">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="service" stroke="#FFD700" />
                <YAxis stroke="#FFD700" />
                <Tooltip />
                <Bar dataKey="count" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {allBookings.length === 0 ? (
            <p className="text-center text-yellow-300 italic">
              No bookings yet.
            </p>
          ) : (
            <div className="grid gap-4">
              {allBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-black border border-yellow-500 p-4 rounded flex justify-between items-start"
                >
                  <div>
                    <div className="font-semibold text-yellow-400">
                      {b.service} ({b.type})
                    </div>
                    <div className="text-sm text-yellow-300">
                      📅 {b.date} — 🕒 {b.time}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      User ID: {b.userId}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
