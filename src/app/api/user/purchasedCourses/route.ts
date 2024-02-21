import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { headers } from "next/headers";
import { Course } from "@prisma/client";
export async function GET(request: NextRequest) {
  
  const headersList = headers();
  const userId:string= headersList.get("userId")?.toString() || ''  ;
  if(!userId){
    return NextResponse.json({error:true,message:"User Id Required"},{status:400})
  }
  // const userId = request.headers.get('userId');
  // if (!userId) {
  //   return NextResponse.json({error: true, message: 'User Id Required'}, {status: 400});
  // }

  // console.log(userId);

  // Check if the user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return NextResponse.json({ error: 'User not found' });
      }

      // Fetch the user's purchased courses
      const purchasedCourses = await prisma.user.findUnique({
        where: { id: userId },
        select: { purchases: {
          include:{
            course:true
          }
        } },
      });
    console.log(purchasedCourses,'purchasedCOurse from backend');

  return NextResponse.json({ purchasedCourses });
}
