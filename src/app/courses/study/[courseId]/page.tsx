import { getUserData } from "@/lib/getUserData";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import LMSCourseStudy from "@/components/LMSCourseStudy";

export default async function CourseStudyPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const user = await getUserData();

  // Handle unauthorized access
  if (!user || "error" in user) {
    return (
      <div className="text-red-600 text-center p-6">
        ❌ حدث خطأ أثناء تحميل بيانات المستخدم.
      </div>
    );
  }
  if (user.role !== "student") {
    redirect("/teacher/courses");
  }

  // Fetch Course Data (including lessons and videos)
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include:{videos:true}
  });
C
  if (!course) {
    return (
      <div className="text-center text-red-600 p-6">
        ❌ هذه الدورة غير موجودة.
      </div>
    );
  }

  // Parse lessons if needed
  let parsedLessons = course.lessons;
  if (typeof parsedLessons === "string") {
    try {
      parsedLessons = JSON.parse(parsedLessons);
    } catch (e) {
      console.error("Error parsing lessons:", e);
      parsedLessons = null;
    }
  }

  const hasVideos = Array.isArray(course.videos) && course.videos.length > 0;
  const hasLessons = parsedLessons && Array.isArray(parsedLessons) && parsedLessons.length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Course Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center space-x-4">
          <Image
            src={course.generatedImage ?? "/default-course.png"}
            alt="صورة الدورة"
            width={150}
            height={150}
            className="object-cover rounded"
          />
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
          </div>
        </div>
      </header>

      {/* LMS Layout */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex space-x-6">
        {/* Sidebar Navigation */}
        <aside className="w-1/4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">المحتوى</h2>
            <ul className="space-y-2">
              {hasLessons ? (
                parsedLessons.map((lesson: any, idx: number) => (
                  <li key={idx} className="cursor-pointer hover:text-blue-500">
                    {lesson.lessonTitle || `الدرس ${idx + 1}`}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">لا يوجد محتوى للقراءة</li>
              )}
              {hasVideos && (
                <li className="mt-4">
                  <h3 className="font-bold">فيديوهات</h3>
                  <ul className="mt-2 space-y-1">
                    {course.videos.map((video: any, idx: number) => (
                      <li key={idx} className="cursor-pointer hover:text-blue-500">
                        {video.title || `الفيديو ${idx + 1}`}
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="w-3/4 bg-white p-6 rounded shadow">
          <LMSCourseStudy
            lessons={parsedLessons}
            videos={course.videos}
            hasLessons={hasLessons}
            hasVideos={hasVideos}
          />
        </section>
      </main>
    </div>
  );
}
