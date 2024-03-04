
export const getVideoWithPopulatedKeys=async(videoPromises:any)=>{
    const videoswithKeys= await videoPromises
    console.log(videoswithKeys,'videowithkeys from getpopulatedKeys');
    

    const videos = await Promise.all(
        videoswithKeys.courseVideos.map((video:any) => populateVideoKeys(video))
      );
      return videos
}


async function populateVideoKeys(video:any)  {
    const response = await fetch(`http://localhost:3000/api/video/${video.videoUrl}`);
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
