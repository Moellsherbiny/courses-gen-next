import { redirect } from "next/navigation";
import { getUserData } from "@/lib/getUserData";
import prisma from "@/lib/prisma";
import EnrollButton from "@/components/EnrollButton";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/cloudinary";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

export default async function StudentCoursesPage() {
  const user = await getUserData();
  if (user.error) return <div>حدث خطأ أثناء تحميل بيانات المستخدم</div>;
  if (user.role !== "student") {
    redirect("/teacher/courses");
  }

  const courses = await prisma.course.findMany({
    include: { teacher: true },
  });

  return (

    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">الدورات المتاحة</h1>
      {courses.length === 0 ? (
        <p className="text-center">لا توجد دورات متاحة حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow bg-white dark:bg-gray-950 dark:text-white flex flex-col">
              <Image
                src={getImageUrl(course.generatedImage || "") || "/default-course.png"}
                alt="صورة الدورة"
                className="w-full h-40 object-cover rounded mb-2"
                width={100}
                height={100}
              />
              <Link href={`/student/courses/${course.id}`}>
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <Markdown>{course.description.length > 100 ? course.description.slice(0, 100) + "..." : course.description}</Markdown>
                <p className="text-sm text-gray-500 mb-2">
                  المعلم: {course.teacher?.name || "غير معروف"}
                </p>
              </Link>
              <div className="flex justify-between items-center mt-auto">
                <EnrollButton courseId={course.id} studentId={user.id} />
                <Button
                  variant="link"
                >

                  <Link
                    href={`/student/courses/${course.id}`}

                  >
                    مشاهدة الدورة
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}
