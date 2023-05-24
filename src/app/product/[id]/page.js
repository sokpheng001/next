import React from 'react'

export async function generateMetadata({ params }) {
  const get = await fetch(
    `https://api.escuelajs.co/api/v1/products/${params.id}`,
    {
      method: "GET",
    }
  ).catch((e) => {
    throw new Error(e);
  });
  if (get.ok) {
    const json = await get.json();
    return {
      title: "Hey!, SoPi - Product Details",
      description: json.description
    };
  } else {
    throw new Error("Can not fetch data from resource");
  }
}
//get data from api of product

const getData = async (id) => {
  const get = await fetch(
    `https://api.escuelajs.co/api/v1/products/${id}`,
    {
      method: "GET",
    }
  ).catch((e) => {
    throw new Error(e);
  });
  if (get.ok) {
    const json = await get.json();

    return json;
  } else {
    throw new Error("Can not fetch data from resource");
  }
};


export default async function Product({params}) {
const data = await getData(params.id);
  return (
    <div className="flex justify-center bg-slate-700">
      <div className="card lg:card-side bg-base-100 shadow-xl w-11/12 my-3 mb-3">
        <figure>
          <img src={data.images[0]} alt="Album" />
        </figure>
        <div className="card-body">
          <div className="flex">
            <div className="card badge badge-outline">${data.price}</div>
            <div className="card badge badge-outline mx-3">{data.category.name}</div>
          </div>
          <h2 className="card-title">{data.title}</h2>
          <p>{data.description}</p>
          <div className="card-actions justify-end">
            <button className="btn" type="submit">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
