'use client'
import { useRouter } from "next/navigation";
import React from "react";

const Card = ({
  thumbnail,
  description,
  title,
  navigateTo
}: {
  thumbnail: string;
  description: string;
  title: string;
  navigateTo:string
}) => {
  const router= useRouter()
  return (
    <div className="w-full sm:w-1/2 md:w-[250px] lg:w-[300px]" >
      <article className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-transform transform hover:shadow-lg hover:scale-[1.01]">
        <img
          alt="Office"
          src={thumbnail}
          className="h-56 w-full object-cover hover:scale-[1.05]"
        />

        <div className="p-4 sm:p-6 flex-grow">
          <a href="#">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {description}
          </p>

          <button
          onClick={()=>router.push(navigateTo)}
           
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
          >
            {navigateTo.startsWith('/user/purchasedCourses')?'View Course': 'Find Out More'}
            
            <span
              aria-hidden="true"
              className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
            >
              &rarr;
            </span>
          </button>
        </div>
      </article>
    </div>
  );
};

export default Card;
