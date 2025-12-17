import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, fetchProductsSortBy, type Category, type Product } from "../store/productSlice";
import SkeletonLoader from "../components/shared-components/SkeletonLoader";
import ProductCard from "../components/shared-components/ProductCard";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "store/store";

function Home() {

  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [trendProducts, setTrendProducts] = useState<Product[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // get trend products from api
    dispatch(fetchProductsSortBy("rating")).then(res => {
      const data = res.payload as Product[];
      setTrendProducts(data);
    }).catch(err => console.error(err)).finally(() => setLoading(false));

    // get new products from api
    dispatch(fetchProductsSortBy("id")).then(res => {
      const data = res.payload as Product[];
      setNewProducts(data);
    }).catch(err => console.error(err)).finally(() => setLoading(false));

    // get categories from api
    dispatch(fetchCategories()).then(res => {
      setCategories(res.payload as Category[])
    }).catch(err => console.error(err))
  }, []);

  return (
    <React.Fragment>
      {/* Hero Section*/}
      <section className="w-full @container">
        <div className="grid grid-cols-1 lg:grid-cols-2 flex flex-col gap-6 rounded-xl bg-gray-50 p-6 @[864px]:flex-row @[864px]:items-center">
          <div className="flex flex-col gap-6 text-left @[864px]:w-1/2 @[864px]:justify-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-gray-900 text-4xl font-black leading-tight tracking-tighter @[480px]:text-5xl">
                Elevate Your Style
              </h1>
              <p className="text-gray-600 text-base font-normal leading-normal @[480px]:text-lg">
                Discover our new collection of premium products designed to fit
                your lifestyle. Quality and comfort in every piece.
              </p>
            </div>
            <button className="flex min-w-[84px] max-w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-indigo-500 text-white text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <Link to="/products" className="truncate">
                Shop Now
              </Link>
            </button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
            data-alt="A stylish person wearing modern apparel in a minimalist setting"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkY0BfW4CVGs676s0mgGVFrGPSYLYVckG5Rqv8UxFiEsd5EoLygFNPj5kkOPqOVZbfxU_hYgSwINEp9YLN5oyj3XK9i7rmBQ76Oj3G3AqHirPB_7db-EI2igMaLIrDEpc1jfj8StubP9vd9IqxIoSw1HWIDtgVjYx26Ns_VMorhfMFPxPDfmoXSK138cr8t0t1N1xjTaSUdvK_D_48MnJcFm-u34fP-58cnunbltcT2NfvtLIEpF8sJx90N7DPPhDWGZZyRZaM5_M')",
            }}
          ></div>
        </div>
      </section>
      {/* Chips Section*/}
      <section className="mt-12">
        <div className="flex gap-3 overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden pb-2">
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-indigo-500 px-5 text-white">
            <p className="text-sm font-medium leading-normal">All</p>
          </button>
          {categories.map((item, index) => {
            return (
              <div key={index}>
                <button className="min-w-[124px] flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 px-5 text-gray-800 hover:bg-gray-200">
                  <p className="text-sm font-medium leading-normal capitalize">
                    <Link to={`products/${item.slug}`}>{item.name}</Link>
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </section>
      {/* Trending Section*/}
      <section className="mt-12">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight">Trending Now</h2>
          <a className="text-sm font-medium text-primary hover:underline" href="/products">View All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendProducts.slice(0, 4).map((item) => {
            return (
              <div key={item.id}>
                <ProductCard product={item}></ProductCard>
              </div>
            );
          })}
          {isLoading && (<SkeletonLoader keyValue={"trending"} count={4} />)}
        </div>
      </section>
      {/* New Arrivals Section */}
      <section className="mt-12">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight">New Arrivals</h2>
          <a className="text-sm font-medium text-primary hover:underline" href="/products">View All</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newProducts.slice(0, 4).map((item) => {
            return (
              <div key={item.id}>
                <ProductCard product={item}></ProductCard>
              </div>
            );
          })}
          {isLoading && (<SkeletonLoader keyValue={"newsArrivals"} count={4} />)}
        </div>
      </section>
    </React.Fragment>
  );
}

export default Home;
