import {axiosInstance} from '@/lib/axiosInstance'
import { QuizFormValues } from '@/app/validations/quiz-schema'

export const QuizService = {
  async getQuizByCourse(courseId: string) {
    const response = await axiosInstance.get(`/courses/${courseId}/quiz`)
    return response.data
  },

  async createQuiz(quizData: QuizFormValues) {
    const response = await axiosInstance.post('/quizzes', quizData)
    return response.data
  },

  async updateQuiz(quizId: string, quizData: QuizFormValues) {
    const response = await axiosInstance.put(`/quizzes/${quizId}`, quizData)
    return response.data
  },

  async deleteQuiz(quizId: string) {
    const response = await axiosInstance.delete(`/quizzes/${quizId}`)
    return response.data
  }
}