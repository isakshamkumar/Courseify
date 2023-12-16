//this route returns all videos(with aws keys) for a particular course
//protected route
//add middlewares toooo
import prisma from "../../../../prisma/client";
import { Video, UserVideoProgress, Course } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface VideoWithProgress extends Video {
  userProgress: UserVideoProgress[];
  course: Course;
}

export async function GET(request: NextRequest) {
  // Extract the courseId and userId from the request headers
  const headersList = headers();
  const courseId: string = headersList.get("courseId")?.toString() || "";
  let userId: string = "6573562edb4374c30a75ee00";

  // Check if the courseId is provided
  if (!courseId) {
    return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
  }

  // Check if the user is authorized (this is a placeholder for your auth logic)
  // Replace with your actual authentication middleware
  const userIsAuthorized: boolean = true; // Replace with actual check
  if (!userIsAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch the course videos and their progress
  const courseVideos: VideoWithProgress[] | [] = await prisma.video.findMany({
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

  // Check if the course has videos
  if (courseVideos.length === 0) {
    return NextResponse.json({ error: "No videos found for this course" }, { status: 404 });
  }

  // Calculate the course progress
  const completedVideos = courseVideos.filter((video) => video.userProgress[0]?.completed).length;
  const totalVideos = courseVideos.length;
  const courseProgress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

  // Return the course videos and progress
  return NextResponse.json({ courseVideos, courseProgress });
}

