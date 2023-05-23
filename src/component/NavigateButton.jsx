
'use client'

import { usePathname } from 'next/navigation';
import React from 'react'

export default function NavigateButton() {
    const path = usePathname();
    if(path.includes('upload')) return null;
  return (
    <div data-dial-init class="fixed right-6 bottom-6 group">
      <button
        title="Upload"
        type="button"
        data-dial-toggle="speed-dial-menu-default"
        aria-controls="speed-dial-menu-default"
        aria-expanded="false"
        class="flex items-center justify-center text-white rounded-full w-14 h-14 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
      >
        <a href="/upload/file">
          <svg
            aria-hidden="true"
            class="w-8 h-8 transition-transform "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span class="sr-only">Open actions menu</span>
        </a>
      </button>
    </div>
  );
}
