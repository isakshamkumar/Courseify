import React, { useEffect, useState } from "react";
import { FiVideo, FiCheckCircle } from "react-icons/fi";

type Video = {
  id: string;
  title: string;
  url: string;
  completed: Boolean;
};

const VideoSideBar = async ({
  // courseProgress,
  videos,
}: // selectedVideo,
// setselectedVideo,

{
  videos: any;
  // selectedVideo: any;
  // setselectedVideo: React.Dispatch<any>;
  // courseProgress: number;
}) => {
  // console.log(selectedVideo, "selectedvideo");
  console.log(videos, "videosssss");

  const CourseVideos = await videos;
  console.log(CourseVideos, "coursevideossssssssssssssssssssssssss");
  // completed:
  // //           video.userProgress.length > 0
  // //             ? video.userProgress[0].completed
  // //             : false,
  // //       };

  //1) agar net chla jata h even fter videos has loaded then videos doesnot play
  //2) agar net chla jata h toh no internet page chalna chahiye-->hungryhero repo me dekho

  // if (selectedVideo?.title) {
  return (
    <div className="col-span-3 p-4 bg-white border border-gray-300 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Course Name</h2>
      <div className="text-center">
        <span className="font-bold text-sm">{parseInt(CourseVideos.courseProgress)}%</span>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex items-center w-full bg-gray-200 rounded-full">
          <div
            className="h-4 bg-indigo-600 flex items-center justify-center text-center text-white rounded-lg"
            style={{ width: `${CourseVideos.courseProgress}%` }}
          ></div>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {CourseVideos.courseVideos.map((video: any, index: any) => (
          <li
         
            key={index}
            className={`p-2 border border-slate-400 rounded-md cursor-pointer hover:bg-slate-300
            
              `}
            // onClick={() => setselectedVideo(video)}
          >
            {video.userProgress.length > 0 &&
            !video.userProgress[0].completed ? (
              <FiVideo className="mr-2 inline" />
            ) : (
              <FiCheckCircle className="mr-2 inline text-green-700   " />
            )}

            <span
              className={
                video.userProgress.length > 0 && video.userProgress[0].completed
                  ? "text-green-700 font"
                  : "text-inherit"
              }
            >
              {video.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
// };

export default VideoSideBar;
/**
 *    ${
                video.id === selectedVideo.id
                  ? "bg-slate-200 text-black"
                  : "hover:bg-slate-200"
              }
 */
