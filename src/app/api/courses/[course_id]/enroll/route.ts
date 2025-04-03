import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { studentId, courseId } = await request.json();
    if (!studentId || !courseId) {
      return NextResponse.json(
        { error: "Missing studentId or course_id" },
        { status: 400 }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });

    return NextResponse.json({ enrollment });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
