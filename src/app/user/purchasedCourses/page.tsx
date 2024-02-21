import React from "react";

import Filters from "@/app/packages/ui/common/Filters";
import { userPurchasedCourses } from "@/app/packages/lib/getPurchasedCourses";
import PurchasedCourses from "@/app/packages/ui/users/components/PurchasedCourses";

const PurchasedCoursesPage = async () => {
  return (
    <>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Your Purchased Courses
      </h2>

      <div className="max-w-[300px]">
        <Filters />
      </div>
      <PurchasedCourses />
    </>
  );
};

export default PurchasedCoursesPage;
