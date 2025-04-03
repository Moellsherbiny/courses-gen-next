"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";

interface CreateQuizFormProps {
  teacherId: string;
}

export default function CreateQuizForm({ teacherId }: CreateQuizFormProps) {
  const router = useRouter();
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState(""); // يمكن إدخال الأسئلة بصيغة JSON أو نصية
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { teacherId, quizTitle, quizDescription, questions };
      // نفترض وجود نقطة نهاية API على /quiz/create لمعالجة إنشاء الاختبار
      await axiosInstance.post("/quiz/create", payload);
      toast.success("تم إنشاء الاختبار بنجاح!");
      router.push("/teacher/courses");
    } catch (error) {
      console.error("خطأ أثناء إنشاء الاختبار:", error);
      toast.error("حدث خطأ أثناء إنشاء الاختبار، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 mx-auto space-y-4">
      <div>
        <label htmlFor="quizTitle" className="block mb-1 font-bold">
          عنوان الاختبار
        </label>
        <input
          id="quizTitle"
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="أدخل عنوان الاختبار"
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="quizDescription" className="block mb-1 font-bold">
          وصف الاختبار
        </label>
        <textarea
          id="quizDescription"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          placeholder="أدخل وصف الاختبار"
          required
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>
      <div>
        <label htmlFor="questions" className="block mb-1 font-bold">
          الأسئلة (مثال: JSON أو نص مفصل)
        </label>
        <textarea
          id="questions"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          placeholder="أدخل الأسئلة بصيغة JSON أو نصية"
          required
          className="w-full border p-2 rounded"
          rows={5}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "جارٍ إنشاء الاختبار..." : "إنشاء الاختبار"}
      </button>
    </form>
  );
}
