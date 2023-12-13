"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterButton = ({method,role}:{method:string,role:string}) => {
  const router=useRouter()
  const session= useSession()
  console.log(session,'sesssssionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
  
  console.log(role,'from',method);
  const signUpHandler=async()=>{
    if(method==="Signup"){
      const response=await fetch('/api/register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify({firstName:'Saksham',lastName:'kumar',email:'ksaksham39@gmail.com',password:123456})
      })
      if(!response.ok){
        alert('wrongg')
      }
      const data= await response.json();
      console.log(data);
    }
  }
  
  return (
    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
      <button onClick={signUpHandler}  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
        {method==="Signup"?'Create an account':'Login'}
      </button>
      {method==="Signup"? <p  className="mt-4 text-sm text-gray-500 sm:mt-0">
        Already have an account?
        <button onClick={()=>router.push(`/${role}/signin`)} className="text-gray-700 underline">Log in</button>.
      </p>: <p className="mt-4 text-sm text-gray-500 sm:mt-0">
        Dont have an account?
        <button onClick={()=>router.push(`/${role}/signup`)} className="text-gray-700 underline">Sign Up</button>.
      </p> }
     
    </div>
  );
};

export default RegisterButton;
