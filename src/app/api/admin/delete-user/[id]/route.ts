import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } =  await auth();
  const adminIds = process.env.ADMIN_IDS?.split(",") || [];

  if (!userId || !adminIds.includes(userId)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return new NextResponse("User deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Error deleting user", { status: 500 });
  }
}
