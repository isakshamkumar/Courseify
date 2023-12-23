"use client"
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Toaster, toast } from 'react-hot-toast';
// import { useParams } from "next/navigation";
import { getVideoWithPopulatedKeys } from "@/app/packages/lib/getVideosPopulated";
import StudySpinner from "../../common/Spinner2";
import { useSelector } from "react-redux";
import { RootState } from "@/app/packages/redux/store";
import { useParams } from "next/navigation";
import { getVideoWithKeys } from "@/app/packages/lib/getVideos";




const Video = ({
   setselectedVideo,
  //@ts-ignore
   videos,
   setvideos,

   selectedVideo
  //  setvideos
    // ,setCourseProgress
  }:{videos:any,selectedVideo:any,setselectedVideo:React.Dispatch<number>,setvideos:React.Dispatch<any>}) => {
    const {courseId} = useParams()
    const userId:any = useSelector<RootState>((state) => state.user.user?.id);
  const [video,setvideo]=useState<any>(null)
  const [mounted, setMounted] = useState(false);

   useEffect(()=>{
    setMounted(true)
    const fetchVideo=async()=>{

      const video= await getVideoWithPopulatedKeys(videos)
      setvideo(video)
    }
    fetchVideo()
   },[])

  
  if(mounted && !video) return <div className="h-screen justify-center items-center"><StudySpinner/></div>
  if(mounted && video){

    const v= video[selectedVideo]
    console.log(v,'selectedVideooooooooooo');
    const handleEnded=async()=>{
      if(!v.completed){
      toast.success('Updating Video and Course Progress')
        const response = await fetch("/api/user/updateVideoProgress", {
                method: "POST",
                body: JSON.stringify({
                  videoId: v.id,
                  userId,
                  courseId:courseId.toString()
                }),
              });
              const data=await response.json()
        //@ts-ignore
        setselectedVideo(prev=>prev+1)
        // const videos=data.courseVideos
       
        const random=async(data:any)=>{
          return data
        }
        const videowithkeyspromise= random(data)
        setvideos(videowithkeyspromise)
        const populatedVideos= await getVideoWithPopulatedKeys(videowithkeyspromise) 
        setvideo(populatedVideos)
        toast.success("Successfully Updated Course and Video Progress!")
      }
    }
    

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
            onEnded={handleEnded}
          />
        </div>
        <div>
          <button type="button" 
          // disabled={true}
           onClick={handleEnded}
            className={`${!v.completed?'bg-green-500':'bg-red-700'} text-white px-4 py-2 rounded-md mb-2   `}>
            {!v.completed ? "Mark as Complete" : "Completed"}
          </button>
          <p className="text-gray-600 mb-2">{v.description}</p>
        </div>
      </div>
    );
  } 
  
};

export default Video;
