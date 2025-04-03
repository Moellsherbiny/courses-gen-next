import StudentDashboard from "@/components/dashboard/Student";
import TeacherDashboard from "@/components/dashboard/Teacher";
import { getUserData } from "@/lib/getUserData";
const Dashboard = async () => {
  const user = await getUserData();
  if (user.role === "teacher") {
    return <TeacherDashboard />
  }
  return <StudentDashboard />;
};

export default Dashboard;
