// app/api/courses/[courseId]/survey/route.ts
import { NextResponse } from "next/server";
import { Survey } from "@/entity/Survey";
import AppDataSource from "@/lib/typeorm";
import { SurveyResponses } from "@/interfaces/SurveyResponses";

export async function POST(
  request: Request,
  { params }: { params: { course_id: string } }
) {
  try {
    const { course_id } = params;
    const { studentId, responses } = await request.json();
    if (!studentId || !responses) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const surveyRepo = AppDataSource.getRepository(Survey);
    const survey = new Survey();
    survey.course.id = course_id;
    survey.student.id = studentId;
    survey.responses = responses as SurveyResponses;
    await surveyRepo.save(survey);

    return NextResponse.json({ survey });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
