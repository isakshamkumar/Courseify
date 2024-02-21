"use client";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import StudySpinner from "@/app/packages/ui/common/Spinner2";
import { useSelector } from "react-redux";
import { userSlice } from "@/app/packages/redux/UserSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/app/packages/ui/common/Spinner";

export default function SuccessPage() {
  const router=useRouter()
 
  const[loading,setLoading]=useState(false)
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  //@ts-ignore
const userId = useSelector((state) => state.user.user.id);
// console.log(userState,'userStateeeeeeeeeeeeeee');

  console.log(session_id, "session_id");



  useEffect(() => {
    const count=localStorage.getItem("paymentCount")
    if(!loading && !count){
      setLoading(true)
      const fetchSession = async () => {
        console.log('fetchsession calleddddddddddddddddddddddddddddddddddddddddddddddddd');
        
        const response = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify({ session_id,userId }),
        });
       
        setLoading(false)
     
      };
      fetchSession()
      setLoading(false)
      localStorage.setItem("paymentCount","1")
    }
  
   
  
   const timeout= setTimeout(() => {
    localStorage.removeItem("paymentCount")
      router.push("/user/purchasedCourses")
    }, 5000);

  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
    {loading ? 
        <StudySpinner />
       :
        <div className="h-36 flex flex-col w-52 ">
          Payment Successful! Redirecting You to Purchased Courses...
        
          <Spinner/>

        </div> 
    }
    </div>
  );
}
