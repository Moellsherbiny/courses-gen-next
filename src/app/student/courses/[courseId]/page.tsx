import { redirect } from "next/navigation";
import { getUserData } from "@/lib/getUserData";
import prisma from "@/lib/prisma";
import EnrollButton from "@/components/EnrollButton";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/cloudinary";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Clock, BarChart, CheckCircle } from "lucide-react";
import Markdown from "react-markdown";
export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const user = await getUserData();
  if (user.error) {
    return <div className="text-center py-8">حدث خطأ أثناء تحميل بيانات المستخدم</div>;
  }
  if (user.role !== "student") {
    redirect("/dashboard/teacher/courses");
  }

  const course = await prisma.course.findUnique({
    where: { id: (await params).courseId },
    include: {
      teacher: true,
      enrollments: {
        where: { studentId: user.id }
      }
    },
  });

  if (!course) {
    return <div className="text-center py-8">الدورة غير موجودة</div>;
  }

  const isEnrolled = course.enrollments.length > 0;

  // Helper functions
  const safeSplit = (str?: string | null, delimiter: string = ',') =>
    str ? str.split(delimiter).filter(Boolean) : [];

  const safeGoals = (goals?: string | null) =>
    goals ? goals.split('\n').filter(Boolean) : [];

  return (
    <div className="container py-8" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Course Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="relative h-64 w-full">
              <Image
                src={getImageUrl(course.generatedImage || "") || "/test.jpg"}
                alt="صورة الدورة"
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{course.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {course.field} • {course.level || 'غير محدد'}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {isEnrolled ? 'مسجل' : 'غير مسجل'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">الوصف</h3>
                  <div className="text-muted-foreground">
                    <Markdown>
                      {course.description || 'لا يوجد وصف متاح'}
                    </Markdown>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      المدة
                    </h3>
                    <p className="text-muted-foreground">
                      {course.duration || 'غير محدد'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">الفئة المستهدفة</h3>
                    <p className="text-muted-foreground">
                      {course.targetAudience || 'غير محدد'}
                    </p>
                  </div>
                </div>

                {course.goals && (
                  <div>
                    <h3 className="font-medium">الأهداف التعليمية</h3>
                    <ul className="space-y-2 mt-2">
                      {safeGoals(course.goals).map((goal, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-1 text-green-500" />
                          <span className="text-muted-foreground">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.keywords && (
                  <div>
                    <h3 className="font-medium">الكلمات المفتاحية</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {safeSplit(course.keywords).map((keyword, i) => (
                        <Badge key={i} variant="outline">
                          {keyword.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Teacher Card */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات المعلم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={course.teacher?.image || undefined} />
                  <AvatarFallback>
                    {course.teacher?.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{course.teacher?.name || "غير معروف"}</h4>
                  <p className="text-sm text-muted-foreground">
                    {course.teacher?.email || "لا يوجد بريد إلكتروني"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrollment Card */}
          <Card>
            <CardHeader>
              <CardTitle>التسجيل في الدورة</CardTitle>
            </CardHeader>
            <CardContent>
              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    <span>أنت مسجل في هذه الدورة</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/student/my-courses/${course.id}`}>
                      الذهاب إلى الدورة
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>عدد الدروس: {0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    <span>المستوى: {course.level || 'غير محدد'}</span>
                  </div>
                  <EnrollButton
                    courseId={course.id}
                    studentId={user.id}

                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Course Stats */}
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات الدورة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">عدد الطلاب:</span>
                <span className="font-medium">{0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ الإنشاء:</span>
                <span className="font-medium">
                  {new Date(course.createdAt).toLocaleDateString('ar-EG')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">آخر تحديث:</span>
                <span className="font-medium">
                  {new Date(course.updatedAt).toLocaleDateString('ar-EG')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}