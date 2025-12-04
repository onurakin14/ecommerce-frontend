import React, { useEffect, useState } from "react";
import type { Product } from "./Product";
import RatingStars from "./components/RatingStars";
import SkeletonLoader from "./components/SkeletonLoader";

function Home() {

    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProducts(data);
                setCategories(Array.from(new Set(data.map((item: Product) => item.category))));
            })
            .then(_ => setLoading(false))
            .catch(err => console.error(err));
    }, []);

    return (
        <React.Fragment>
            <div className="font-display bg-background-light dark:bg-background-dark">
                <main className="flex flex-1 justify-center py-5 sm:py-8 lg:py-12">
                    <div className="layout-content-container flex flex-col max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
                        {/* Hero Section*/}
                        <section className="w-full @container">
                            <div className="grid grid-cols-1 lg:grid-cols-2 flex flex-col gap-6 rounded-xl bg-gray-50 dark:bg-gray-900 p-6 @[864px]:flex-row @[864px]:items-center">
                                <div className="flex flex-col gap-6 text-left @[864px]:w-1/2 @[864px]:justify-center">
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-tighter @[480px]:text-5xl">Elevate Your Style</h1>
                                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal @[480px]:text-lg">Discover our new collection of premium products designed to fit your lifestyle. Quality and comfort in every piece.</p>
                                    </div>
                                    <button className="flex min-w-[84px] max-w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white text-dark text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                                        <span className="truncate">Shop Now</span>
                                    </button>
                                </div>
                                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl" data-alt="A stylish person wearing modern apparel in a minimalist setting" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkY0BfW4CVGs676s0mgGVFrGPSYLYVckG5Rqv8UxFiEsd5EoLygFNPj5kkOPqOVZbfxU_hYgSwINEp9YLN5oyj3XK9i7rmBQ76Oj3G3AqHirPB_7db-EI2igMaLIrDEpc1jfj8StubP9vd9IqxIoSw1HWIDtgVjYx26Ns_VMorhfMFPxPDfmoXSK138cr8t0t1N1xjTaSUdvK_D_48MnJcFm-u34fP-58cnunbltcT2NfvtLIEpF8sJx90N7DPPhDWGZZyRZaM5_M')" }}></div>
                            </div>
                        </section>
                        {/* Chips Section*/}
                        <section className="mt-12">
                            <div className="flex gap-3 overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden pb-2">
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-blue-500 px-5 text-white">
                                    <p className="text-sm font-medium leading-normal">All</p>
                                </button>
                                {categories.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 px-5 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                                                <p className="text-sm font-medium leading-normal capitalize">{item}</p>
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                        {/* Trending Section*/}
                        <section className="mt-12">
                            <div className="flex items-center justify-between pb-4">
                                <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight">Trending Now</h2>
                                <a className="text-sm font-medium text-primary hover:underline" href="#">View All</a>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                <div className="flex items-stretch p-4 gap-6">
                                    {products.slice(0, 4).map((item) => {
                                        return (
                                            <div key={item.id}>
                                                <div className="group flex h-full w-72 flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle transition-shadow duration-300 hover:shadow-hover">
                                                    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl" data-alt="High-fidelity wireless headphones in black" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                    <div className="flex flex-col flex-1 justify-between p-4 gap-4">
                                                        <div>
                                                            <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal"> {item.title} </p>
                                                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal mt-1">${item.price}</p>
                                                            <div className="flex items-center mt-2 gap-0.5">
                                                                <RatingStars id={item.id} rate={item.rating.rate}></RatingStars>
                                                            </div>
                                                        </div>
                                                        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">
                                                            <span className="truncate">Add to Cart</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {isLoading && <SkeletonLoader keyValue={"trending"} count={4}></SkeletonLoader>}
                                </div>
                            </div>
                        </section>
                        {/* New Arrivals Section */}
                        <section className="mt-12">
                            <div className="flex items-center justify-between pb-4">
                                <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight">New Arrivals</h2>
                                <a className="text-sm font-medium text-primary hover:underline" href="#">View All</a>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.slice(4, 8).map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <div className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle transition-shadow duration-300 hover:shadow-hover">
                                                <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl" data-alt="Modern ergonomic office chair" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                <div className="flex flex-col flex-1 justify-between p-4 gap-4">
                                                    <div>
                                                        <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal"> {item.title} </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal mt-1">${item.price}</p>
                                                        <div className="flex items-center mt-2 gap-0.5">
                                                            <RatingStars id={item.id} rate={item.rating.rate}></RatingStars>
                                                        </div>
                                                    </div>
                                                    <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {isLoading && <SkeletonLoader keyValue={"newsArrivals"} count={4}></SkeletonLoader>}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}

export default Home;