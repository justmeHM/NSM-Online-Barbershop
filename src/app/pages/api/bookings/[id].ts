// pages/api/bookings/[id].ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId, sessionClaims } = await auth();
  const userEmail = (sessionClaims?.email as string) || "";

  const adminEmails = ["harrison.mwewa@cs.unza.zm"];
  if (!userId || !adminEmails.includes(userEmail)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    await prisma.booking.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
