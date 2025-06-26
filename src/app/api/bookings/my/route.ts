import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return new NextResponse("Failed to fetch bookings", { status: 500 });
  }
}
