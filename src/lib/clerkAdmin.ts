import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function getClerkUsers() {
  const result = await clerk.users.getUserList();
  return result.data; // 👈 return the array
}

export async function deleteClerkUser(userId: string) {
  await clerk.users.deleteUser(userId);
}
