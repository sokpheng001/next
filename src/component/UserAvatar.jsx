import React from "react";
import Image from "next/image";

export default function Avatar({avatar,name,id}) {
  return (
    <a href={`/user/${id}`} className="" title={name}>
      <img
        class="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={
          avatar
            ? avatar
            : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
        }
        alt="Bordered avatar"
      />
      <p className="text-center  text-white mt-1">
        {name ? name.substring(0, 5) + "..." : "Unknown"}
      </p>
    </a>
  );
}
