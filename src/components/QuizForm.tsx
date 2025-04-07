"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface QuizFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onQuizGenerated: (data: any) => void;
}

export default function QuizForm({ onQuizGenerated }: QuizFormProps) {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const generateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("جارٍ إنشاء الاختبار...");

    try {
      const response = await axiosInstance.post("/ai/generate-quiz", {
        title: topic,
        description,
        numQuestions
      });

      onQuizGenerated(response.data);
      toast.success("تم إنشاء الاختبار بنجاح!", { id: toastId });
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error("فشل إنشاء الاختبار. يرجى المحاولة مرة أخرى.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={generateQuiz} className="space-y-4">
      <div>
        <Label htmlFor="topic">عنوان الدورة</Label>
        <Input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="أدخل عنوان الدورة"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">وصف الدورة</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="أدخل وصف الدورة"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="questions">عدد الأسئلة</Label>
        <Input
          id="questions"
          type="number"
          min="1"
          max="20"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            جارٍ الإنشاء...
          </>
        ) : (
          "إنشاء اختبار بالذكاء الاصطناعي"
        )}
      </Button>
    </form>
  );
}