"use client"
import { makePayment } from "@/app/packages/stripe/payment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
interface SideBarProps {
  course: any;
 
}
const SideBar: React.FC<SideBarProps> = ({ course }) => {
  const session=useSession()
  // console.log(session,'from courseeeeeeeeee');
  
  const router=useRouter()
  const handleBuyCourse=()=>{
   if(session?.data?.user){
       makePayment(course)

      }else{

        alert('Login First')
        router.push('/user/signup')
      }

  }
  
  return (
    <div className="lg:col-span-1">
      {/* Add additional information or related content in the sidebar */}
      <div className="bg-white p-4 rounded border border-gray-200 shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">This course includes</h2>
        {/* Display course features or other information */}
        <ul className="text-gray-600">
          <li className="flex items-center mb-2">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{course.duration} hours of on-demand video</span>
          </li>
          <li className="flex items-center mb-2">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>10 articles and 5 downloadable resources</span>
          </li>
          <li className="flex items-center mb-2">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Full lifetime access</span>
          </li>
          <li className="flex items-center mb-2">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Certificate of completion</span>
          </li>
        </ul>
        <button
          onClick={handleBuyCourse}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Buy now
        </button>
      </div>
      <div className="bg-white p-4 rounded border border-gray-200 shadow">
        <h2 className="text-lg font-semibold mb-2">About the instructor</h2>
        {/* Display instructor details or other information */}
        <div className="flex items-center mb-4">
          <img
            src="https://i.dummyjson.com/data/users/1/avatar.jpg"
            alt={"instructor"}
            className="w-12 h-12 rounded mr-4"
          />
          <div className="text-gray-700">
            <h3 className="text-lg font-medium">{"Dave"}</h3>
            <p className="text-sm">iOS Developer and Instructor</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          John Doe is a professional iOS developer and instructor with over 5
          years of experience in creating apps for various clients and
          companies. He loves teaching and sharing his knowledge with others
          through online courses and tutorials.
        </p>
        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200">
          View more
        </button>
      </div>
    </div>
  );
};

export default SideBar;
