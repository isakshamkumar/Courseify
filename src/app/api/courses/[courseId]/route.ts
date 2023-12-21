//add middlewares toooo
import prisma from "../../../../../prisma/client";


import { NextRequest, NextResponse } from "next/server";
import { Course } from "@prisma/client";

export async function GET(request: NextRequest) {
    const pathname = request?.nextUrl?.pathname;


const courseId:string|undefined= pathname.split('/').pop()
if(!courseId){
  return NextResponse.json({error:true,message:'Course Id Requires'},{status:400})
}
// console.log(courseId);


  
  const course:Course| null = await prisma.course.findUnique({
    where:{
        id: courseId
    },
    include:{
        rating:true,
        instructor:true
    }
  });
  if (!course) {
    return NextResponse.json({ error: true, message: 'Course not found' }, { status: 404 });
  }

    return NextResponse.json({error:false,course},{status:200})

}
