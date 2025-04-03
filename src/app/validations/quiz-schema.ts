import { z } from "zod";

// Question Schema
export const questionSchema = z.object({
  id: z.string().optional(), // For existing questions
  text: z
    .string()
    .min(1, "نص السؤال مطلوب")
    .max(500, "النص يجب أن يكون أقل من 500 حرف"),
  options: z
    .array(
      z
        .string()
        .min(1, "الخيار مطلوب")
        .max(200, "الخيار يجب أن يكون أقل من 200 حرف")
    )
    .length(4, "يجب إدخال 4 خيارات"),
  correctAnswer: z
    .number()
    .min(0, "يجب أن يكون الرقم بين 0 و 3")
    .max(3, "يجب أن يكون الرقم بين 0 و 3"),
});

// Quiz Schema
export const quizSchema = z.object({
  id: z.string().optional(), // For existing quizzes
  quizTitle: z
    .string()
    .min(3, "عنوان الاختبار يجب أن يكون على الأقل 3 أحرف")
    .max(100, "عنوان الاختبار يجب أن يكون أقل من 100 حرف"),
  quizDescription: z
    .string()
    .min(10, "وصف الاختبار يجب أن يكون على الأقل 10 أحرف")
    .max(500, "وصف الاختبار يجب أن يكون أقل من 500 حرف")
    .optional(),
  courseId: z.string().min(1, "معرف الدورة مطلوب"),
  teacherId: z.string().min(1, "معرف المعلم مطلوب"), // Added for NextAuth integration
  questions: z
    .array(questionSchema)
    .min(1, "يجب إضافة سؤال واحد على الأقل")
    .max(50, "لا يمكن إضافة أكثر من 50 سؤال"),
  createdAt: z.date().optional(), // For existing quizzes
});

// Types
export type Question = z.infer<typeof questionSchema>;
export type QuizFormValues = z.infer<typeof quizSchema>;

// Default Values
export const defaultQuestion: Question = {
  text: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
};

export const defaultQuizValues: QuizFormValues = {
  quizTitle: "",
  quizDescription: "",
  courseId: "",
  teacherId: "", // Will be populated from NextAuth session
  questions: [defaultQuestion],
};
