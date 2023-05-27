import React from "react";
import PlaceHolderCard from "@/component/PlaceHolderCard";


const array = [1,2,3,4,5,6,7,8,9,10];

export default function Loading() {
  return (
    <div className="flex justify-center bg-slate-700">
      {/* card placeholder */}
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 my-3">
        {array.map((e, index) => (
          <PlaceHolderCard key={index + 1} />
        ))}
      </div>
    </div>
  );
}
