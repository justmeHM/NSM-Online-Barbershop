import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch bookings", { status: 500 });
  }
}
