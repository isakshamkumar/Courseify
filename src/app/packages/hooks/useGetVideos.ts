const useGetVideos=()=>{

  const getVideosHandler = async () => {
    const response = await fetch("/api/video");
    // console.log('videos get handler caloing down');

    const videoswithKeys = await response.json();
    // console.log(videoswithKeys,'video with keys');

    const videos = await Promise.all(
      videoswithKeys.courseVideos.map((video) =>
        populateVideoKeys(video.videoUrl)
      )
    );
    
    return videos;
  };
  const populateVideoKeys = async (key) => {
    const response = await fetch(`/api/video/${key}`);
    

    const videoUrl = await response.json();
    // console.log(videoUrl.url);
    return videoUrl.url;
  };
  return {getVideosHandler}

}
export default useGetVideos
