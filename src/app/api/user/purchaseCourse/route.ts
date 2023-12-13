import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../prisma/client'

export async function POST(request:NextRequest) {
    const {userId,courseId}=await request.json()
    
    const user=await prisma.user.findUnique({
        where:{
            id:userId
        }
    })
    const existingCourse= await prisma.course.findUnique({
        where:{
            id:courseId,
            userId:userId
        }
    })
    if(existingCourse){
        return NextResponse.json({msg:'Course Already Purchased!'})
    }
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          purchasedCourses: {
            connect: { id: courseId },
          },
        },
      });
      return NextResponse.json({msg:'Course Purchased Successfully'})
    
}