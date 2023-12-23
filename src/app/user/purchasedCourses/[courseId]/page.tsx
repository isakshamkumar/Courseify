


import { getVideoWithKeys } from "@/app/packages/lib/getVideos";
import { getVideoWithPopulatedKeys } from "@/app/packages/lib/getVideosPopulated";
import Spinner from "@/app/packages/ui/common/Spinner";
import StudySpinner from "@/app/packages/ui/common/Spinner2";
import Video from "@/app/packages/ui/users/components/Video";
import VideoSideBar from "@/app/packages/ui/users/components/VideoSideBar";
import React, { Suspense} from "react";


type Params = {
  params: {
    courseId: string;
  };
};
const Page =  async({ params: { courseId } }: Params) => {
  // const [videos, setvideos] = useState<any>([]);
  // const [selectedVideo, setselectedVideo] = useState<any>(null);
  // const [courseProgress, setCourseProgress] = useState<number>(0);
const videos=  getVideoWithKeys(courseId)
console.log(videos,'videos with out keysssssssssssssssssssssss');

// const video= getVideoWithPopulatedKeys(videos)
// console.log(video,'videoeeeeeeeeeee');


// console.log(v);

  // useEffect(() => {
  //   async function init() {
  //     const getVideosHandler = async () => {
  //       const response = await fetch("/api/video", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           courseId: courseId,
  //         },
  //       });
  //       if (!response.ok) {
  //         alert("hi");
  //       }
  //       // console.log('videos get handler caloing down');

  //       const videoswithKeys = await response.json();
  //       console.log(videoswithKeys, "video with keys");
  //       // setCourseProgress(videoswithKeys.courseProgress);

  //       const videos = await Promise.all(
  //         videoswithKeys.courseVideos.map((video:any) => populateVideoKeys(video))
  //       );

  //       return videos;
  //     };
  //     const populateVideoKeys = async (video:any) => {
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

  //     console.log("le videosss");

  //     const videos = await getVideosHandler();
  //     setvideos(videos);
  //     setselectedVideo(videos[0]);
  //     console.log(videos, "videossss");
  //   }
  //   init();
  // }, []);

  // console.log(courseProgress, "courseprogresssssssssss");

  // if (selectedVideo?.title) {
    return (
      <div className="px-8 ml-12 grid h-screen grid-cols-12">
        <Suspense fallback={<div className="flex h-full w-full justify-center items-center" ><Spinner/></div>}>

        <VideoSideBar
          // courseProgress={parseInt(courseProgress.toFixed(0))}
          videos={videos}
          // selectedVideo={selectedVideo}
          // setselectedVideo={setselectedVideo}
          />
          </Suspense>
        <div className="col-span-9 p-4 bg-white border border-gray-300 shadow-md">
          <Suspense fallback={<div className="flex h-full  justify-center items-center" ><StudySpinner/></div>}>

         
          <div className="mb-4 ">
            <Video
            //  setselectedVideo={setselectedVideo}
              // setvideos={setvideos}
              //  setCourseProgress={setCourseProgress}
                selectedVideo={videos} />
          </div>
          </Suspense>
        </div>
      </div>
    );
  }
// };

export default Page;
