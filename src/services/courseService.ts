import { textGenerate } from "./text-to-text";

interface CourseFields {
  title: string;
  field: string;
  description: string;
  targetAudience: string;
  level: string;
  duration: string;
  goals: string;
  keywords: string;
}

/**
 * Generates structured lessons based on a given course outline.
 * @param courseOutline The structured outline of the course.
 * @returns A JSON object containing detailed lessons or an error message.
 */
async function generateLessons(courseOutline: string) {
  if (!courseOutline) return { error: "No course outline found" };

  const prompt = `
  Generate a **comprehensive Arabic educational course** based on the provided course outline: ${courseOutline}.
  
  **Lesson Requirements**:
  Each lesson should be structured as a **complete educational unit**, including:

  1. **Lesson Title (Arabic)**: Clear and engaging.
  2. **Lesson Description (Arabic)**: Brief overview of the lesson’s significance.
  3. **Lesson Content (Arabic)**:
     - **Introduction**: Background, relevance, and objectives.
     - **Core Concepts**: Theories, definitions, and key ideas.
     - **Real-World Applications**: Practical examples.
     - **Step-by-Step Guide**: Clear instructional breakdown.
     - **Case Studies**: At least one in-depth real-world example.
     - **Code Examples / Practical Exercises** (if applicable).
     - **Common Mistakes & Solutions**: Troubleshooting common errors.
     - **Self-Assessment Questions**: At least 5 questions.
     - **Additional Resources**: Books, articles, and online materials.

  **Output Format (JSON)**:
  {
    "lessons": [
      {
        "lessonTitle": "عنوان الدرس",
        "lessonDescription": "وصف الدرس",
        "lessonContent": "محتوى الدرس شاملاً المقدمة والمفاهيم والتطبيقات العملية"
      },
      ...
    ]
  }

  Generate a minimum of **10 well-structured lessons**.
  `;

  const lessons = await textGenerate(prompt);
  return lessons || { error: "Failed to generate lessons" };
}

/**
 * Main function to generate a structured educational course.
 * @param courseFields The course metadata provided by the user.
 * @returns An object containing the course outline, YouTube query, image prompt, and lessons.
 */
export default async function CourseGeneration(courseFields: CourseFields) {
  if (!courseFields) return { error: "No input provided" };

  const {
    title,
    field,
    description,
    targetAudience,
    level,
    duration,
    keywords,
    goals,
  } = courseFields;

  // Step 1: Generate course outline and metadata
  const coursePrompt = `
  Generate a structured Arabic educational course titled **"${title}"** in the field of **"${field}"**.

  **📌 Course Details**:
  - **Description**: "${description}"
  - **Target Audience**: "${targetAudience}"
  - **Level**: "${level}"
  - **Duration**: "${duration}"
  - **Goals**: "${goals}"
  - **Keywords**: "${keywords}"

  **Requirements**:
  - Create a **detailed Arabic course description**.
  - Provide an **integrated curriculum plan** with clear objectives.
  - Generate a **high-quality image prompt** to visually represent the course.
  - Suggest a **YouTube search query** for finding related educational videos.
  - Develop a **structured course outline** (to be used for generating lessons).

  **Return JSON format**:
  {
    "imagePrompt": "image prompt for course representation (English)",
    "youtubeQuery": "relevant YouTube search query",
    "courseOutline": "structured outline of lessons"
  }
  `;

  const outline = await textGenerate(coursePrompt);
  if (!outline) return { error: "Failed to generate course metadata" };

  // Step 2: Generate lessons based on the course outline
  const lessonsContent = await generateLessons(outline.courseOutline);

  return {
    outline,
    lessons: lessonsContent,
  };
}
