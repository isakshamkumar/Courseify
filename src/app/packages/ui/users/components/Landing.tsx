"use client"
import React, { ReactNode, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Button from '../../common/Button';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
interface LandingPageProps{
    children?:ReactNode
}
const Landing:React.FC<LandingPageProps> = () => {
    const router=useRouter()
    const {data:session}=useSession()
    useEffect(()=>{
        if(session?.user){
            router.push("/home")
        }

    },[session,router])
    // const session=getServerSession(authOptions)
    // console.log(session,'session from landing page');
    
  return (
    <main>
        <section className=" h-screen overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto h-full gap-8 max-w-xl flex flex-col justify-center items-center text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Welcome to CourseIfy
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
            Discover, learn, and grow with our Course App! Dive into a variety of courses designed to boost your skills and knowledge. From tech to creativity, we have got you covered. Start your learning journey today
            </p>

            <div className="mt-4 md:mt-8">
              <Button
                onClick={() => router.push("/home")}
               
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>

        <img
          alt="Student"
          src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>
    </main>
  )
}

export default Landing
