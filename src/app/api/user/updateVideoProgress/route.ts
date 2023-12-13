import { NextRequest, NextResponse } from "next/server";

import prisma from '../../../../../prisma/client'

export async function POST(req:NextRequest) {
    const {videoId,userId,courseId}=await req.json()
    const video= await prisma.video.findUnique({
        where:{
            id:videoId,
        }
    })
    if(!video){
        return NextResponse.json({msg:"No video Found"})
    }
    //???????????????????????????????????????????
    const updatedVideoProgress = await prisma.userVideoProgress.upsert({
        where: {
          userId_videoId: {
            userId: userId,
            videoId: videoId
          }
        },
        update: {
          completed: true
        },
        create: {
          userId: userId,
          videoId: videoId,
          completed: true,
          
        }
      });
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
      
      return NextResponse.json({courseVideos:courseVideos})
}

