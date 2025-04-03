import AppDataSource from "@/lib/typeorm";
import { Survey } from "@/entity/Survey";
import { SurveyResponses } from "@/interfaces/SurveyResponses";

/**
 * Submits a survey for a given course and student.
 * @param courseId - The ID of the course.
 * @param studentId - The ID of the student.
 * @param responses - The survey responses following the SurveyResponses interface.
 */
export async function submitSurvey(
  courseId: string,
  studentId: string,
  responses: SurveyResponses
): Promise<Survey> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  
  const surveyRepo = AppDataSource.getRepository(Survey);
  const survey = new Survey();
  survey.course.id = courseId ;
  survey.student.id =  studentId;
  survey.responses = responses;
  await surveyRepo.save(survey);
  return survey;
}
