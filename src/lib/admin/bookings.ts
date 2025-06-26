import { prisma } from "@/lib/prisma";

export async function getAllBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { date: "desc" },
    });

    return bookings;
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    return null;
  }
}
