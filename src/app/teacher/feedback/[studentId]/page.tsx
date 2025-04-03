import { getUserData } from "@/lib/getUserData";
import prisma from "@/lib/prisma";
import FeedbackForm from "@/components/FeedbackForm";
import { redirect } from "next/navigation";

export default async function SendFeedbackPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const teacher = await getUserData();
  if (teacher.error || teacher.role !== "teacher") {
    redirect("/");
  }
  const student = await prisma.user.findUnique({
    where: { id: (await params).studentId },
  });
  if (!student) {
    return <div>الطالب غير موجود</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">إرسال ملاحظات للطالب</h1>
      <div className="mb-4 text-center">
        <p>إلى: {student.name || student.email}</p>
      </div>
      <FeedbackForm teacherId={teacher.id} studentId={student.id} />
    </div>
  );
}
