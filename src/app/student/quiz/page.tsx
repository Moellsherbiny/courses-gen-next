import { redirect } from "next/navigation";
import { getUserData } from "@/lib/getUserData";
import prisma from "@/lib/prisma";

export default async function StudentQuizPage() {
  const user = await getUserData();
  if (user.error) return <div>حدث خطأ أثناء تحميل بيانات المستخدم</div>;
  if (user.role !== "student") {
    redirect("/teacher/courses");
  }

  // هنا نفترض أن هناك حقلاً "quiz" في نموذج الدورة (أو جدول منفصل للاختبارات)
  const quizzes = await prisma.course.findMany({
    where: { quiz: { not: null } },
    include: { teacher: true },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">الاختبارات المتاحة</h1>
      {quizzes.length === 0 ? (
        <p className="text-center">لا توجد اختبارات متاحة حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow bg-white flex flex-col">
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-2">{course.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                المعلم: {course.teacher?.name || "غير معروف"}
              </p>
              <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                ابدأ الاختبار
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
