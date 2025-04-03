import { getUserData } from "@/lib/getUserData";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TeacherFeedbackPage() {
  const teacher = await getUserData();
  if (teacher.error || teacher.role !== "teacher") {
    redirect("/");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { course: { teacherId: teacher.id } },
    include: { student: true, course: true },
  });

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
    <div>
      <h1 className="text-xl font-bold mb-6">ملاحظات المعلم للطلاب</h1>
      {studentsData.length === 0 ? (
        <p>لا يوجد طلاب مسجلين في دوراتك حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentsData.map((data) => (
            <div key={data.student.id} className="border p-4 rounded shadow">
              <h2 className="text-2xl font-bold">
                {data.student.name || data.student.email}
              </h2>
              <p className="text-sm text-gray-600">
                عدد الدورات المسجلة: {data.courses.length}
              </p>
              <Link
                href={`/teacher/feedback/${data.student.id}`}
                className="mt-2 inline-block text-blue-600 underline"
              >
                إرسال ملاحظات
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
