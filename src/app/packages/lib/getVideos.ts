export const getVideoWithKeys=async(courseId:string)=>{
    const response = await fetch("http://localhost:3000/api/video", {
        headers: {
          "Content-Type": "application/json",
          courseId: courseId,
        },
      });
      if (!response.ok) {
        alert("hi");
      }
      ;
      console.log('response.jsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      console.log('response.jsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      console.log('response.jsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      console.log('response.jsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      

      return response.json()
}