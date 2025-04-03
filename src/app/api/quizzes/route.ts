// app/api/quizzes/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { quizSchema } from "@/app/validations/quiz-schema";
import { getUserData } from "@/lib/getUserData";

export async function POST(request: Request) {
  try {
    const user = await getUserData();
    const userId = user.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = quizSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const quiz = await prisma.quiz.create({
      data: {
        ...validation.data,
        quizDescription: validation.data.quizDescription || "",
        teacherId: userId,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json({ error: "فشل إنشاء الاختبار" }, { status: 500 });
  }
}
