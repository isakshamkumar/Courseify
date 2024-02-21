import React from 'react'

const Filters:React.FC = () => {
  return (
    <div className="hidden space-y-5 lg:block  ">
    <div>
      <p className="block text-xs font-medium text-gray-700">
        Filters
      </p>

      <div className="mt-1 space-y-2">
        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Rating </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                {" "}
                0 Selected{" "}
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-4">
              <li>
                <label
                  htmlFor="FilterInStock"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterInStock"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    (4+)
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterPreOrder"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterPreOrder"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    (3+)
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterOutOfStock"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterOutOfStock"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    (1+)
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </details>

        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
            <span className="text-sm font-medium"> Price </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                The highest price is $600
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
              >
                Reset
              </button>
            </header>

            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between gap-4">
                <label
                  htmlFor="FilterPriceFrom"
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-gray-600">$</span>

                  <input
                    type="number"
                    id="FilterPriceFrom"
                    placeholder="From"
                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>

                <label
                  htmlFor="FilterPriceTo"
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-gray-600">$</span>

                  <input
                    type="number"
                    id="FilterPriceTo"
                    placeholder="To"
                    className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </label>
              </div>
            </div>
          </div>
        </details>

        <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
            <span className="text-sm font-medium">
              Most Searched Tags{" "}
            </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4">
              <span className="text-sm text-gray-700">
                {" "}
                0 Selected{" "}
              </span>

              <button
                type="button"
                className="text-sm text-gray-900 underline underline-offset-4"
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-4">
              <li>
                <label
                  htmlFor="FilterRed"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterRed"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Javascript
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterBlue"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterBlue"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Nodejs
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterGreen"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterGreen"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Marketing
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterOrange"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterOrange"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Figma
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterPurple"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterPurple"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    After Effects
                  </span>
                </label>
              </li>

              <li>
                <label
                  htmlFor="FilterTeal"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="FilterTeal"
                    className="h-5 w-5 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Canva
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  </div>
  )
}

export default Filters
