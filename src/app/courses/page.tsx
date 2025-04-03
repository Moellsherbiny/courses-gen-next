// This is a server component
import Dashboard from "@/components/Dashboard";
import TeacherCourses from "@/components/TeacherCourses";
import StudentCourses from "@/components/StudentCourses";
import { getUserData } from "@/lib/getUserData";

export default async function DashboardPage() {
  const user = await getUserData();
  if (user.error) {
    return <div>Error loading user data</div>;
  }

  return (
    <Dashboard>
      {user.role === "teacher" ? (
        <TeacherCourses user={user} />
      ) : (
        <StudentCourses user={user} />
      )}
    </Dashboard>
  );
}
