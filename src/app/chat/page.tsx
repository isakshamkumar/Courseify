"use client"
import React, { useEffect, useState } from 'react'
import ChatServerMenu from '../packages/ui/common/chat/ChatServerMenu'
import ChatPage from '../packages/ui/common/chat/ChatPage'
import Spinner from '../packages/ui/common/Spinner'

type Props = {}

const page = (props: Props) => {
  const[loading,setLoading]=useState(true)
  useEffect(()=>{
    setTimeout(() => {
      
      setLoading(false)
    }, 2000);
  },[])
  return (
    <>
    {!loading ?  <div className='flex  '>
    <ChatServerMenu/>
  
    <ChatPage/>
    
</div> : <div className='flex flex-col items-center justify-center w-full h-screen'><Spinner/> Loading Chat Portal...</div>}
</>
   
  )
}

export default page