import AppDataSource from "@/lib/typeorm";
import { Feedback } from "@/entity/Feedback";

/**
 * Sends feedback from a teacher to a student for a course.
 * @param courseId - The course ID.
 * @param teacherId - The ID of the teacher sending the feedback.
 * @param studentId - The ID of the student receiving feedback.
 * @param message - The feedback message.
 */
export async function sendFeedback(
  courseId: string,
  teacherId: string,
  studentId: string,
  message: string
): Promise<Feedback> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  
  const feedbackRepo = AppDataSource.getRepository(Feedback);
  const feedback = new Feedback();
  feedback.course.id = courseId;
  feedback.teacher .id= teacherId ;
  feedback.student .id= studentId ;
  feedback.message = message;
  await feedbackRepo.save(feedback);
  return feedback;
}
