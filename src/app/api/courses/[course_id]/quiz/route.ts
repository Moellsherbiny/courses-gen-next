import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET({ params }: { params: { course_id: string } }) {
  try {
    const quiz = await prisma.quiz.findFirst({
      where: { courseId: params.course_id },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "لم يتم العثور على الاختبار" },
        { status: 404 }
      );
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json({ error: "فشل تحميل الاختبار" }, { status: 500 });
  }
}
