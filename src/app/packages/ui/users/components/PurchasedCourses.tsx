"use client"
import React  from "react";
import { RootState } from "@/app/packages/redux/store";
import { useSelector } from "react-redux";
import Card from "../../common/Card";
import { userPurchasedCourses } from "@/app/packages/lib/getPurchasedCourses";
import { Course } from "@prisma/client";

type Props = {};

const PurchasedCourses = async(props: Props) => {
  const userId = useSelector<RootState>((state) => state.user.user?.id);
  // const[purchasedCourses,setpurchasedCourses]=useState([])

    // const fetchCourse = async (userId: any) => {
        let Courses = await userPurchasedCourses(userId);
        let purchasedCourses=Courses.purchasedCourses.purchasedCourses
        // setpurchasedCourses(Courses.purchasedCourses.purchasedCourses)
    //  };
    //  fetchCourse(userId)



  
  return (
    <>
   {purchasedCourses?.length!==0 &&  <div
      className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8 lg:gap-12 "
      // style={{ border: "2px solid red" }}
    >
      {purchasedCourses?.map((course: any) => (
        <Card
          navigateTo={`/user/purchasedCourses/${course.id}`}
          thumbnail={course.thumbnail}
          description={course.description}
          title={course.title}
        />
      ))}
    </div> }
   
    {purchasedCourses?.length===0 && <div style={{border:"5px solid blue"}} className="h-screen flex justify-center items-center">No Purchased Courses.</div> }
    </>
  );
};

export default PurchasedCourses;
