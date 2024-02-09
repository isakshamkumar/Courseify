"use client"
import { getVideoWithKeys } from "@/app/packages/lib/getVideos";
import { getVideoWithPopulatedKeys } from "@/app/packages/lib/getVideosPopulated";
import { RootState } from "@/app/packages/redux/store";
import Spinner from "@/app/packages/ui/common/Spinner";
import StudySpinner from "@/app/packages/ui/common/Spinner2";
import Video from "@/app/packages/ui/users/components/Video";
import VideoSideBar from "@/app/packages/ui/users/components/VideoSideBar";
import React, { Suspense, useEffect, useState} from "react";
import { useSelector } from "react-redux";

type Params = {
  params: {
    courseId: string;
  };
};

const Page =  ({ params: { courseId } }: Params) => {
  const [videos, setvideos] = useState<any>(null);
  const [selectedVideo, setselectedVideo] = useState<number>(0);
  const userId:any = useSelector<RootState>((state) => state.user.user?.id);
  
  useEffect(()=>{
    const videos=  getVideoWithKeys(courseId,userId)
    setvideos(videos)
  },[])

  if (videos) {
    return (
      <Suspense fallback={<div className="w-full h-full flex justify-center items-center"><StudySpinner/></div>}>

 
      <div className="px-8 ml-12 grid h-screen grid-cols-12">
        <Suspense fallback={<div className="flex h-full w-full col-span-3 justify-center items-center" ><Spinner/></div>}>
          <VideoSideBar
            videos={videos}
            selectedVideo={selectedVideo}
            setselectedVideo={setselectedVideo}
          />
        </Suspense>
        <div className="col-span-9 p-4 bg-white border border-gray-300 shadow-md">
          <div className="col-span-9">
            <Suspense fallback={<div className="flex h-full justify-center items-center" ><StudySpinner/></div>}>
              <div className="mb-4 ">
                <Video
                  setselectedVideo={setselectedVideo}
                  selectedVideo={selectedVideo}
                  setvideos={setvideos}
                  videos={videos} 
                />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
      </Suspense>
    );
  }
};

export default Page;
