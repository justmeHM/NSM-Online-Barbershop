// src/app/api/user-role/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  const role = user?.publicMetadata?.role ?? "user";

  return NextResponse.json({ role });
}
