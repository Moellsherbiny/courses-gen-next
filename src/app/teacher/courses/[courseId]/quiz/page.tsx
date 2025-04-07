"use client";

import { useState } from "react";
import QuizForm from "@/components/QuizForm";
import QuizResult from "@/components/QuizResult";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export type QuizResult = {
  course_title: string;
  course_description: string;
  quiz: QuizQuestion[];
};

export default function QuizGeneratorPage() {
  const [result, setResult] = useState<{ result: QuizResult } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleQuizGenerated = (quizData: { result: QuizResult }) => {
    setResult(quizData);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6 text-center">منشئ الاختبارات بالذكاء الاصطناعي</h1>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <QuizForm onQuizGenerated={handleQuizGenerated} />

        {result && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4 w-full">
                عرض الاختبار المولد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
              <DialogTitle className="sr-only">تفاصيل الاختبار المولد</DialogTitle>
              <QuizResult result={result.result} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}