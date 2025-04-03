import prisma from "@/lib/prisma";

interface TeacherCoursesProps {
  user: {
    id: string;
    role: string;
    name?: string;
    email: string;
  };
}

export default async function TeacherCourses({ user }: TeacherCoursesProps) {
  // Fetch courses created by the teacher
  const myCourses = await prisma.course.findMany({
    where: { teacherId: user.id },
  });

  // Fetch courses created by other teachers (include teacher data)
  const otherCourses = await prisma.course.findMany({
    where: { teacherId: { not: user.id } },
    include: { teacher: true },
  });

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Teacher Courses</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
        {myCourses.length === 0 ? (
          <p>You have not created any courses yet.</p>
        ) : (
          <ul className="space-y-4">
            {myCourses.map((course) => (
              <li key={course.id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Other Teachers Courses</h2>
        {otherCourses.length === 0 ? (
          <p>No courses available from other teachers.</p>
        ) : (
          <ul className="space-y-4">
            {otherCourses.map((course) => (
              <li key={course.id} className="border p-4 rounded shadow">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
                <p className="text-sm text-gray-500">
                  Teacher: {course.teacher?.name || "Unknown"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
