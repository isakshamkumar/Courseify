import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


export const userPurchasedCourses = async (userId:any) => {
 
    console.log(userId,'from getpurchaseddddddddddd');
    console.log(typeof userId);
    
    
    const response = await fetch("http://localhost:3000/api/user/purchasedCourses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userId: userId,
      },
    });
    if(!response.ok){
      console.log(response.statusText);
      return
      
    }
    return response.json()

    // const purchasedCourses = await response.json();
    // console.log(purchasedCourses,'purchased Coursessssss');
    // setpurchasedCourses(purchasedCourses.purchasedCourses.purchasedCourses)
  };
