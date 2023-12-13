//add middlewares toooo
import prisma from "../../../../../prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const pathname = request?.nextUrl?.pathname;
// console.log(pathname);
const courseId= pathname.split('/').pop()
// console.log(courseId);


  
  const course = await prisma.course.findUnique({
    where:{
        id: courseId
    },
    include:{
        rating:true,
        instructor:true
    }
  });

    return NextResponse.json({course})

}
