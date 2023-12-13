'use client'
//if we want to use generateMwtadera function we havr to rwnder this page serverside then but we cannot have onlclicks on out btns coz inclick is a client effect
//also put all this code in components, technicaly next js is correct
// import React, { useState } from "react";
//also generate meta deta for all pages
import { makePayment } from "@/app/packages/stripe/payment";
import { notFound, useParams, usePathname, useRouter } from "next/navigation";
import { Metadata } from "next";
// import Session from "@/app/packages/ui/common/Session";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Params = {
  params: {
      courseId: string
  }
}
// export async function generateStaticParams() {
//   const usersData: Promise<User[]> = getAllUsers()
//   const users = await usersData

//   return users.map(user => ({
//       userId: user.id.toString()
//   }))
// }
// export async function generateMetadata({ params: { courseId } }: Params): Promise<Metadata> {
  
// const user=courseId
//   return {
//       title: user,
//       description: `This is the page of ${user}`
//   }

// }
//so destructing method of params in pages are different from compnents
const CoursePage =async ({ params: { courseId } }: Params) => {
 
// alert('particular course')
  const[course,setcourse]=useState<any>(null)
  const fetchCourse=async()=>{
    const response=await fetch(`/api/courses/${courseId}`)
    const data=await response.json()
    console.log(data.course);
    
    setcourse(data.course)

  }
  useEffect(()=>{
    fetchCourse()

  },[])
  const session=useSession()
  const router=useRouter()
  // alert(courseId)
  // Dummy data for demonstration, replace it with actual course details
  const courseDetails = {
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    description: "Learn how to create an iPhone app from scratch using Swift and Xcode",
    title: "iPhone 9 App Development",
    rating: 4.5,
    reviews: 123,
    price: 19.99,
    instructor: "John Doe",
    
  };




  // Define the number of items to display per row
  const itemsPerRow = 4;

  // Calculate the number of rows needed
  const numRows = Math.ceil(course?.whatYouWillLearn.length / itemsPerRow);
  const handleBuyCourse=()=>{
   
      if(session?.data?.user){
       makePayment(course)

      }else{

        alert('Login First')
        router.push('/user/signup')
      }
      
    
  }

  // State for managing the active accordion section
  // const [activeSection, setActiveSection] = useState<null| number>(null);

  return (
    <>
   {course  && <div className="container mx-auto px-32 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-lg text-yellow-400 mr-2">{course.rating.rating}</span>
            <span className="text-sm text-gray-500 mr-4">({course.rating.count} ratings)</span>
            <span className="text-lg text-green-500 font-bold">${course.price}</span>
          </div>
          <img src={course.thumbnail} alt={courseDetails.title} className="w-full h-64 object-cover rounded mb-4" />
          <p className="text-lg text-gray-700 mb-4">{course.description}</p>

          {/* What you will learn section */}
          <div className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-2">What you will learn</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {Array.from({ length: numRows }).map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-1 gap-2">
                  {course.whatYouWillLearn
                    .slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
                    .map((point, index) => (
                      <div key={index} className="text-gray-600">
                        {point}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          {/* <Session/> */}

          {/* Video Sections */}
          {/* {videoSections.map((section, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
              <h2
                className="text-xl font-semibold mb-2 cursor-pointer"
                onClick={() => setActiveSection(activeSection === index ? null : index)}
              >
                {section.title} {activeSection === index ? "[-]" : "[+]"}
              </h2>
              {activeSection === index && (
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  
                    <li>{section.video}</li>
                  
                </ul>
              )}
            </div>
          ))} */}

          {/* <button onClick={()=>makePayment(courseDetails)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Buy now</button> */}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Add additional information or related content in the sidebar */}
          <div className="bg-white p-4 rounded border border-gray-200 shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">This course includes</h2>
            {/* Display course features or other information */}
            <ul className="text-gray-600">
              <li className="flex items-center mb-2">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span>{course.duration} hours of on-demand video</span>
              </li>
              <li className="flex items-center mb-2">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span>10 articles and 5 downloadable resources</span>
              </li>
              <li className="flex items-center mb-2">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span>Full lifetime access</span>
              </li>
              <li className="flex items-center mb-2">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span>Certificate of completion</span>
              </li>
            </ul>
            <button onClick={()=>handleBuyCourse()} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Buy now</button>
          </div>
          <div className="bg-white p-4 rounded border border-gray-200 shadow">
            <h2 className="text-lg font-semibold mb-2">About the instructor</h2>
            {/* Display instructor details or other information */}
            <div className="flex items-center mb-4">
              <img src="https://i.dummyjson.com/data/users/1/avatar.jpg" alt={courseDetails.instructor} className="w-12 h-12 rounded mr-4" />
              <div className="text-gray-700">
                <h3 className="text-lg font-medium">{courseDetails.instructor}</h3>
                <p className="text-sm">iOS Developer and Instructor</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">John Doe is a professional iOS developer and instructor with over 5 years of experience in creating apps for various clients and companies. He loves teaching and sharing his knowledge with others through online courses and tutorials.</p>
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200">View more</button>
          </div>
        </div>
      </div>
    </div> }
    
    
  </>
  );
};

export default CoursePage;
