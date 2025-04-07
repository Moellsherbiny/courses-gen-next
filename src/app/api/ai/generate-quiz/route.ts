import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const prompt = `
        You are an AI that generates detailed quizzes for educational courses.
        The quiz should be in Arabic and should include the following sections:
        1. Course Title: ${title}
        2. Course Description: ${description}
        The quiz should be short and easy to answer.
        It should include the following types of questions:
        - Multiple Choice Questions (MCQs)
        - Following this formate:
        {
        {
          "question": "Question text",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": 1
        },
        // Add more questions as needed
        }
      `;
    const result = await chatSession.sendMessage(prompt);
    const response = JSON.parse(result.response.text());
    const text = response;

    return NextResponse.json({
      result: text || "Could not generate quiz",
    });
  } catch (error) {
    console.error("Error generating image prompt:", error);
    return NextResponse.json(
      { error: "فشل إنشاء وصف الصورة" },
      { status: 500 }
    );
  }
}
