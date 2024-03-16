export const getCourses=async()=>{
    const response = await fetch("http://localhost:3000/api/courses");
    return response.json()

}