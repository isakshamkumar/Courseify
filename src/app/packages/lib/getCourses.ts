export const getCourses=async()=>{
    const response = await fetch("/api/courses");
    return response.json()

}