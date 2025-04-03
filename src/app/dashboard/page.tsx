import StudentDashboard from "@/components/dashboard/Student";
import TeacherDashboard from "@/components/dashboard/Teacher";
import { getUserData } from "@/lib/getUserData";
import { redirect } from "next/navigation";
const Dashboard = async () => {
  const user = await getUserData();
  if(!user || "error" in user) redirect("/")
  if (user.role === "teacher") {
    return <TeacherDashboard />
  }
  return <StudentDashboard />;
};

export default Dashboard;
