// pages/api/admin/bookings.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma"; // or wherever you export your prisma instance

export async function GET() {
  const { userId, sessionClaims } = await auth();

  const adminEmails = ["harrison.mwewa@cs.unza.zm"]; // adjust this as needed

  const userEmail = sessionClaims?.email as string | undefined;

  if (!userId || !adminEmails.includes(userEmail || "")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { date: "desc" },
  });

  return NextResponse.json(bookings);
}
