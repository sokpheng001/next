import React from 'react'
import Card from '@/component/Card';


export const metadata = {
  title:"Product - IsTock",
  description:"List of all products",
  author:"ISTAD",
  keywords:"Production",
}


export const getDataProduct = async () => {
  const get = await fetch(
    `https://api.escuelajs.co/api/v1/products?limit=20&offset=0`,
    {
      method: "GET",
      // cache:'no-store'
      next: { revalidate: 0 },
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

export default async function Product() {
  const product = await getDataProduct();
  return (
    <div className='flex justify-center bg-slate-700'>
    <div className="grid gap-x-4 gap-y-4 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 my-3">
      {product.map((e, index) => (
        <Card
          key={index}
          img={e.images}
          title={e.title}
          price={e.price}
          id={e.id}
          categoryID={e.category.id}
          category={e.category.name}
        />
      ))}
    </div>
    </div>
  );
}
