"use client"
import React, { useEffect, useState } from "react";
import { FiVideo, FiCheckCircle } from "react-icons/fi";

type Video = {
  id: string;
  title: string;
  url: string;
  completed: Boolean;
};

const VideoSideBar =  ({
  // courseProgress,
  videos,
  selectedVideo,
  setselectedVideo
}:


{
  videos: any;
  selectedVideo: number;
  setselectedVideo: React.Dispatch<any>;
  // courseProgress: number;
}) => {
  // console.log(selectedVideo, "selectedvideo");
  console.log(videos, "videosssss");
  const[CourseVideos,setcourseVideos]=useState<any>([])
  useEffect(()=>{
    console.log('called again');
    
    const getVourseVideos=async()=>{
      const CourseVideos = await videos;
      setcourseVideos(CourseVideos)
    }
    getVourseVideos()
  },[videos])
if(CourseVideos.courseVideos?.length>0){


  return (
    <div className="col-span-3 p-4 bg-white border border-gray-300 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Course Name</h2>
      <div className="text-center">
  <span className="font-bold text-sm">{parseInt(CourseVideos.courseProgress)}%</span>
</div>
<div className="flex items-center mb-4">
  <div className="flex items-center w-full bg-gray-200 rounded-full">
    <div
      className="h-4 bg-indigo-600 flex items-center justify-center text-center text-white rounded-lg transition-all duration-500 ease-in-out"
      style={{ width: `${CourseVideos.courseProgress}%` }}
    ></div>
  </div>
</div>

      <ul className="flex flex-col gap-2">
        {CourseVideos.courseVideos.map((video: any, index: any) => (
          <li
         
            key={index}
            className={`p-2 border border-slate-400 rounded-md cursor-pointer hover:bg-slate-300 ${selectedVideo===index?'bg-slate-300':''}
            
              `}
            onClick={() => setselectedVideo(index)}
          >
            {
              video.userProgress.length>0? (
            !video.userProgress[0].completed ? (
              <FiVideo className="mr-2 inline" />
            ) : (
              <FiCheckCircle className="mr-2 inline text-green-700   " />
            ))
          : <FiVideo className="mr-2 inline" />}

            <span
              className={
                video.userProgress.length>0?(
               video.userProgress[0].completed
                  ? "text-green-700 font"
                  : "text-inherit"
                ):'text-inherit'
              }
            >
              {video.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
  }
};
// };

export default VideoSideBar;
