"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { images } from "../../next.config";

export default function NavigateCompunent() {
  const pathName = usePathname();
  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img
            src={
              "https://th.bing.com/th/id/R.7b54e87f9720a96a581a911855cc885b?rik=h210O9oTBBXW4A&riu=http%3a%2f%2fwww.ukas.co.uk%2fwp-content%2fuploads%2f2015%2f06%2fProducts.jpg&ehk=YP3dWBn6j7rptdUjf7ULNf9JRLftWhccCEISE3V1uS0%3d&risl=&pid=ImgRaw&r=0"
            }
            className="h-8 mr-3 object-contain  rounded-full"
            alt="Product store"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            IsTOCK
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="/"
                className={
                  pathName === "/"
                    ? "block py-2 pl-3 pr-4 text-white bg-yellow-400 rounded md:bg-transparent md:text-yellow-400 md:p-0 md:dark:text-yellow-400 dark:bg-yellow-400 md:dark:bg-transparent"
                    : "block py-2 pl-3 pr-4 text-white bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500 dark:bg-white-600 md:dark:bg-transparent"
                }
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                aria-disabled
                href="/product"
                className={
                  pathName === "/product"
                    ? "block py-2 pl-3 pr-4 text-white bg-yellow-400 rounded md:bg-transparent md:text-yellow-400 md:p-0 md:dark:text-yellow-400 dark:bg-yellow-400 md:dark:bg-transparent"
                    : "block py-2 pl-3 pr-4 text-white bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500 dark:bg-white-600 md:dark:bg-transparent"
                }
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/upload/file"
                className={
                  pathName === "/upload/file"
                    ? "block py-2 pl-3 pr-4 text-white bg-yellow-400 rounded md:bg-transparent md:text-yellow-400 md:p-0 md:dark:text-yellow-400 dark:bg-yellow-400 md:dark:bg-transparent"
                    : "block py-2 pl-3 pr-4 text-white bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500 dark:bg-white-600 md:dark:bg-transparent"
                }
              >
                Upload
              </a>
            </li>
            <li>
              <a
                href="/admin"
                className={
                  pathName === "/admin"
                    ? "block py-2 pl-3 pr-4 text-white bg-yellow-400 rounded md:bg-transparent md:text-yellow-400 md:p-0 md:dark:text-yellow-400 dark:bg-yellow-400 md:dark:bg-transparent"
                    : "block py-2 pl-3 pr-4 text-white bg-white-700 rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500 dark:bg-white-600 md:dark:bg-transparent"
                }
              >
                Admin
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
