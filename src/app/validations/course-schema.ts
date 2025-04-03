import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  field: z.string().min(1, "Field is required"),
  level: z.string().optional(),
  targetAudience: z.string().optional(),
  duration: z.string().optional(),
  goals: z.string().optional(),
  keywords: z.string().optional(),
  lessons: z.string().optional(),
  imagePrompt: z.string().optional(),
  youtubeQuery: z.string().optional(),
  generatedImage: z.string().optional(),
  teacherId: z.string().optional(),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
