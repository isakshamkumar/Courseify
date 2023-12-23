"use client"
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from "next/navigation";
import { getVideoWithPopulatedKeys } from "@/app/packages/lib/getVideosPopulated";


const Video = async({
  //  setselectedVideo,
  //@ts-ignore
   selectedVideo,
  //  setvideos
    // ,setCourseProgress
  }) => {
  const params=useParams()
  console.log(params,'params');
  // const[video,setvideo]=useState(null)
  
  // const [mounted, setMounted] = useState(false);
  // const handleEnded = async () => {
    
  //   // alert(`video ended for ${selectedVideo.title}`);
  //   if(!selectedVideo.completed){

  //     const response = await fetch("/api/user/updateVideoProgress", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         videoId: selectedVideo.id,
  //         userId:"6573562edb4374c30a75ee00",
  //         courseId:params.courseId.toString()
  //       }),
  //     });
  //     setselectedVideo(prevVideo => ({
  //       ...prevVideo,
  //       completed: true
  //     }));
     
  //     // const data=await response.json()
  //     // console.log(data);
  //     const getVideosHandler = async () => {
  //       const response = await fetch("/api/video", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           courseId: params.courseId.toString(),
  //         },
  //       });
  //       if (!response.ok) {
  //         alert("hi");
  //       }
  //       // console.log('videos get handler caloing down');

  //       const videoswithKeys = await response.json();
  //       console.log(videoswithKeys, "video with keys");
  //       setCourseProgress(videoswithKeys.courseProgress);

  //       const videos = await Promise.all(
  //         videoswithKeys.courseVideos.map((video) => populateVideoKeys(video))
  //       );
  //       toast('Course Progress Updated Successfully!✅')
  //       console.log(videos,'freshhhhhhhhhhhhhhhh');
        
  //       setvideos(videos)
  //       const videoIndex= videos.findIndex(video=>video.id===selectedVideo.id)
  //       // console.log(videoIndex,'videoIndex');
        
  //       setselectedVideo((prevVideo=>{
  //         const videoIndex= videos.findIndex(video=>video.title===prevVideo.title)
  //         return videos[videoIndex+1]

          
  //       }))
  //     };
  //     const populateVideoKeys = async (video) => {
  //       const response = await fetch(`/api/video/${video.videoUrl}`);
  //       console.log(video, "videoooooooooooooooooo");

  //       const videoUrl = await response.json();
  //       // console.log(videoUrl.url);
  //       return {
  //         id: video.id,
  //         title: video.title,
  //         url: videoUrl.url,
  //         description: video.course.description,
  //         completed:
  //           video.userProgress.length > 0
  //             ? video.userProgress[0].completed
  //             : false,
  //       };
  //     };
  //     // setvideos(data.courseVideos,'coursevideosssssssssssssss')
  //     getVideosHandler()
  //   }
    
  // };
  // useEffect(() => {
  //   const renderVideo=async()=>{
  //     const video= await selectedVideo
  //     const v= video[0]
  //     setvideo(v)

  //   }
  //   setMounted(true);
  //   renderVideo()
  // }, []);
  ;console.log(selectedVideo,'selected videosssssssssss');
   
  const video= await getVideoWithPopulatedKeys(selectedVideo)
  // const videos= await video
  const v= video[0]
 
    return (
      
      <div className="flex flex-col gap-8">
        <Toaster />
        <div className="relative aspect-[16/9] max-h-[500px] overflow-hidden">
          <ReactPlayer
          //@ts-ignore
            url={v?.url}
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0 w-full h-full"
            // onEnded={handleEnded}
          />
        </div>
        {/* <div>
          <button disabled={selectedVideo.completed}
          //  onClick={handleEnded}
            className={`bg-green-500 text-white px-4 py-2 rounded-md mb-2`}>
            {!selectedVideo.completed ? "Mark as Complete" : "Completed"}
          </button>
          <p className="text-gray-600 mb-2">{selectedVideo.description}</p>
        </div> */}
      </div>
    );
  
  
};

export default Video;
