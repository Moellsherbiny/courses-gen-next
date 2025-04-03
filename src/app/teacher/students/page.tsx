import { getUserData } from "@/lib/getUserData";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TeacherStudentsPage() {
  // الحصول على بيانات المستخدم الحالي (المعلم)
  const teacher = await getUserData();
  if (teacher.error || teacher.role !== "teacher") {
    redirect("/dashboard");
  }

  // جلب بيانات التسجيل (الانضمامات) للدورات التي أنشأها المعلم الحالي
  const enrollments = await prisma.enrollment.findMany({
    where: {
      course: { teacherId: teacher.id },
    },
    include: {
      student: true,
      course: true,
    },
  });

  // تجميع بيانات التسجيل حسب الطالب
  const grouped = enrollments.reduce((acc, enrollment) => {
    const studentId = enrollment.student.id;
    if (!acc[studentId]) {
      acc[studentId] = { student: enrollment.student, courses: [] };
    }
    acc[studentId].courses.push(enrollment.course);
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, { student: any; courses: any[] }>);

  const studentsData = Object.values(grouped);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">
        الطلاب المسجلين في دوراتك
      </h1>
      {studentsData.length === 0 ? (
        <p className="text-center">لا يوجد طلاب مسجلين في دوراتك حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studentsData.map((data) => (
            <div
              key={data.student.id}
              className="border p-4 rounded shadow bg-white"
            >
              <h2 className="text-2xl font-bold">
                {data.student.name || data.student.email}
              </h2>
              <p className="text-gray-700 mt-2">
                عدد الدورات المسجلة: {data.courses.length}
              </p>
              <Link
                href={`/teacher/students/${data.student.id}`}
                className="mt-2 inline-block text-blue-600 underline"
              >
                عرض التفاصيل
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
