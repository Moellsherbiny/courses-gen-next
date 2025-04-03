type Params = Promise<{ userId: string }>;
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function GET(request: Request, data: { params: Params }) {
  try {
    const prisma = new PrismaClient();

    const params = await data.params;
    const email = params.userId;
    if (!email)
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { email: email } });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, data: { params: Params }) {
  try {
    const params = await data.params;
    const userId = params.userId;
    if (!userId)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: body,
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, data: { params: Params }) {
  try {
    const params = await data.params;
    const userId = params.userId;
    if (!userId)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, data: { params: Params }) {
  try {
    const params = await data.params;
    const userId = params.userId;
    if (!userId)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: body,
    });

    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
