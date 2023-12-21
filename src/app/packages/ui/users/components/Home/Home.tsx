"use client"; //this page should not be use client
/**Server-Side Rendering (SSR): Since this is an unauthenticated home page that likely needs to display up-to-date course information, using SSR would be beneficial. SSR will render the page on the server each time it’s requested, which is great for SEO and ensures that users always see the most recent course listings. */

import React, { Suspense, useState } from "react";

import Pagination from "../../../common/Pagination";
import Filters from "../../../common/Filters";
import SideCourses from "./SideCourses";
import HomePageSmallFilter from "./HomePageSmallFilter";
import Input from "../../../common/Input";
import CourseList from "../../../common/CourseList";
import { getCourses } from "@/app/packages/lib/getCourses";
import Spinner from "../../../common/Spinner";

const Home = async () => {
 
  const [pageNumber, setPageNumber] = useState(1);
  console.log(pageNumber, "from home");

  const products = getCourses();
 

  return (
    <main>
      <section className="flex justify-between">
        <div className="mx-auto max-w-screen-xl py-8 sm:px-6 sm:py-12 ">
          <header>
            <h2 className="text-xl text-center font-light text-gray-900 sm:text-3xl">
              Featured Courses
            </h2>

            <p className="mt-4   text-gray-500 text-center">
              Browse Through a list of vast range of courses.
            </p>
          </header>

          <HomePageSmallFilter />

          <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
            <Filters />

            <SideCourses />
          </div>
        </div>
      </section>
      <section>
        <Suspense fallback={<div className="h-full flex flex-col gap-2 items-center justify-center">Loading Courses...<Spinner/></div>}>
        <Input text="Search Courses" />
          <CourseList products={products} pageNumber={pageNumber} />

          <Pagination
            products={products}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </Suspense>
      </section>
    </main>
  );
};

export default Home;
