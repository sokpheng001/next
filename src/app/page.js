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

        {/* Card */}
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
              category={e.category.name}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

// Banner for home page
export function Banner() {
  return (
    <section class="-my-20 bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          We invest in the world’s potential
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get started
            <svg
              aria-hidden="true"
              class="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}

//carousel function
export async function Carousel() {
  const photo = await getDataProduct();
  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          {photo.map((e, index) =>
            index < 1 ? (
              <div key={index}>
                <img
                  src={e.category.image}
                  className="w-full"
                  alt="image category"
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
