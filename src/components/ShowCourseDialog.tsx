'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ShowCourseDialog({ lessons }: { lessons: string }) {
  let lessonsList: { title: string, videoId: string }[] = [];

  try {
    lessonsList = JSON.parse(lessons) || [];
  } catch (error) {
    console.error("Invalid JSON input:", error);
  }

  const lessonsCount = lessonsList.length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          عرض محتوى قائمة التشغيل الحالية ({lessonsCount})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>محتوى قائمة التشغيل</DialogTitle>
          <DialogDescription>
            قائمة التشغيل تحتوي على {lessonsCount} دروس
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[300px] overflow-y-auto">
          <ol dir="ltr" className="space-y-2 ml-2 list-decimal list-inside">
            {lessonsList.map((lesson) => (
              <li
                key={lesson.videoId}
                className="text-sm text-gray-500 mb-2 hover:text-gray-900 cursor-pointer"
              >
                {lesson.title}
              </li>
            ))}
          </ol>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              إغلاق
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
