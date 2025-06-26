import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId || !process.env.ADMIN_IDS?.includes(userId)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { name, description, price, homePrice } = body;

  if (!name || !description || !price || !homePrice) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const service = await prisma.service.create({
    data: {
      name,
      description,
      price: parseInt(price),
      homePrice: parseInt(homePrice),
    },
  });

  return NextResponse.json(service, { status: 201 });
}
