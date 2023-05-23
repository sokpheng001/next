import PlaceHolderCard from "@/component/PlaceHolderCard";
import React from "react";
import AvatarPlaceHolder from "@/component/AvatarPlaceHolder";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default async function Loading() {
  return (
    <div className="flex justify-center bg-slate-700">
      <main className="my-5">
        {/* avatar user */}
        <div class="h-2 w-16 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
        <div className="flex sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
          {array.map((u,key) =>
            key < 4 ? (
              <div className="mx-2" key={key+1}>
                <AvatarPlaceHolder/>
              </div>
            ) : null
          )}
        </div>
        {/* category user */}
        {/* avatar user */}
        <div class="mt-3 h-2 w-24 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
        <div className="flex sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
          {array.map((u, index) =>
            index < 4 ? (
              <div className="mx-2" key={index}>
                <AvatarPlaceHolder/>
              </div>
            ) : null
          )}
        </div>
        {/* card placeholder */}
        <div class="mt-3 h-2 w-28 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 my-3">
          {array.map((e,index) => (
            <PlaceHolderCard key={index+1}/>
          ))}
        </div>
      </main>
    </div>
  );
}
