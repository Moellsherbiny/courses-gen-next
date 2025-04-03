import CourseForm from '@/components/CourseForm';
import DashboardLayout from '@/components/Dashboard';
import { getUserData } from '@/lib/getUserData';
async function NewCoursePage() {
  const user = await getUserData();
  return (
    <DashboardLayout>
      <CourseForm teacherId={user.id} />
    </DashboardLayout>
  );
}

export default NewCoursePage;

