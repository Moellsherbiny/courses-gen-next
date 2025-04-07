"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Edit2, FolderOpenIcon, Trash } from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";
import courseDefailtImg from "../../../assets/course-default.png";


type Course = {
  id: string;
  title: string;
  description: string;
  generatedImage: string;
  teacher: string
};

const CourseListPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  // localhost:3000/teacher/courses/[variable]
  const deleteHandler = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/courses?course=${id}`, {
      });
      if (res.status === 200) {
        toast("تم حذف الدورة بنجاح");
        setCourses(courses.filter((c) => c.id !== id));
      } else {
        toast("حدث خطأ أثناء حذف الدورة");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data } = await axiosInstance.get("/courses");
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }

    }
    fetchCourses();
  }, []);
  console.log(courses)

  return (
    <div className="container mx-auto p-6" dir="rtl">
      <div className="flex justify-between">

        <h1 className="md:text-2xl text-xl font-bold mb-6">الدورات</h1>
        <Link
          href="/teacher/courses/new"
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block"
        >
          إنشاء دورة جديدة
        </Link>
      </div>
      {courses.length === 0 && (
        <p>لا يوجد دورات.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-4">
            <Image
              src={`https://res.cloudinary.com/dzk9wr2p6/image/upload/${course.generatedImage}` || courseDefailtImg}
              className="rounded-xl border-b-4 border-r-4 border-yellow-200 mb-4"
              width={1080}
              height={1080}
              alt="Course Image"

            />

            <CardTitle>
              <h2 className="text-2xl font-bold">{course.title}</h2>
            </CardTitle>
            <CardDescription>
              <Markdown >
                {course.description.length > 50 ? course.description.slice(0, 50) + "..." : course.description}
              </Markdown>
            </CardDescription>
            <CardContent>
              <span>{course.teacher}</span>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row flex-wrap justify-between items-center">
              <Button className="ml-2 mt-2 w-full md:mt-0 md:w-auto" variant="outline">
                <FolderOpenIcon />
                <Link href={`/teacher/courses/${course.id}`}>عرض</Link>
              </Button>
              <Button variant="secondary" className="ml-2 mt-2 w-full md:w-auto md:mt-0">
                <Edit2 />
                <Link
                  href={`/teacher/courses/${course.id}/edit`}
                >
                  تعديل
                </Link>
              </Button>
              <Button
                className="w-full md:w-auto mt-2 md:mt-0 hover:bg-red-500 hover:text-white"
                variant="outline"
                onClick={async () => {
                  toast("هل أنت متأكد من حذف الدورة؟", {
                    action: {
                      label: "نعم",
                      onClick: () => {
                        deleteHandler(course.id);
                      },
                    }
                  });

                }}
              >
                <Trash />
                حذف
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;
