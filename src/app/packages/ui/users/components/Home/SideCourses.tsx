import Link from 'next/link'
import React from 'react'

const SideCourses:React.FC<{courses:any}> = async({courses}) => {
  const featuredCourses=await courses
  const featured= featuredCourses.courses.map((course:any,index:number)=>{
    if(index===0 || index===1 || index===2){
      return course 

    }
  }
  )
  console.log(featured,'featuredddddd');
  
  return (
    <div className="lg:col-span-3 ml-12">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                  featured.map((course:any,index:number)=>course&& <li key={index} >
                  <Link href="#" className="group block overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[360px] sm:h-[300px]"
                    />

                    <div className="relative bg-white pt-3">
                      <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                       {course.title}
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-gray-900">
                          {" "}
                         ${course.price}{" "}
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>)
                }
               

              </ul>
            </div>
  )
}

export default SideCourses
