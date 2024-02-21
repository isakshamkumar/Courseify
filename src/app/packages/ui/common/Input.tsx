// "use client"
import React, { ReactNode, useState } from 'react'
interface InputProps{
   
    text:string,
    
}
const Input:React.FC<InputProps> = ({text}) => {
  // const [courseInput,setCourseInput]=useState("")
  return (
    <div className=" flex flex-col justify-center items-center mt-5 w-4/5 ml-40">
    <label htmlFor="Filter" className="font-medium text-2xl">
      {text}
    </label>
    <input
      id="Filter"
      placeholder={text}
      type="text"
   
      className="block p-2 my-2 w-3/5 bg-slate-200 border-none rounded-2xl"
    />
  </div>
  )
}

export default Input
