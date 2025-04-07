import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

interface QuizResultProps {
  result: QuizResult;
}

export default function QuizResult({ result }: QuizResultProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify({ result }, null, 2));
    setCopied(true);
    toast.success("تم نسخ الاختبار بصيغة JSON");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{result.course_title}</h2>
        <Button size="sm" onClick={copyToClipboard}>
          {copied ? (
            <Check className="ml-2 h-4 w-4" />
          ) : (
            <Copy className="ml-2 h-4 w-4" />
          )}
          {copied ? "تم النسخ!" : "نسخ JSON"}
        </Button>
      </div>

      <p className="text-gray-600 dark:text-gray-300">{result.course_description}</p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">أسئلة الاختبار</h3>
        <div className="space-y-6">
          {result.quiz.map((q, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{index + 1}. {q.question}</h4>
              <ul className="space-y-2">
                {q.options.map((option, optIndex) => (
                  <li
                    key={optIndex}
                    className={`pr-4 ${optIndex === q.correctAnswer ? "text-green-600 dark:text-green-400 font-medium" : ""}`}
                  >
                    {String.fromCharCode(1632 + optIndex)}. {option}
                    {optIndex === q.correctAnswer && (
                      <span className="mr-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        الإجابة الصحيحة
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 className="font-medium mb-2">مخرجات JSON</h3>
        <pre className="text-xs bg-white dark:bg-gray-800 p-3 rounded overflow-x-auto">
          {JSON.stringify({ result }, null, 2)}
        </pre>
      </div>
    </div>
  );
}