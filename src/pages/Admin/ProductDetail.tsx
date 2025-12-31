import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Product } from "store/productSlice";

function AdminProductDetail() {

    const location = useLocation();
    const [product, setProduct] = useState<Product>();

    useEffect(() => { setProduct(location.state.item) }, []);

    return (
        <React.Fragment>
            {/* <!-- Scrollable Content --> */}
            <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 lg:p-10">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                    {/* <!-- Breadcrumbs --> */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500">
                        <a className="hover:text-primary transition-colors" href="/admin">Dashboard</a>
                        <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
                        <a className="hover:text-primary transition-colors" href="/admin/products">Products</a>
                        <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-medium">Apple iPhone 15 Pro</span>
                    </nav>
                    {/* <!-- Page Heading & Actions (Mobile/Tablet View optimization) --> */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Apple iPhone 15 Pro</h1>
                            <p className="text-slate-500 text-sm">Manage product details, pricing and stock.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20 font-medium text-sm transition-colors">
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                <span>Delete</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 font-medium text-sm transition-all">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                <span>Edit Product</span>
                            </button>
                        </div>
                    </div>
                    {/* <!-- Main Grid Layout --> */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
                        {/* <!-- Left Column: Image Gallery --> */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            {/* <!-- Main Image Card --> */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-2 shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="aspect-square w-full rounded-lg bg-slate-50 dark:bg-slate-800 relative overflow-hidden group">
                                    <div className="w-full h-full bg-center bg-contain bg-no-repeat transition-transform duration-500 group-hover:scale-105" data-alt="Titanium finish smartphone back view" style={{ backgroundImage: `url("${product?.thumbnail}")` }}></div>
                                    <div className="absolute top-4 right-4">
                                        <button className="p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full hover:bg-white text-slate-600 dark:text-slate-200 transition-all">
                                            <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Thumbnails --> */}
                            <div className="grid grid-cols-4 gap-4">
                                {product?.images.map((item, index) => {
                                    return (
                                        <button key={index} className="aspect-square rounded-lg border-2 border-primary p-1 bg-white dark:bg-slate-900">
                                            <div className="w-full h-full rounded bg-slate-50 bg-center bg-cover" data-alt="Titanium finish smartphone back view thumbnail" style={{ backgroundImage: `url(${item})` }}></div>
                                        </button>
                                    )
                                })}
                                <button className="aspect-square rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined">add_photo_alternate</span>
                                </button>
                            </div>
                        </div>
                        {/* <!-- Right Column: Product Information --> */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            {/* <!-- Main Info Card --> */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-6">
                                {/* <!-- Header & Category --> */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">{product?.category}</span>
                                            <span className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                                                <span className="material-symbols-outlined fill text-[18px]">star</span>
                                                {product?.rating}
                                                <span className="text-slate-400 font-normal ml-1">({product?.reviews.length} reviews)</span>
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{product?.title}</h2>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        {product?.availabilityStatus}
                                    </div>
                                </div>
                                {/* <!-- Price Block --> */}
                                <div className="flex items-baseline gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">${product?.price}</span>
                                    <span className="text-lg text-slate-400 line-through">${product?.price}</span>
                                    <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold">-{product?.discountPercentage}%</span>
                                </div>
                                {/* <!-- Description --> */}
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-sm font-bold uppercase text-slate-900 dark:text-white tracking-wider">Description</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {product?.description}
                                    </p>
                                </div>
                                {/* <!-- Specs Grid --> */}
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-slate-500 uppercase">Brand</span>
                                        <span className="text-slate-900 dark:text-white font-medium">{product?.brand}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-slate-500 uppercase">Model Number</span>
                                        <span className="text-slate-900 dark:text-white font-medium">A2848</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-slate-500 uppercase">SKU</span>
                                        <span className="text-slate-900 dark:text-white font-medium">{product?.sku}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-slate-500 uppercase">Stock Quantity</span>
                                        <span className="text-slate-900 dark:text-white font-medium">{product?.stock} Units</span>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Variants / Options Card (Extra context for E-commerce) --> */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                                <h3 className="text-sm font-bold uppercase text-slate-900 dark:text-white tracking-wider mb-4">Product Variants</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#8f8f94] border border-slate-300 shadow-sm" title="Natural Titanium"></div>
                                            <span className="font-medium text-slate-900 dark:text-white">Natural Titanium</span>
                                        </div>
                                        <span className="text-sm text-slate-500">24 in stock</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#2f333a] border border-slate-300 shadow-sm" title="Black Titanium"></div>
                                            <span className="font-medium text-slate-900 dark:text-white">Black Titanium</span>
                                        </div>
                                        <span className="text-sm text-slate-500">12 in stock</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#414863] border border-slate-300 shadow-sm" title="Blue Titanium"></div>
                                            <span className="font-medium text-slate-900 dark:text-white">Blue Titanium</span>
                                        </div>
                                        <span className="text-sm text-slate-500">9 in stock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Footer area --> */}
                <div className="mt-12 mb-6 border-t border-slate-200 dark:border-slate-800 pt-6 flex justify-between items-center text-slate-500 text-sm">
                    <p>© 2024 Store Admin. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a className="hover:text-primary" href="#">Privacy Policy</a>
                        <a className="hover:text-primary" href="#">Terms of Service</a>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default AdminProductDetail;