import { NextResponse } from "next/server";
import CourseGeneration from "@/services/courseService";
import { generateImage } from "@/services/imageGen";
import { searchYoutubePlaylist } from "@/services/youtube";
import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Parse request body
    const {
      teacherId,
      title,
      description,
      field,
      targetAudience,
      level,
      duration,
      goals,
      keywords,
    } = await request.json();

    console.log("✅ Received data:", { teacherId, title, description, field, targetAudience, level, duration, goals, keywords });

    // Validate required fields
    if (!teacherId || !title || !description || !field) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if teacher exists and has role 'teacher'
    const teacherExists = await prisma.user.findFirst({
      where: { id: teacherId, role: "teacher" },
    });
    if (!teacherExists) {
      console.error("❌ Teacher not found:", teacherId);
      return NextResponse.json({ error: "Invalid teacher ID" }, { status: 400 });
    }

    // Generate course content using CourseGeneration service
    const courseFields = {
      title,
      description,
      field,
      targetAudience: targetAudience || null,
      level: level || null,
      duration: duration || null,
      goals: goals || null,
      keywords: keywords || null,
    };
    const generationResult = await CourseGeneration(courseFields);
    console.log("📜 Course generation response:", generationResult);
    if (!generationResult || "error" in generationResult) {
      console.error("❌ Course generation failed");
      return NextResponse.json({ error: "Course generation failed" }, { status: 500 });
    }
    const { outline, lessons } = generationResult;
    if (!outline || !lessons) {
      throw new Error("Failed to generate course content");
    }

    // Generate image if imagePrompt exists
    let cldImg: string | null = null;
    if (outline.imagePrompt) {
      const imageResponse = await generateImage(outline.imagePrompt);
      console.log("🖼️ Generated image response:", imageResponse);
      if (imageResponse?.href) {
        cldImg = await uploadImage(imageResponse.href);
        console.log("📤 Uploaded image URL:", cldImg);
      } else {
        console.error("❌ Image generation failed");
      }
    }

    // Fetch YouTube videos if youtubeQuery exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let videosData: any[] = [];
    if (outline.youtubeQuery) {
      console.log("Searching YouTube videos for:", outline.youtubeQuery);
      videosData = await searchYoutubePlaylist(outline.youtubeQuery);
      console.log("📺 YouTube videos fetched:", videosData);
    }

    // Sanitize JSON fields to ensure they are plain objects/arrays.
    const sanitizedLessons = lessons ? JSON.parse(JSON.stringify(lessons)) : null;
    const sanitizedVideos = (Array.isArray(videosData) && videosData.length > 0)
      ? JSON.parse(JSON.stringify(videosData))
      : null;

    // Prepare dynamic fields ensuring JSON compatibility
    const dynamicFields = {
      lessons: sanitizedLessons,
      imagePrompt: outline.imagePrompt || null,
      youtubeQuery: outline.youtubeQuery || null,
      generatedImage: cldImg || null,
      videos: sanitizedVideos,
    };

    // Prepare course data with teacher connection
    const courseData = {
      title,
      description,
      field,
      teacher: { connect: { id: teacherId } },
      keywords,
      ...dynamicFields,
    };

    console.log("🛠️ Preparing to save course:", courseData);
    const newCourse = await prisma.course.create({ data: courseData });
    console.log("✅ Course saved:", newCourse);

    return NextResponse.json(
      {
        id: newCourse.id,
        title: newCourse.title,
        imagePrompt: newCourse.imagePrompt,
        generatedImage: newCourse.generatedImage,
        createdAt: newCourse.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Course creation error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message: `Course creation failed: ${message}` }, { status: 500 });
  }
}
