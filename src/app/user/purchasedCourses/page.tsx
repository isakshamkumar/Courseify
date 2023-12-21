"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/packages/ui/common/Card";
import Filters from "@/app/packages/ui/common/Filters";
import { userPurchasedCourses } from "@/app/packages/lib/getPurchasedCourses";

const PurchasedCoursesPage =  async() => {
  //notice when i remove async from here the the loading.tsx from the root loading,tsx does not apply here but does so when we mark this async

  const[purchasedCourses,setpurchasedCourses]=useState<any>(null)
  
 

  useEffect(()=>{
    const fetchPurchasedCourses=async()=>{

      const pc=await userPurchasedCourses()
      const purchasedCourses=pc.purchasedCourses.purchasedCourses
      setpurchasedCourses(purchasedCourses)
    }
    fetchPurchasedCourses()

  },[])


  return (
    <>
    
    {purchasedCourses?.length!==0 && <div
      className="container w-screen h-full mx-auto my-8 px-28 py-4"
      // style={{ border: "2px solid green" }}
    >
      <h2 className="text-3xl text-center font-semibold mb-6">
        Your Purchased Courses
      </h2>
      
      
      <div className="max-w-[300px]">

      <Filters/>
      </div>
      <div
        className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8 lg:gap-12 "
        // style={{ border: "2px solid red" }}
      >
        {purchasedCourses?.map((course:any) => (
          <Card
          navigateTo={`/user/purchasedCourses/${course.id}`}
            thumbnail={course.thumbnail}
            description={course.description}
            title={course.title}
          />
        ))}
      </div>
    </div> }
    {purchasedCourses?.length===0 && <div style={{border:"5px solid blue"}} className="h-screen flex justify-center items-center">No Purchased Courses.</div> }
    
  </>
  );
};

export default PurchasedCoursesPage;
