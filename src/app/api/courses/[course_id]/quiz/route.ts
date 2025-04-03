import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
type Params = Promise<{
  course_id: string;
}>;
export async function GET(request: Request, data: { params: Params }) {
  try {
    const params = await data.params;
    const course_id =  params.course_id;
    const quiz = await prisma.quiz.findFirst({
      where: { courseId: course_id },
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
