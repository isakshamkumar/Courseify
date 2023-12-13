"use client";
// Import necessary libraries and components

import Video from "@/app/packages/ui/users/components/Video";
import VideoSideBar from "@/app/packages/ui/users/components/VideoSideBar";
import React, { useEffect, useState } from "react";
import { FiVideo } from "react-icons/fi"; // Import video icon from react-icons library
import ReactPlayer from "react-player"; // Import ReactPlayer for video playback

type Params = {
  params: {
    courseId: string;
  };
};
// Your Page component
const Page =  ({ params: { courseId } }: Params) => {
  const [videos, setvideos] = useState<any>([]);
  const [selectedVideo, setselectedVideo] = useState<any>(null);
  console.log(courseId, "courseId from []");
  const [courseProgress, setCourseProgress] = useState<number>(0);

  useEffect(() => {
    async function init() {
      const getVideosHandler = async () => {
        const response = await fetch("/api/video", {
          headers: {
            "Content-Type": "application/json",
            courseId: courseId,
          },
        });
        if (!response.ok) {
          alert("hi");
        }
        // console.log('videos get handler caloing down');

        const videoswithKeys = await response.json();
        console.log(videoswithKeys, "video with keys");
        setCourseProgress(videoswithKeys.courseProgress);

        const videos = await Promise.all(
          videoswithKeys.courseVideos.map((video) => populateVideoKeys(video))
        );

        return videos;
      };
      const populateVideoKeys = async (video) => {
        const response = await fetch(`/api/video/${video.videoUrl}`);
        console.log(video, "videoooooooooooooooooo");

        const videoUrl = await response.json();
        // console.log(videoUrl.url);
        return {
          id: video.id,
          title: video.title,
          url: videoUrl.url,
          description: video.course.description,
          completed:
            video.userProgress.length > 0
              ? video.userProgress[0].completed
              : false,
        };
      };

      console.log("le videosss");

      const videos = await getVideosHandler();
      setvideos(videos);
      setselectedVideo(videos[0]);
      console.log(videos, "videossss");
    }
    init();
  }, []);

  // await new Promise<void>((resolve, reject) => {
  //   setTimeout(async () => {
  //     resolve();
  //   }, 4000);
  // });
  console.log(courseProgress, "courseprogresssssssssss");

  if (selectedVideo?.title) {
    return (
      <div className="px-8 ml-12 grid h-screen grid-cols-12">
        <VideoSideBar
          courseProgress={parseInt(courseProgress.toFixed(0))}
          videos={videos}
          selectedVideo={selectedVideo}
          setselectedVideo={setselectedVideo}
        />
        <div className="col-span-9 p-4 bg-white border border-gray-300 shadow-md">
          <div className="mb-4 ">
            <Video setselectedVideo={setselectedVideo} setvideos={setvideos} setCourseProgress={setCourseProgress} selectedVideo={selectedVideo} />
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
