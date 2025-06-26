// app/admin/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getClerkUsers } from "@/lib/clerkAdmin";
import {
  getTotalUsersCount,
  getNewUsersToday,
  getUserSignupsLast7Days,
} from "@/lib/userStats";

import ClerkUserList from "../ClerkUserList";
import dynamic from "next/dynamic";

// Dynamic imports for client-only components
const SignupChart = dynamic(() => import("@/components/SignupChart"), {
  ssr: false,
});
const AdminBookingsPanel = dynamic(
  () => import("@/components/AdminBookingsPanel"),
  { ssr: false }
);

export default async function AdminDashboardPage() {
  const user = await currentUser();
  const adminIds = process.env.ADMIN_IDS?.split(",") || [];

  if (!user || !adminIds.includes(user.id)) {
    redirect("/");
  }

  const [clerkUsers, totalUsers, newUsersToday, signupsData] =
    await Promise.all([
      getClerkUsers(),
      getTotalUsersCount(),
      getNewUsersToday(),
      getUserSignupsLast7Days(),
    ]);

  const sanitizedUsers = clerkUsers.map((u) => ({
    id: u.id,
    email: u.emailAddresses?.[0]?.emailAddress ?? "No email",
    firstName: u.firstName ?? "",
    lastName: u.lastName ?? "",
    createdAt: u.createdAt,
  }));

  return (
    <section className="p-8 max-w-7xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold text-yellow-400">
          Admin Dashboard
        </h1>
        <p className="text-yellow-300 mt-2">Welcome, Admin 👑</p>
        <nav className="mt-4 space-x-6">
          <a
            href="/admin/services"
            className="text-yellow-300 hover:underline"
          >
            Manage Services
          </a>
          <a
            href="/admin/bookings"
            className="text-yellow-300 hover:underline"
          >
            View Bookings
          </a>
        </nav>
      </header>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 bg-black rounded shadow text-center border border-yellow-600">
          <h2 className="text-lg font-semibold text-yellow-300">
            Total Users
          </h2>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {totalUsers}
          </p>
        </div>
        <div className="p-4 bg-black rounded shadow text-center border border-yellow-600">
          <h2 className="text-lg font-semibold text-yellow-300">
            New Today
          </h2>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {newUsersToday}
          </p>
        </div>
        <div className="p-4 bg-black rounded shadow text-center border border-yellow-600">
          <h2 className="text-lg font-semibold text-yellow-300">
            Admin ID
          </h2>
          <p className="text-sm text-gray-400 mt-2 break-all">
            {user.id}
          </p>
        </div>
      </div>

      {/* User Signup Chart */}
      <SignupChart data={signupsData} />

      {/* Bookings Management Panel */}
      <AdminBookingsPanel />

      {/* Clerk User List */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">
          Users
        </h2>
        <ClerkUserList users={sanitizedUsers} />
      </div>
    </section>
  );
}
