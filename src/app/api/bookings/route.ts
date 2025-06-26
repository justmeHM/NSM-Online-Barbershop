import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  // Only admins can get all bookings
  const isAdmin = process.env.ADMIN_IDS?.split(",").includes(userId);
  if (!isAdmin) return new NextResponse("Forbidden", { status: 403 });

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch bookings", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { service, type, date, time } = body;

  // Check if user already has a booking
  const existingBooking = await prisma.booking.findFirst({ where: { userId } });
  if (existingBooking) {
    return new NextResponse("User already has a booking", { status: 400 });
  }

  try {
    const booking = await prisma.booking.create({
      data: { service, type, date, time, userId },
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to create booking", { status: 500 });
  }
}
