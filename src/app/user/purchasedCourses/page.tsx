"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/packages/ui/common/Card";

const PurchasedCoursesPage =  () => {
  //notice when i remove async from here the the loading.tsx from the root loading,tsx does not apply here but does so when we mark this async

  const[purchasedCourses,setpurchasedCourses]=useState<any>(null)
  const[random,setrandom]=useState(1)
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/user/purchasedCourses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userId: "6573562edb4374c30a75ee00",
        },
      });

      const purchasedCourses = await response.json();
      // console.log(purchasedCourses);
      setpurchasedCourses(purchasedCourses.purchasedCourses.purchasedCourses)
    };
    fetchCourses()
  },[]);

  // const purchasedCourses = [
  //   {
  //     id: 1,
  //     title: "Course 1",
  //     description:
  //       "Description for Course 1. This is a longer description to test multiline text.",
  //     thumbnail:
  //       "https://images.pexels.com/photos/16552418/pexels-photo-16552418/free-photo-of-moody-pnw-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 2,
  //     title: "Course 2",
  //     description: "Description for Course 2",
  //     thumbnail:
  //       "https://images.pexels.com/photos/16552418/pexels-photo-16552418/free-photo-of-moody-pnw-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 3,
  //     title: "Course 2",
  //     description: "Description for Course 2",
  //     thumbnail:
  //       "https://images.pexels.com/photos/16552418/pexels-photo-16552418/free-photo-of-moody-pnw-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 4,
  //     title: "Course 2",
  //     description: "Description for Course 2",
  //     thumbnail:
  //       "https://images.pexels.com/photos/16552418/pexels-photo-16552418/free-photo-of-moody-pnw-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 4,
  //     title: "Course 2",
  //     description: "Description for Course 2",
  //     thumbnail:
  //       "https://images.pexels.com/photos/16552418/pexels-photo-16552418/free-photo-of-moody-pnw-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   {
  //     id: 4,
  //     title: "Course 2",
  //     description: "Description for Course 2",
  //     thumbnail:
  //       "https://images.pexels.com/photos/16552418/pexels-photo-16552418/free-photo-of-moody-pnw-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   },
  //   // Add more courses as needed
  // ];

  return (
    <>
    <button className="w-64" onClick={()=>{setrandom(random+1)}}>CLick</button>
    <p style={{border:'2px solid red',height:'30px',textAlign:'center'}} >{random}</p>
    {purchasedCourses && <div
      className="container w-screen h-full mx-auto my-8 px-28 py-4"
      style={{ border: "2px solid green" }}
    >
      <h2 className="text-3xl text-center font-semibold mb-6">
        Your Purchased Courses
      </h2>
      <div className="flex">
        <label
          htmlFor="HeadlineAct"
          className="block text-sm font-medium text-gray-900"
        >
          Sort By
        </label>

        <select
          name="HeadlineAct"
          id="HeadlineAct"
          className="mt-1.5 w-36 p-1 ml-4 rounded-lg border-gray-300  text-gray-700 sm:text-sm"
        >
          <option value="">Please select</option>
          <option value="JM">John Mayer</option>
          <option value="SRV">Stevie Ray Vaughn</option>
          <option value="JH">Jimi Hendrix</option>
          <option value="BBK">B.B King</option>
          <option value="AK">Albert King</option>
          <option value="BG">Buddy Guy</option>
          <option value="EC">Eric Clapton</option>
        </select>
      </div>
      <div
        className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8 lg:gap-12 "
        style={{ border: "2px solid red" }}
      >
        {purchasedCourses.map((course) => (
          <Card
          navigateTo={`/user/purchasedCourses/${course.id}`}
            thumbnail={course.thumbnail}
            description={course.description}
            title={course.title}
          />
        ))}
      </div>
    </div> }
    
  </>
  );
};

export default PurchasedCoursesPage;
