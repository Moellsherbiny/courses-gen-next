import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany();
    return NextResponse.json(courses);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching courses" },
      { status: 500 }
    );
  }
}
