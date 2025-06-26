"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function SignupChart({ data }: { data: { date: string; count: number }[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">📈 User Signups (7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
