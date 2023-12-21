import Link from 'next/link'
import React from 'react'

const SideCourses:React.FC = () => {
  return (
    <div className="lg:col-span-3">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <li>
                  <Link href="#" className="group block overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt=""
                      className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[360px] sm:h-[300px]"
                    />

                    <div className="relative bg-white pt-3">
                      <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        Basic Tee
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-gray-900">
                          {" "}
                          £24.00 GBP{" "}
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>

                <li>
                  <a href="#" className="group block overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt=""
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[360px] sm:h-[300px]"
                    />

                    <div className="relative bg-white pt-3">
                      <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        Basic Tee
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-gray-900">
                          {" "}
                          £24.00 GBP{" "}
                        </span>
                      </p>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#" className="group block overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt=""
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[360px] sm:h-[300px]"
                    />

                    <div className="relative bg-white pt-3">
                      <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        Basic Tee
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-gray-900">
                          {" "}
                          £24.00 GBP{" "}
                        </span>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
  )
}

export default SideCourses
