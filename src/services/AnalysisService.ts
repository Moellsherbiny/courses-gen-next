// src/services/analysisService.ts
import AppDataSource from "@/lib/typeorm";
import { StudentAnalysis } from "@/entity/StudentAnalysis";

/**
 * Retrieves student analysis records for a given course.
 * @param courseId - The course ID.
 * @param studentId - (Optional) Specific student ID to filter by.
 */
export async function getStudentAnalysis(
  courseId: string,
  studentId?: string
): Promise<StudentAnalysis[]> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  
  const analysisRepo = AppDataSource.getRepository(StudentAnalysis);
  let analyses;
  if (studentId) {
    analyses = await analysisRepo.find({
      where: {
        course: { id: courseId },
        student: { id: studentId },
      },
    });
  } else {
    analyses = await analysisRepo.find({
      where: { course: { id: courseId } },
    });
  }
  return analyses;
}
