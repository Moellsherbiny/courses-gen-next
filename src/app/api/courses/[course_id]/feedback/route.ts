// app/api/courses/[courseId]/feedback/route.ts
import { NextResponse } from "next/server";
import { Feedback } from "@/entity/Feedback";
import AppDataSource from "@/lib/typeorm";

export async function POST(
  request: Request,
  { params }: { params: { course_id: string } }
) {
  try {
    const { course_id } = params;
    const { teacherId, studentId, message } = await request.json();
    if (!teacherId || !studentId || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const feedbackRepo = AppDataSource.getRepository(Feedback);
    const feedback = new Feedback();
    feedback.course.id = course_id;
    feedback.teacher.id =teacherId;
    feedback.student.id =studentId;
    feedback.message = message;
    await feedbackRepo.save(feedback);
    
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
