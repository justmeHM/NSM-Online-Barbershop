// src/lib/userStats.ts
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function getTotalUsersCount() {
  const users = await clerkClient.users.getUserList();
  return users.length;
}

interface User {
    createdAt: string | number | Date;
    // Add other user properties if needed
}

export async function getNewUsersToday() {
  const users = await clerkClient.users.getUserList();
  const today = new Date().toISOString().slice(0, 10);
return users.filter((user: User) =>
    new Date(user.createdAt).toISOString().startsWith(today)
).length;
}

export async function getUserSignupsLast7Days() {
  const users = await clerkClient.users.getUserList();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 6);

  const counts: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    counts[d.toISOString().slice(0, 10)] = 0;
  }

interface SignupCount {
    date: string;
    count: number;
}

(users as User[]).forEach((user: User) => {
    const created: string = new Date(user.createdAt).toISOString().slice(0, 10);
    if (counts[created] !== undefined) {
        counts[created]++;
    }
});

  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}
