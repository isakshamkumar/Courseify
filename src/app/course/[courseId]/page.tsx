// "use client"
//if we want to use generateMwtadera function we havr to rwnder this page serverside then but we cannot have onlclicks on out btns coz inclick is a client effect
//also put all this code in components, technicaly next js is correct

//also generate meta deta for all pages

import { Metadata } from "next";
import CourseDescription from "@/app/packages/ui/common/CoursePage/CourseDescription";
import SideBar from "@/app/packages/ui/common/CoursePage/SideBar";
import { getCourse } from "@/app/packages/lib/getCourse";
import { getCourses } from "@/app/packages/lib/getCourses";
import { Course } from "@prisma/client";
import { addJobs } from "@/app/packages/config/Producer";

type Params = {
  params: {
    courseId: string;
  };
};
// export async function generateStaticParams() {
//   const {courses}:Course[]=await getCourses()

//   return courses.map(course => ({
//       courseId: course.id.toString()
//   }))
// }
export async function generateMetadata({
  params: { courseId },
}: Params): Promise<Metadata> {
  const data = await getCourse(courseId);
  const course: Course = data.course;

  return {
    title: course.title,
    description: course.description,
  };
}

const CoursePage: React.FC<Params> = async ({ params: { courseId } }) => {
  const data = await getCourse(courseId);
  const course: Course = data.course;
  const itemsPerRow = 4;
  const numRows = Math.ceil(course?.whatYouWillLearn.length / itemsPerRow);
  return (
    <>
      {course && (
        <div className="container mx-auto px-32 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CourseDescription
              course={course}
              numRows={numRows}
              itemsPerRow={itemsPerRow}
            />

            <SideBar course={course} />
          
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePage;
