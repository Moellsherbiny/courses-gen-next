import prisma from "@/lib/prisma";
import EnrollButton from "@/components/EnrollButton";

interface StudentCoursesProps {
  user: {
    id: string;
    role: string;
    name?: string;
    email: string;
  };
}

export default async function StudentCourses({ user }: StudentCoursesProps) {
  // Fetch all available courses (with teacher info)
  const courses = await prisma.course.findMany({
    include: { teacher: true },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-sm text-gray-500">
                Teacher: {course.teacher?.name || "Unknown"}
              </p>
              {/* EnrollButton is a client component */}
              <EnrollButton courseId={course.id} studentId={user.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
