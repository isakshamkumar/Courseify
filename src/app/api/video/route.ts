//add middlewares toooo
import  prisma from '../../../../prisma/client'

import { headers } from 'next/headers'

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //is route ka kaam h ek particular vcourse ki saari videos dena
  const headersList = headers();
  const courseId = headersList.get('courseId').toString();
let userId='6573562edb4374c30a75ee00'
  
  
    const courseVideos = await prisma.video.findMany({
    where: {
      courseId: courseId,
    },
    include:{
      course:true,
      userProgress:{
        where:{
          userId:userId
        }
      }
    }
  });
  const completedVideos = courseVideos.filter(video => video.userProgress[0]?.completed).length;
  const totalVideos = courseVideos.length;
  const courseProgress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

  return NextResponse.json({ courseVideos, courseProgress });
  
  
  
 
  //  now every video returned by this result has a key and we gonna then map these with our videosidemenu list items, then onlick of any of them we make a req to the video/[videokey] route which returns the signed url then we render that
}



