import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
}
