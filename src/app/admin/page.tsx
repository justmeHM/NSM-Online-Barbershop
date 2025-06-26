import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getClerkUsers } from "@/lib/clerkAdmin";
import ClerkUserList from "./ClerkUserList";
import SignupChartWrapper from "@/components/SignupchartWrapper"; // client wrapper
import {
  getTotalUsersCount,
  getNewUsersToday,
  getUserSignupsLast7Days,
} from "@/lib/userStats";

export default async function AdminDashboardPage() {
  const user = await currentUser();
  const adminIds = process.env.ADMIN_IDS?.split(",") || [];

  if (!user || !adminIds.includes(user.id)) {
    redirect("/");
  }

  const [clerkUsers, totalUsers, newUsersToday, signupsData] = await Promise.all([
    getClerkUsers(),
    getTotalUsersCount(),
    getNewUsersToday(),
    getUserSignupsLast7Days(),
  ]);

  const sanitizedUsers = clerkUsers.map((user) => ({
    id: user.id,
    email: user.emailAddresses?.[0]?.emailAddress ?? "No email",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    createdAt: user.createdAt,
  }));

  return (
    <section className="max-w-7xl mx-auto p-8 space-y-12 bg-gradient-to-br from-black via-zinc-900 to-black rounded-xl shadow-2xl border border-yellow-600">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-yellow-400 tracking-widest drop-shadow-lg">
          Admin Dashboard
        </h1>
       
<nav className="mt-6 flex space-x-8 border-b border-yellow-600 pb-3">
  <a
    href="/admin/services"
    className="relative text-yellow-400 font-semibold text-lg transition-colors hover:text-yellow-300"
  >
    Manage Services
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all hover:w-full"></span>
  </a>
  <a
    href="/admin/bookings"
    className="relative text-yellow-400 font-semibold text-lg transition-colors hover:text-yellow-300"
  >
    View All Bookings
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all hover:w-full"></span>
  </a>
  <a
    href="/admin/users"
    className="relative text-yellow-400 font-semibold text-lg transition-colors hover:text-yellow-300"
  >
    Manage Users
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all hover:w-full"></span>
  </a>
</nav>

      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          {
            title: "Total Users",
            value: totalUsers,
          },
          {
            title: "New Today",
            value: newUsersToday,
          },
          {
            title: "Admin ID",
            value: user.id,
            isId: true,
          },
        ].map(({ title, value, isId }) => (
          <div
            key={title}
            className="bg-zinc-900 border border-yellow-600 rounded-lg p-6 shadow-md flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold text-yellow-400 mb-3 tracking-wide">
              {title}
            </h2>
            <p
              className={`text-4xl font-extrabold ${
                isId ? "break-all text-sm" : ""
              } text-yellow-300 text-center`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Signup Chart */}
      <div className="bg-zinc-900 border border-yellow-600 p-6 rounded-lg shadow-lg">
        <SignupChartWrapper data={signupsData} />
      </div>

      {/* User List */}
      <section>
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 tracking-wide">
          👥 Users
        </h2>
        <ClerkUserList users={sanitizedUsers} />
      </section>
    </section>
  );
}
