// app/admin/dashboard/page.tsx
import SignupChart from "@/components/SignupChart";
import { getTotalUsersCount, getNewUsersToday, getUserSignupsLast7Days } from "@/lib/userStats";

export default async function AdminDashboardPage() {
  const [totalUsers, newUsersToday, signupsData] = await Promise.all([
    getTotalUsersCount(),
    getNewUsersToday(),
    getUserSignupsLast7Days(),
  ]);

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">Activity Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-4xl">{totalUsers}</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">New Users Today</h2>
          <p className="text-4xl">{newUsersToday}</p>
        </div>
      </div>

      <SignupChart data={signupsData} />
    </main>
  );
}
