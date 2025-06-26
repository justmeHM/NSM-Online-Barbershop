'use server';

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createBooking(data: {
  service: string;
  type: string;
  date: string;
  time: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.booking.create({
    data: {
      userId,
      service: data.service,
      type: data.type,
      date: data.date,
      time: data.time,
    },
  });

  return { success: true };
}
