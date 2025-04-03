// app/api/courses/[courseId]/analysis/route.ts
import { NextResponse } from "next/server";
import { StudentAnalysis } from "@/entity/StudentAnalysis";
import AppDataSource from "@/lib/typeorm";

export async function GET(
  request: Request,
  { params }: { params: { course_id: string } }
) {
  try {
    const { course_id } = params;
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const analysisRepo = AppDataSource.getRepository(StudentAnalysis);
    let analyses;
    if (studentId) {
      analyses = await analysisRepo.find({
        where: {
          course: { id: course_id},
          student: { id: studentId},
        },
      });
    } else {
      analyses = await analysisRepo.find({
        where: { course: { id: course_id} },
      });
    }
    
    return NextResponse.json({ analyses });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
