import AppDataSource from "@/lib/typeorm";
import { Enrollment } from "@/entity/Enrollment";

/**
 * Enrolls a student in a course.
 * @param courseId - The ID of the course.
 * @param studentId - The ID of the student.
 */
export async function enrollStudent(
  courseId: string,
  studentId: string
): Promise<Enrollment> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  
  const enrollmentRepo = AppDataSource.getRepository(Enrollment);
  const enrollment = new Enrollment();
  enrollment.course.id = courseId;
  enrollment.student.id = studentId;
  await enrollmentRepo.save(enrollment);
  return enrollment;
}
