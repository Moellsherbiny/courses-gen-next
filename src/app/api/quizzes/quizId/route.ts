
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { quizSchema } from '@/app/validations/quiz-schema'
import { getUserData } from '@/lib/getUserData';

export async function PUT(
  request: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const user = await getUserData();
    const  userId = user.id;
    if (!userId) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const body = await request.json()
    const validation = quizSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 })
    }

    const quiz = await prisma.quiz.update({
      where: {
        id: params.quizId,
        teacherId: userId
      },
      data: validation.data
    })

    return NextResponse.json(quiz)
  } catch (error) {
    console.error('Error updating quiz:', error)
    return NextResponse.json(
      { error: 'فشل تحديث الاختبار' },
      { status: 500 }
    )
  }
}