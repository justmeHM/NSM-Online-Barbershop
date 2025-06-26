import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const isAdmin = process.env.ADMIN_IDS?.split(",").includes(userId);
  if (!isAdmin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    await prisma.booking.delete({
      where: { id: params.id },
    });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return new NextResponse("Failed to delete booking", { status: 500 });
  }
}
