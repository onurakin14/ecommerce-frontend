import React, { useEffect, useState } from "react";

function Home() {

    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => { console.log(data); setProducts(data) });
    }, []);

    return (
        <React.Fragment>
            <div className="font-display bg-background-light dark:bg-background-dark">
                <main className="flex flex-1 justify-center py-5 sm:py-8 lg:py-12">
                    <div className="layout-content-container flex flex-col max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
                        {/* Hero Section*/}
                        <section className="w-full @container">
                            <div className="flex flex-col gap-6 rounded-xl bg-gray-50 dark:bg-gray-900 p-6 @[864px]:flex-row @[864px]:items-center">
                                <div className="flex flex-col gap-6 text-left @[864px]:w-1/2 @[864px]:justify-center">
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-tighter @[480px]:text-5xl">Elevate Your Style</h1>
                                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal @[480px]:text-lg">Discover our new collection of premium products designed to fit your lifestyle. Quality and comfort in every piece.</p>
                                    </div>
                                    <button className="flex min-w-[84px] max-w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                                        <span className="truncate">Shop Now</span>
                                    </button>
                                </div>
                                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl @[864px]:w-1/2" data-alt="A stylish person wearing modern apparel in a minimalist setting" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkY0BfW4CVGs676s0mgGVFrGPSYLYVckG5Rqv8UxFiEsd5EoLygFNPj5kkOPqOVZbfxU_hYgSwINEp9YLN5oyj3XK9i7rmBQ76Oj3G3AqHirPB_7db-EI2igMaLIrDEpc1jfj8StubP9vd9IqxIoSw1HWIDtgVjYx26Ns_VMorhfMFPxPDfmoXSK138cr8t0t1N1xjTaSUdvK_D_48MnJcFm-u34fP-58cnunbltcT2NfvtLIEpF8sJx90N7DPPhDWGZZyRZaM5_M')" }}></div>
                            </div>
                        </section>
                        {/* Chips Section*/}
                        <section className="mt-12">
                            <div className="flex gap-3 overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden pb-2">
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-5 text-white">
                                    <p className="text-sm font-medium leading-normal">All</p>
                                </button>
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 px-5 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <p className="text-sm font-medium leading-normal">Electronics</p>
                                </button>
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 px-5 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <p className="text-sm font-medium leading-normal">Apparel</p>
                                </button>
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 px-5 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <p className="text-sm font-medium leading-normal">Home Goods</p>
                                </button>
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 px-5 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <p className="text-sm font-medium leading-normal">Accessories</p>
                                </button>
                                <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-gray-800 px-5 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <p className="text-sm font-medium leading-normal">Books</p>
                                </button>
                            </div>
                        </section>
                        {/* Trending Section*/}
                        <section className="mt-12">
                            <div className="flex items-center justify-between pb-4">
                                <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">Trending Now</h2>
                                <a className="text-sm font-medium text-primary hover:underline" href="#">View All</a>
                            </div>
                            <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden -mx-4">
                                <div className="flex items-stretch p-4 gap-6">
                                    <div className="group flex h-full w-72 flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle transition-shadow duration-300 hover:shadow-hover">
                                        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl" data-alt="High-fidelity wireless headphones in black" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEHYQW88o6IaoUt8qChPOKPUVqWSyfUe4lcI1u1CkAZTbVt_knZzibCr4kC5C4-mw2oQQq2rJP5yIKNGAVCGa66Kjkwm1xoV0g3s2QnVDnUD_FjvbRIhXOGGpvksgpMm72TbSJ-KEMF-hnN9wMGyGBT8CrQJwCzG8wnDcHhpoECzwTFENRF403pAx5MbmiSepbtpgHahXFABh8c44Pv33oaSL5iIY_SCXhAmaZUMOjLqlZMDt9JmmjZL-CF3Lxh1yNaUsWtj-L63I')" }}></div>
                                        <div className="flex flex-col flex-1 justify-between p-4 gap-4">
                                            <div>
                                                <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal">Wireless Headphones</p>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal mt-1">$199.99</p>
                                                <div className="flex items-center mt-2 gap-0.5">
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                </div>
                                            </div>
                                            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">
                                                <span className="truncate">Add to Cart</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="group flex h-full w-72 flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle transition-shadow duration-300 hover:shadow-hover">
                                        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl" data-alt="A classNameic analog timepiece with a leather strap" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8voDjmyHwUzpxf0URJ0TC2yaQCjIXrbUDfzTV4kFrgwLCC9Eykyhxgf-nShj4sxZ2KZzcizvTHiwLAtBE1KT91WiZqt63QNvJ9sPQ8-8ssYVkotZywHOjGGbdQp6NgTN4vp6VB04gbwK9jkquQaTd3JuCaTUbPf3SxmGlsgA3EDTb5W59PEiVPxxDMo6kxMNidvp1GXaN6TGs3SmncLtw1aL7HGAlF3LLaXSAS85_KqkU17tjdhTl_ctT7H1JuhE_QLt2DZXPyqE')" }}></div>
                                        <div className="flex flex-col flex-1 justify-between p-4 gap-4">
                                            <div>
                                                <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal">classNameic Timepiece</p>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal mt-1">$249.00</p>
                                                <div className="flex items-center mt-2 gap-0.5">
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                </div>
                                            </div>
                                            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">
                                                <span className="truncate">Add to Cart</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="group flex h-full w-72 flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle transition-shadow duration-300 hover:shadow-hover">
                                        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl" data-alt="A minimalist white ceramic vase" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1TjKw121_Nj_B6Kbk9NMP2TNYE9N1zzwc6TWkhwiI0A8oZXUQc-f3IZ5VNzXN8eUbiOzadeq5OS1dlb83kkIZ3bgchZRWYBPBjYtELa1NPWe3bkIth4b-k8NcCIW73CRTrEoV7EQcF219CGI0ozT669HddM4ts5VE83UrbVaLuY26P0YWTYwy8iLg7Kwr6hsFfBKlHmeeN4wszrBXz8UvkJe7JvVoGKW_qeMTRKTnUYk5fthUseGq7vpZhtGEVxpvoOl88TJx_aw')" }}></div>
                                        <div className="flex flex-col flex-1 justify-between p-4 gap-4">
                                            <div>
                                                <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal">Ceramic Vase</p>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal mt-1">$75.50</p>
                                                <div className="flex items-center mt-2 gap-0.5">
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                                </div>
                                            </div>
                                            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">
                                                <span className="truncate">Add to Cart</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="group flex h-full w-72 flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle transition-shadow duration-300 hover:shadow-hover">
                                        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl" data-alt="A premium brown leather backpack" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYjvBD4DuIyXvjBSl5OsB0-txE6vLQ9J7CqxWPi8EZR1ONnLS3V4-wn1kFeCdbfyjGtaMW7kotI2kpRWDxR0x0u6fmKNdIKUt2c0k22dIshiXZPl9Ci9SjqbhNt-0uAqg9D0zL3Azw3a80tGOozuDXoofoLMRAaDTHCdMjbh_HVXr5X4PAuTC2DCKkfEn2srAanL9XHoWFBTNOdkMVk-PI54HpouEtuFvcUyV0K_yXH7wzA0W7BgYs1BQ_Sj03WXxxSqiOx3rhRB4')" }}></div>
                                        <div className="flex flex-col flex-1 justify-between p-4 gap-4">
                                            <div>
                                                <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal">Leather Backpack</p>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal mt-1">$150.00</p>
                                                <div className="flex items-center mt-2 gap-0.5">
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                </div>
                                            </div>
                                            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">
                                                <span className="truncate">Add to Cart</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* New Arrivals Section */}
                        <section className="mt-12">
                            <div className="flex items-center justify-between pb-4">
                                <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">New Arrivals</h2>
                                <a className="text-sm font-medium text-primary hover:underline" href="#">View All</a>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {/* Product Card 1 */}
                                <div className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle transition-shadow duration-300 hover:shadow-hover">
                                    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl" data-alt="Modern ergonomic office chair" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtEIJs5be5LR7yHBR6MFv16tnLlBLrPzkoGUSas9M_nYWbCWJUH89fu4-QfnA74mKlevlRv-4alKQ1WO_ANPPdLdU3i5CRR5W9FDwWPOrmjLVGw8CmsF1C6rUgqduQDYHKXuh0-aa4uvTdz2r9ujrlxYzkHmuKOsqVbw_zkcfl2ufidyzBF7LwGl8aukNCgVV8AFlormrOBHu3Krl3JRNh0Azxn9NEgOLh3G0SycBYBna9MshCvamJJuV1x4p1aPOdSIxQ83XAk4c')" }}></div>
                                    <div className="flex flex-col flex-1 justify-between p-4 gap-4">
                                        <div>
                                            <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal">Ergonomic Chair</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal mt-1">$350.00</p>
                                            <div className="flex items-center mt-2 gap-0.5">
                                                <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                            </div>
                                        </div>
                                        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">Add to Cart</button>
                                    </div>
                                </div>
                                {/* Skeleton Loader */}
                                <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle animate-pulse">
                                    <div className="w-full aspect-square rounded-t-xl bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="p-4 space-y-4">
                                        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                                    </div>
                                </div>
                                {/* Product Card 3 */}
                                <div className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle transition-shadow duration-300 hover:shadow-hover">
                                    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-t-xl" data-alt="A sleek, modern portable bluetooth speaker" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxnfUNzJp2QWX2dIG2S4fVBTfFotTRD8_aGiVqEv9baN3aBwEt5NuJuAkJj8zJYJgyIHT46HPpHYrQIeLes7s5Mm8rhb8VQqSJylm6Q0N6gIog4wOBPDUH49c7dQKyno0C6GuzsjSMuYnsO5Qv2-I7iwlMMXjAdMPmexJ3DyDE6i1DNQK6jisK0ABqbyPv-_KQWlUYPJRfju91gPQtZxX6KLlALNbgqbnIfUK4mMosKNbZaHWgZnV8vrKFne_da9J4nCGKhhJqWyY')" }}></div>
                                    <div className="flex flex-col flex-1 justify-between p-4 gap-4">
                                        <div>
                                            <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal">Portable Speaker</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal mt-1">$89.99</p>
                                            <div className="flex items-center mt-2 gap-0.5">
                                                <span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span className="material-symbols-outlined text-yellow-500 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span className="material-symbols-outlined text-gray-300 dark:text-gray-600 !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            </div>
                                        </div>
                                        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">Add to Cart</button>
                                    </div>
                                </div>
                                {/* Skeleton Loader */}
                                <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-gray-900 shadow-subtle animate-pulse">
                                    <div className="w-full aspect-square rounded-t-xl bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="p-4 space-y-4">
                                        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                {products.map((item) => {
                    return (
                        <div key={item.id}>
                            <p> {item.title} </p>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default Home;