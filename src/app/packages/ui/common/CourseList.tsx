import React from 'react'
import Card from './Card'
import { Course } from '@prisma/client'

interface CourseListProps{
    products:any,
    pageNumber:number
}
const CourseList:React.FC<CourseListProps> = async({products,pageNumber}) => {
  const courses=await products
  const AvailableCourses:Course[]=courses.courses
  // console.log(courses,'courses');
  
  return (
    <div className=" border-4 rounded-2xl flex flex-wrap justify-center items-center p-16 gap-10 ">
    {AvailableCourses?.slice(pageNumber * 6 - 6, pageNumber * 6).map((prod:any,i:number) => (
      <Card
      key={i}
        navigateTo={`/course/${prod.id}`}
        thumbnail={prod.thumbnail}
        description={prod.description}
        title={prod.title}
      />
    ))}
  </div>
  )
}

export default CourseList
