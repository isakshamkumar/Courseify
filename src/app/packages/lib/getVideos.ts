export const getVideoWithKeys=async(courseId:string,userId:string)=>{
    const response = await fetch("http://localhost:3000/api/video", {
        headers: {
          "Content-Type": "application/json",
          courseId: courseId,
          userId

        },
      });
      if (!response.ok) {
        alert("hi");
      }
      ;
      // console.log('response.jsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      // console.log('response.jsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      // console.log('response.jsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      // console.log('response.jsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      // console.log(response,'response from getVideosssssssssssssssssssssssssssss');
      

      return response.json()
}