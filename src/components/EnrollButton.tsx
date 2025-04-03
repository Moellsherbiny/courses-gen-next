"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface EnrollButtonProps {
  courseId: string;
  studentId: string;
}

export default function EnrollButton({ courseId, studentId }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(`/courses/${courseId}/enroll`, { courseId, studentId });
      toast.success("!تم الانضمام بنجاح");
    } catch {
      toast.error("فشل محاولة الانضمام.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEnroll}
      disabled={loading}

    >
      {loading ? "جاري التسجيل..." : "الانضمام"}
    </Button>
  );
}
