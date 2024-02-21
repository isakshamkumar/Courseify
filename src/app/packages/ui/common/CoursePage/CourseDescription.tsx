import React from "react";
interface CourseDescriptionProps {
  course: any;
  numRows: number;
  itemsPerRow: number;
}
const CourseDescription: React.FC<CourseDescriptionProps> = ({
  course,
  numRows,
  itemsPerRow,
}) => {
  return (
    <div className="col-span-2">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div className="flex items-center mb-4">
        <span className="text-lg text-yellow-400 mr-2">
          {course.rating.rating}
        </span>
        <span className="text-sm text-gray-500 mr-4">
          ({course.rating.count} ratings)
        </span>
        <span className="text-lg text-green-500 font-bold">
          ${course.price}
        </span>
      </div>
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-lg text-gray-700 mb-4">{course.description}</p>

      {/* What you will learn section */}
      <div className="mb-4 p-4 border border-gray-300 rounded">
        <h2 className="text-xl font-semibold mb-2">What you will learn</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {Array.from({ length: numRows }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 gap-2">
              {course.whatYouWillLearn
                .slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
                .map((point: any, index: any) => (
                  <div key={index} className="text-gray-600">
                    {point}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
