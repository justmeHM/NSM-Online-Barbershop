import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId, getAllUsers } from "@/actions/user.action";

export async function GET() {
  const authUser = await currentUser();
  if (!authUser) return new NextResponse("Unauthorized", { status: 401 });

  const admin = await getUserByClerkId(authUser.id);
  if (admin?.role !== "admin") return new NextResponse("Forbidden", { status: 403 });

  const users = await getAllUsers();
  return NextResponse.json(users);
}
