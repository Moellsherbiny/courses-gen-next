import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { course_id: string } }
) {
  try {
    const { course_id } = await params;
    const { studentId } = await request.json();
    if (!studentId) {
      return NextResponse.json({ error: "Missing studentId" }, { status: 400 });
    }
    
  
    
    const enrollment = await prisma.enrollment.create(
    {data:{
      studentId,
      courseId:course_id
    }})
      
    return NextResponse.json({ enrollment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
