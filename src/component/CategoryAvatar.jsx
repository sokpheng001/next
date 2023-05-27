'use client'

import React from "react";

const al = ()=>{
  alert("This point is over the development");
}

export default function Categoryimg({ name, img, id }) {
  return (
    <a href={``}  onClick={al} className="" title={name}>
      <img
        class="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={
          img
            ? img
            : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
        }
        alt="Bordered img"
      />
      <div class="badge badge-ghost mt-2">
        {name ? name.substring(0, 5) + "..." : "Unknown"}
      </div>
    </a>
  );
}
