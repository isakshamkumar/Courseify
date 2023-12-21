import React from 'react'

const HomePageSmallFilter:React.FC = () => {
  return (
    <div className="mt-8 block lg:hidden">
    <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
      <span className="text-sm font-medium"> Filters & Sorting </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4 rtl:rotate-180"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  </div>
  )
}

export default HomePageSmallFilter
