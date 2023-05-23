import Image from "next/image";
import React from "react";

export async function generateMetadata({ params }) {
  const get = await fetch(
    `https://api.escuelajs.co/api/v1/users/${params.id}`,
    {
      method: "GET",
    }
  ).catch((e) => {
    throw new Error(e);
  });
  if (get.ok) {
    // const json = await get.json();
    return {
      title: "Hey!, SoPi - Customer",
      description: "Shopping",
      keywords:'SokPheng',
      robots:'index',
      canonical:'google.com',
    };
  } else {
    throw new Error("Can not fetch data from resource");
  }
}

//

const getData = async (id) => {
  const get = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
    method: "GET",
    cache: "no-store",
  }).catch((e) => {
    throw new Error(e);
  });
  if (get.ok) {
    const json = await get.json();

    return json;
  } else {
    throw new Error("Can not fetch data from resource");
  }
};

export default async function User({ params }) {
  const user = await getData(params.id);
  return (
    <div className="flex justify-center bg-slate-700">
      <div className="my-2">
        <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
          <div class="rounded-xl overflow-hidden h-[140px] md:h-[262px]">
            <img
              src={user.avatar}
              class="hidden dark:block h-[140px] md:h-[262px] w-full rounded-xl"
              alt="avatar"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"></div>
        <div class="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"></div>
        {/* detail */}
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{"Customer: "+user.name}</h2>
            <p>New things brough me for new experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
