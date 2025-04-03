"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";

export default function StudentSurveyPage() {
  const router = useRouter();
  const [preference, setPreference] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const studentId = "معرف_الطالب_هنا"; // استبدلها ببيانات الجلسة
      const payload = {
        studentId,
        surveyResponse: { preference },
      };
      await axiosInstance.post("/survey/submit", payload);
      toast.success("تم حفظ تفضيلاتك بنجاح!");
      router.push("/dashboard/student");
    } catch (error) {
      console.error("خطأ أثناء إرسال الاستطلاع:", error);
      toast.error("حدث خطأ أثناء إرسال الاستطلاع.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">الاستطلاع</h1>
      <p className="mb-4 text-center">
        اختر نوع المحتوى الذي تفضله. يمكنك الاختيار بين عرض الصورة مع الدروس أو عرض فيديوهات يوتيوب للدورة.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="preference" className="block mb-1 font-bold">
            اختر تفضيلك:
          </label>
          <select
            id="preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">اختر نوع المحتوى</option>
            <option value="image_lessons">صور مع الدروس</option>
            <option value="youtube">فيديوهات يوتيوب</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "جارٍ الإرسال..." : "إرسال الاستطلاع"}
        </button>
      </form>
    </div>
  );
}
