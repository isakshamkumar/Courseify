import React, { useState } from "react";
// import { prod } from "../users/components/Home";

const Pagination = ({
  products,
  pageNumber,
  setPageNumber,
}: {
  products: any[];
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) => {
  console.log(pageNumber, "from pagin");
  console.log(typeof pageNumber);

  //ONCLICK WINDOW POSITION SHIFT UP
  const handlePrev = () => {
    window.scrollTo({
      top: 500,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
    if (pageNumber > 1) {
      // setselected(pageNumber - 1);
      // setProducts((prevProducts) => products.slice());
      setPageNumber(pageNumber - 1);
    } else {
      return;
    }
  };
  const handleNext = () => {
    window.scrollTo({
      top: 500,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
    if (pageNumber < products.length / 6) {
      // setselected(pageNumber + 1);
      setPageNumber(pageNumber + 1);
    } else {
      return;
    }
  };
  // alert(selected);
  // console.log(Array(products.length / 6));  //empty array but lenght is 5

  return (
    <ol className="flex my-5 justify-center gap-4 text-xs font-semibold">
      <li>
        <button
          onClick={handlePrev}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      {[...Array(Math.ceil(products.length / 6))].map((ele, index) => (
        <li>
          <button
            onClick={() => {
              setPageNumber(index + 1);
              window.scrollTo({
                top: 610,
                behavior: "smooth", // You can use 'auto' for instant scrolling
              });
            }}
            className={`block h-10 w-10 rounded border border-gray-100  text-center leading-8 text-gray-900 ${
              index + 1 === pageNumber ? "bg-green-400" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        </li>
      ))}

      <li>
        <button
          onClick={handleNext}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  );
};

export default Pagination;
