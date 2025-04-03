'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { axiosInstance } from '@/lib/axiosInstance'
import { toast } from 'sonner'
import { Loader2, Wand2, ImageIcon, Youtube, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { courseSchema, type CourseFormValues } from '@/app/validations/course-schema'
import Image from 'next/image'
import { ShowCourseDialog } from '@/components/ShowCourseDialog'


export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState({
    image: false,
    prompt: false,
    youtubeQuery: false,
    goals: false,
    description: false
  })

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      field: '',
      level: '',
      targetAudience: '',
      duration: '',
      goals: '',
      keywords: '',
      imagePrompt: '',
      youtubeQuery: '',
      generatedImage: '',
      lessons: ''
    },
  })

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { courseId } = await params
        if (!courseId) {
          toast.error('لم يتم العثور على معرف الدورة')
          return
        }

        const { data } = await axiosInstance.get<CourseFormValues>(`/courses/${courseId}`)
        console.log(data)
        const safeData: CourseFormValues = {
          title: data.title ?? '',
          description: data.description ?? '',
          field: data.field ?? '',
          level: data.level ?? '',
          targetAudience: data.targetAudience ?? '',
          duration: data.duration ?? '',
          goals: data.goals ?? '',
          keywords: data.keywords ?? '',
          imagePrompt: data.imagePrompt ?? '',
          youtubeQuery: data.youtubeQuery ?? '',
          generatedImage: data.generatedImage ?? '',
          lessons: data.lessons ?? '',
        }

        form.reset(safeData)
      } catch (error) {
        console.error(error)
        toast.error('فشل تحميل الدورة', {
          description: 'الرجاء المحاولة مرة أخرى لاحقًا',
        })
      }
    }

    fetchCourse()
  }, [form, params])

  // AI Generation Handlers
  const generateContent = async (type: 'description' | 'goals' | 'prompt' | 'youtube') => {
    try {
      setIsGenerating(prev => ({ ...prev, [type]: true }))

      const endpointMap = {
        description: '/ai/generate-description',
        goals: '/ai/generate-goals',
        prompt: '/ai/generate-prompt',
        youtube: '/ai/generate-youtube-query'
      }

      const fieldMap: Record<'description' | 'goals' | 'prompt' | 'youtube', 'description' | 'goals' | 'imagePrompt' | 'youtubeQuery'> = {
        description: 'description',
        goals: 'goals',
        prompt: 'imagePrompt',
        youtube: 'youtubeQuery'
      }

      const { data } = await axiosInstance.post(endpointMap[type], {
        title: form.getValues('title'),
        field: form.getValues('field'),
        ...(type === 'youtube' ? { keywords: form.getValues('keywords') } : {})
      })

      form.setValue(fieldMap[type], data.result)
      toast.success(`تم إنشاء ${getArabicLabel(type)} بنجاح`)
    } catch (error) {
      console.error(error)
      toast.error(`فشل إنشاء ${getArabicLabel(type)}`)
    } finally {
      setIsGenerating(prev => ({ ...prev, [type]: false }))
    }
  }

  const generateImage = async () => {
    try {
      setIsGenerating(prev => ({ ...prev, image: true }))
      const { data } = await axiosInstance.post('/ai/generate-image', {
        prompt: form.getValues('imagePrompt')
      })
      form.setValue('generatedImage', data.imageUrl)
      toast.success('تم إنشاء الصورة بنجاح')
    } catch (error) {
      console.error(error)
      toast.error('فشل إنشاء الصورة')
    } finally {
      setIsGenerating(prev => ({ ...prev, image: false }))
    }
  }

  const getArabicLabel = (type: string) => {
    const labels: Record<string, string> = {
      description: 'الوصف',
      goals: 'الأهداف التعليمية',
      prompt: 'وصف الصورة',
      youtube: 'استعلام يوتيوب'
    }
    return labels[type] || type
  }

  const onSubmit = async (values: CourseFormValues) => {
    try {
      const { courseId } = await params
      if (!courseId) {
        toast.error('لم يتم العثور على معرف الدورة')
        return
      }

      await axiosInstance.put(`/courses/${courseId}`, values)
      toast.success('تم تحديث الدورة بنجاح')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('فشل تحديث الدورة', {
        description: 'الرجاء التحقق من المدخلات والمحاولة مرة أخرى',
      })
    }
  }
  const generatedImage = form.watch('generatedImage')
  async function getYoutubePlaylist(value: string) {
    if (value) {
      console.log(value);
      const { data } = await axiosInstance.post('/ai/get-youtube-playlist', { query: value })
      form.setValue('youtubeQuery', value)
      form.setValue('lessons', JSON.stringify(data.playlist))
      console.log(data);
      toast.success('تم العثور على قائمة التشغيل بنجاح')
    }
  }

  return (
    <div className="container py-8" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            تعديل الدورة التدريبية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان الدورة</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل عنوان الدورة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="field"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المجال</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل مجال الدورة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <div className="flex justify-between items-center">
                        <FormLabel>الوصف</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-primary"
                          onClick={() => generateContent('description')}
                          disabled={isGenerating.description}
                        >
                          {isGenerating.description ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Wand2 className="ml-2 h-4 w-4" />
                              توليد وصف تلقائي
                            </>
                          )}
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="أدخل وصف الدورة"
                          className="min-h-[120px]"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>الأهداف التعليمية</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-primary"
                          onClick={() => generateContent('goals')}
                          disabled={isGenerating.goals}
                        >
                          {isGenerating.goals ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Wand2 className="ml-2 h-4 w-4" />
                              توليد أهداف تلقائية
                            </>
                          )}
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="ما الذي سيتعلمه الطلاب؟"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Other fields (level, targetAudience, duration) remain the same */}

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الكلمات المفتاحية</FormLabel>
                      <FormControl>
                        <Input placeholder="كلمات مفتاحية مفصولة بفواصل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imagePrompt"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <div className="flex justify-between items-center">
                        <FormLabel>وصف الصورة</FormLabel>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-primary"
                            onClick={() => generateContent('prompt')}
                            disabled={isGenerating.prompt}
                          >
                            {isGenerating.prompt ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Wand2 className="ml-2 h-4 w-4" />
                                توليد وصف تلقائي
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-primary"
                            onClick={generateImage}
                            disabled={!form.watch('imagePrompt') || isGenerating.image}
                          >
                            {isGenerating.image ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <ImageIcon className="ml-2 h-4 w-4" />
                                توليد صورة
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="أدخل وصفًا لإنشاء صورة الدورة"
                          value={field.value ?? ''}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      {generatedImage ? (
                        <div className="mt-2 relative aspect-video max-w-[500px]">
                          <Image
                            src={`https://res.cloudinary.com/dzk9wr2p6/image/upload/${generatedImage}`}
                            alt="Generated course"
                            fill
                            className="rounded-md border object-cover"
                          />
                        </div>
                      ) : (
                        <div className="mt-2 flex items-center justify-center bg-muted rounded-md aspect-video max-w-[500px]">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeQuery"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>استعلام يوتيوب</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className='text-primary'
                          onClick={() => getYoutubePlaylist(field.value || '')}
                        >
                          <Sparkles className="ml-2 h-4 w-4" />
                          إيجاد قائمة تشغيل
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-primary"
                          onClick={() => generateContent('youtube')}
                          disabled={isGenerating.youtubeQuery}
                        >
                          {isGenerating.youtubeQuery ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Youtube className="ml-2 h-4 w-4" />
                              توليد استعلام تلقائي
                            </>
                          )}
                        </Button>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="أدخل مصطلحات للبحث عن فيديوهات ذات صلة"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                  )}
                />
              </div>
              <div>
                {form.watch('lessons') && <ShowCourseDialog lessons={form.watch('lessons') || ''} />}
              </div>
              <div className="flex justify-start gap-4 pt-4 border-t">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    'حفظ التغييرات'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/teacher/courses')}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}