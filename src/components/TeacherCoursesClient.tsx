
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

interface Course {
  id: string;
  title: string;
  description: string;
  generatedImage: string | null;
  teacher?: { name?: string | null };
}

interface TeacherCoursesClientProps {
  myCourses: Course[];
  otherCourses: Course[];
}

export default function TeacherCoursesClient({
  myCourses,
  otherCourses,
}: TeacherCoursesClientProps) {
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-6">الدورات المنشئة</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">دوراتي</h2>
        {myCourses.length === 0 ? (
          <p>لم تقم بإنشاء أي دورات بعد.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCourses.map((course) => (
              <div key={course.id} className="border p-4 rounded shadow bg-white">
                <CldImage
                  src={course.generatedImage || "/default-course.png"}
                  alt="صورة الدورة"
                  width={100}
                  height={100}
                  className="w-full h-40 object-cover rounded mb-2"
                  crop={{ type: "auto", source: true }}
                />
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
                <Button variant="link" className="text-primary">
                  <Link href={`/courses/${course.id}`}>التفاصيل</Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">دورات المعلمين الآخرين</h2>
        {otherCourses.length === 0 ? (
          <p>لا توجد دورات متوفرة من معلمين آخرين.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCourses.map((course) => (
              <div key={course.id} className="border p-4 rounded shadow bg-white">
                <Image
                  src={course.generatedImage || "/default-course.png"}
                  alt="صورة الدورة"
                  className="w-full h-40 object-cover rounded mb-2"
                  width={100}
                  height={100}
                />
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  المعلم: {course.teacher?.name || "غير معروف"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
