import Avatar from "@/component/UserAvatar";
import Card from "@/component/Card";
import CategoryAvatar from "@/component/CategoryAvatar";

// get product from api
export const getDataProduct = async () => {
  const get = await fetch(
    `https://api.escuelajs.co/api/v1/products?limit=20&offset=0`,
    {
      method: "GET",
      // cache:'no-store'
    next:{revalidate:0}
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

// get user from api
export const getUser = async () => {
  const get = await fetch(`https://api.escuelajs.co/api/v1/users?limit=8`, {
    method: "GET",
    // cache:"no-store"
    next: { revalidate: 0 },
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

// className="flex min-h-screen flex-row items-center justify-between p-24"
// flex sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4

export default async function Home() {
  const product = await getDataProduct();
  const user = await getUser();
  return (
    <div className="flex justify-center bg-slate-700">
      <main className="my-5">
        {/* Carousel */}
        {/* .. */}
        {/* avatar user */}
        <p className="mb-3 text-lg text-gray-900 dark:text-white font-semibold">
          Top Customers
        </p>
        <div className="mb-2 flex">
          {user.map((u, index) =>
            index < 4 ? (
              index >= 1 ? (
                <div className="mx-2">
                  <Avatar avatar={u.avatar} name={u.name} id={u.id} />
                </div>
              ) : (
                <div className="mr-2">
                  <Avatar avatar={u.avatar} name={u.name} id={u.id} />
                </div>
              )
            ) : null
          )}
        </div>
        {/* see more */}
        {/* The button to open modal */}
        <label htmlFor="my-modal-3" className="mt-2">
          <div className="tabs bg-inherit">
            <a className="tab tab-xs tab-lifted tab-active">See More...</a>
          </div>
        </label>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <p className="mb-3 text-lg text-gray-900 dark:text-white font-semibold">
              Top Customers
            </p>
            <div className="mb-2 flex">
              {user.map((u, index) =>
                index >= 1 ? (
                  <div className="mx-2" key={index}>
                    <Avatar avatar={u.avatar} name={u.name} id={u.id} />
                  </div>
                ) : (
                  <div className="mr-2" key={index}>
                    <Avatar avatar={u.avatar} name={u.name} id={u.id} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/* category */}
        <p className="mt-5 mb-3 text-lg text-gray-900 dark:text-white font-semibold">
          Top Categories
        </p>
        <div className="mb-2 flex">
          {product.map((p, index) =>
            index < 4 ? (
              index >= 1 ? (
                <div className="mx-2" key={index + 1}>
                  <CategoryAvatar
                    name={p.category.name}
                    img={p.category.image}
                    id={p.id}
                  />
                </div>
              ) : (
                <div className="mr-2" key={index + 1}>
                  <CategoryAvatar
                    name={p.category.name}
                    img={p.category.image}
                    id={p.id}
                  />
                </div>
              )
            ) : null
          )}
        </div>
        {/* see more */}
        {/* The button to open modal */}
        <label htmlFor="my-modal-2" className="mt-2">
          <div className="tabs bg-inherit">
            <a className="tab tab-xs tab-lifted tab-active">See More...</a>
          </div>
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-2" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-2"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <p className="mb-3 text-lg text-gray-900 dark:text-white font-semibold">
              Top Categories
            </p>
            <div className="mb-2 flex">
              {product.map((p, index) =>
                index >= 4 ? (
                  <div className="mx-2" key={index}>
                    <CategoryAvatar
                      name={p.category.name}
                      img={p.category.image}
                      id={p.id}
                    />
                  </div>
                ) : (
                  <div className="mr-2" key={index}>
                    <CategoryAvatar
                      name={p.category.name}
                      img={p.category.image}
                      id={p.id}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/* Product card */}
        <p className="mt-5 mb-3 text-lg text-gray-900 dark:text-white font-semibold">
          Top Products
        </p>
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
      </main>
    </div>
  );
}

// //carousel function
// export async function Carousel() {
//   const photo = await getDataProduct();
//   return (
//     <div>
//       <div className="carousel w-full">
//         <div id="slide1" className="carousel-item relative w-full">
//           {photo.map((e, index) =>
//             index < 1 ? (
//               <div key={index}>
//                 <img
//                   src={e.category.image}
//                   className="w-full"
//                   alt="image category"
//                 />
//               </div>
//             ) : null
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
