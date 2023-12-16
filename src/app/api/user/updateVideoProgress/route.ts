import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../prisma/client';
import { Video, UserVideoProgress, Course } from "@prisma/client";

interface VideoWithProgress extends Video {
  userProgress: UserVideoProgress[];
  course: Course;
}

interface RequestBody {
  videoId: string;
  userId: string;
  courseId: string;
}

export async function POST(req: NextRequest) {
  try {
    const { videoId, userId, courseId }: RequestBody = await req.json();

    const video: Video | null = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      return NextResponse.json({ msg: "No video Found" },{status:404});
    }

    const updatedVideoProgress: UserVideoProgress = await prisma.userVideoProgress.upsert({
      where: {
        userId_videoId: {
          userId: userId,
          videoId: videoId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: userId,
        videoId: videoId,
        completed: true,
      },
    });

    const courseVideos: VideoWithProgress[] = await prisma.video.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        course: true,
        userProgress: {
          where: {
            userId: userId,
          },
        },
      },
    });

    return NextResponse.json({ courseVideos });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
