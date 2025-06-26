import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId || !process.env.ADMIN_IDS?.includes(userId)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await prisma.service.delete({ where: { id: params.id } });
    return new NextResponse("Deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Delete Failed", { status: 500 });
  }
}
