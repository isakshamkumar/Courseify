"use client"
import React, { useEffect, useState }  from "react";
import { RootState } from "@/app/packages/redux/store";
import { useSelector } from "react-redux";
import Card from "../../common/Card";
import { userPurchasedCourses } from "@/app/packages/lib/getPurchasedCourses";
import { Course } from "@prisma/client";
import Spinner from "../../common/Spinner";
import StudySpinner from "../../common/Spinner2";

type Props = {};

const PurchasedCourses = (props: Props) => {
  const userId = useSelector<RootState>((state) => state.user.user?.id);
  
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading,setloading]=useState(false)

  useEffect(() => {
    
    const fetchCourses = async () => {
      setloading(true)
      let courses = await userPurchasedCourses(userId);
      console.log(courses,'from purchased Coursesssssssssssssssssssssssssssssssssssssss');
      
      setPurchasedCourses(courses.purchasedCourses.purchases);
      setloading(false)
    };

    fetchCourses();
  }, [userId]);

    // const fetchCourse = async (userId: any) => {
        // let Courses = await userPurchasedCourses(userId);
        // let purchasedCourses=Courses.purchasedCourses.purchasedCourses
        // setpurchasedCourses(Courses.purchasedCourses.purchasedCourses)
    //  };
    //  fetchCourse(userId)


if(loading) return <div className="h-full flex flex-col justify-center gap-4 items-center">
  <StudySpinner/> Getting Purchased Courses..
</div> 
  
  return (
    <>
   {purchasedCourses?.length!==0 &&  <div
      className="p-32 grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8 lg:gap-12 "
      // style={{ border: "2px solid red" }}
    >
      {purchasedCourses?.map((course: any) => (
        // eslint-disable-next-line react/jsx-key
        <Card
          navigateTo={`/user/purchasedCourses/${course.course.id}`}
          thumbnail={course.course.thumbnail}
          description={course.course.description}
          title={course.course.title}
        />
      ))}
    </div> }
   
    {purchasedCourses?.length===0 && <div style={{border:"5px solid blue"}} className="h-screen flex justify-center items-center">No Purchased Courses.</div> }
    </>
  );
};

export default PurchasedCourses;
