import CourseForm from '@/components/CourseForm';
import { getUserData } from '@/lib/getUserData';
async function NewCoursePage() {
  const user = await getUserData();
  return (

    <CourseForm teacherId={user.id ?? ""} />

  );
}
export default NewCoursePage;

