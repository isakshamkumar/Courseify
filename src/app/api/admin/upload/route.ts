//add middlewares toooo
//add zod too
import s3Client from '@/app/packages/s3/client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import  prisma from '../../../../../prisma/client'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request:NextRequest){
  // console.log(('called'));

  
  const newCourse = await prisma.course.create({
    data: {
      title: "Python for Beginners",
      thumbnail: "Mock Thumbnail URL",
      description: "A comprehensive guide to Python programming for beginners.",
      price: 110.0,
      duration: "15 hours",
      category:["Python"],
      instructor: {
        connect: {
          id: "65735d66ec0dc428ba41f01b", // Mock instructor ID
        },
      },
      reviews: 0,
      published: true,
      whatYouWillLearn:["Python basics", "Data structures in Python", "Building Python projects"],
      videoSection: {
        create: [
          {
            title: "Introduction to Python",
            videoUrl: "uploads/user-uploads/mixkit-programming-codes-on-a-screen-close-up-41658-medium.mp4",
          },
          {
            title: "Understanding Python",
            videoUrl: "uploads/user-uploads/mixkit-hands-of-a-programmer-typing-on-a-keyboard-41646-medium.mp4",
          },
          {
            title: "Python Basics",
            videoUrl: "uploads/user-uploads/mixkit-code-on-green-letters-on-screen-49122-medium.mp4",
          },
          {
            title: "Data structures using python",
            videoUrl: "uploads/user-uploads/mixkit-experienced-programmer-working-on-a-powerful-computer-41656-medium.mp4",
          },
          {
            title: "Advanced Python",
            videoUrl: "uploads/user-uploads/laptop_-_1625 (720p) (2).mp4",
          },
          {
            title: "Outro",
            videoUrl: "uploads/user-uploads/mixkit-professional-programmer-working-on-a-big-computer-41642-medium.mp4",
          },
        ],
      },
      rating: {
        connect: {
          id: "6574a7e5e8d23c7584fef9f4", // Mock rating ID
        },
      },
    },
  });
  
    return NextResponse.json({msg:'Course Created Successfully',newCourse})

   
}

