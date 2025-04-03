'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { quizSchema, type QuizFormValues } from '@/app/validations/quiz-schema'
import { Loader2, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useFieldArray } from 'react-hook-form'
import { QuizService } from '@/services/quizService'


export default function QuizForm({
  params,
  // courseId,
  initialData
}: {
  params: { courseId: string }
  // courseId: string
  initialData?: QuizFormValues
}) {
  const router = useRouter()
  // const { data: session } = useSession()
  const { courseId } = params
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || {
      quizTitle: '',
      quizDescription: '',
      courseId,
      teacherId: '',
      questions: [
        {
          text: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions'
  })

  const onSubmit = async (values: QuizFormValues) => {
    try {
      const data = {
        ...values,
        teacherId: ''
      }

      let response
      if (initialData?.id) {
        response = await QuizService.updateQuiz(initialData.id, data)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        response = await QuizService.createQuiz(data)
      }

      toast.success(initialData ? 'تم تحديث الاختبار بنجاح' : 'تم إنشاء الاختبار بنجاح')
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ الاختبار')
      console.error('Quiz submission error:', error)
    }
  }

  // Add question with default values
  const addQuestion = () => {
    append({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    })
  }

  return (
    <div className="container py-8" dir="rtl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Quiz Title */}
          <FormField
            control={form.control}
            name="quizTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان الاختبار</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل عنوان الاختبار" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quiz Description */}
          <FormField
            control={form.control}
            name="quizDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وصف الاختبار</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="أدخل وصف الاختبار"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Questions Section */}
          <div className="space-y-4">
            <h3 className="font-medium">الأسئلة</h3>

            {fields.map((question, questionIndex) => (
              <div key={question.id} className="border p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">السؤال {questionIndex + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(questionIndex)}
                    disabled={fields.length <= 1}
                  >
                    <Trash className="h-4 w-4 ml-2" />
                    حذف السؤال
                  </Button>
                </div>

                {/* Question Text */}
                <FormField
                  control={form.control}
                  name={`questions.${questionIndex}.text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نص السؤال</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل نص السؤال" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Question Options */}
                <div className="space-y-2">
                  <FormLabel>خيارات الإجابة</FormLabel>
                  {[0, 1, 2, 3].map((optionIndex) => (
                    <FormField
                      key={optionIndex}
                      control={form.control}
                      name={`questions.${questionIndex}.options.${optionIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input
                                placeholder={`الخيار ${optionIndex + 1}`}
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant={
                                form.watch(`questions.${questionIndex}.correctAnswer`) === optionIndex
                                  ? 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() =>
                                form.setValue(
                                  `questions.${questionIndex}.correctAnswer`,
                                  optionIndex
                                )
                              }
                            >
                              الإجابة الصحيحة
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addQuestion}
              disabled={fields.length >= 50}
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة سؤال جديد
            </Button>
          </div>

          {/* Form Actions */}
          <div className="flex justify-start gap-4 pt-4 border-t">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="min-w-24"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                'حفظ الاختبار'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/teacher/courses/${courseId}`)}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}