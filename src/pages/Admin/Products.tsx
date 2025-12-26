import React from "react";

function AdminProducts() {
    return (
        <React.Fragment>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth bg-gray-50">
                <div className="max-w-[1400px] mx-auto space-y-6">
                    {/* Page Heading */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Product Search</h1>
                            <p className="mt-1 text-sm text-slate-500">Search, filter and manage your entire product catalog.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-slate-200 transition-colors shadow-sm gap-2">
                                <span className="material-symbols-outlined text-[20px]">ios_share</span>
                                Export
                            </button>
                            <button className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-500-hover text-white text-sm font-bold shadow-sm transition-colors gap-2">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Add Product
                            </button>
                        </div>
                    </div>
                    {/* Advanced Filter Bar */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            {/* Search Input */}
                            <div className="md:col-span-12 lg:col-span-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Keyword</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </span>
                                    <input className="w-full h-10 pl-10 pr-3 rounded-lg border border-slate-200  bg-white  text-sm focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Search by name, SKU, or tag..." type="text" />
                                </div>
                            </div>
                            {/* Category Select */}
                            <div className="md:col-span-4 lg:col-span-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
                                <div className="relative">
                                    <select className="w-full h-10 pl-3 pr-8 appearance-none rounded-lg border border-slate-200  bg-white  text-sm focus:ring-2 focus:ring-primary focus:border-transparent text-slate-600 ">
                                        <option>All Categories</option>
                                        <option>Electronics</option>
                                        <option>Clothing</option>
                                        <option>Home &amp; Garden</option>
                                    </select>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                    </span>
                                </div>
                            </div>
                            {/* Price Range */}
                            <div className="md:col-span-4 lg:col-span-3">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Price Range</label>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">$</span>
                                        <input className="w-full h-10 pl-6 pr-3 rounded-lg border border-slate-200  bg-white  text-sm focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Min" type="number" />
                                    </div>
                                    <span className="text-slate-400">-</span>
                                    <div className="relative flex-1">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">$</span>
                                        <input className="w-full h-10 pl-6 pr-3 rounded-lg border border-slate-200  bg-white  text-sm focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Max" type="number" />
                                    </div>
                                </div>
                            </div>
                            {/* Stock Status */}
                            <div className="md:col-span-4 lg:col-span-2">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Status</label>
                                <div className="relative">
                                    <select className="w-full h-10 pl-3 pr-8 appearance-none rounded-lg border border-slate-200  bg-white  text-sm focus:ring-2 focus:ring-primary focus:border-transparent text-slate-600 ">
                                        <option>Any Status</option>
                                        <option>In Stock</option>
                                        <option>Low Stock</option>
                                        <option>Out of Stock</option>
                                    </select>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                    </span>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="md:col-span-12 lg:col-span-1 flex items-end">
                                <button className="w-full h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600  hover:bg-slate-200  transition-colors text-sm font-medium">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Products Table Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50/50 border-b border-slate-200 ">
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[80px]">Image</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-[200px] cursor-pointer hover:text-primary group">
                                            <div className="flex items-center gap-1">
                                                Product Name
                                                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">arrow_upward</span>
                                            </div>
                                        </th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {/* Row 1 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-6">
                                            <div className="size-10 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 bg-center bg-cover" data-alt="Apple iPhone 9 Thumbnail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeKcEximnICix7ZW40_mvjh4x2NhwdUHzIz5Pn__T4VIVB6WyTFIZWqHlT_L6ppA7pxOGhbME-9QHCu6TN-I2dTamS6XGZ6p-6rrqjP1QCk0aUhLf64UK8NLAvgg76nmI2orNrpbBoD4_3LDeSMZq1zS_GqRF4I1kIHMBVs2Oee-mEn3NK9ilitaCIKBc9v_AEjsvfiJZcnpiCdUt-z7-OzpcnEz9DSgVY7zH4w6Yv7GE6t7Iyrki4UgxkGMlk_pBLwLf2syP9Xuk')" }} ></div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="font-bold text-slate-900">iPhone 9</div>
                                            <div className="text-xs text-slate-400">SKU: APP-IP9-128</div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                Smartphones
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-sm font-medium text-slate-700">$549.00</td>
                                        <td className="py-3 px-6 text-sm text-slate-600">94</td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                                <span className="material-symbols-outlined text-amber-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                4.69
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1.5">
                                                <div className="size-1.5 rounded-full bg-emerald-500"></div>
                                                <span className="text-xs font-medium text-emerald-700">Active</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <button className="p-1.5 rounded hover:bg-slate-200  text-slate-400 hover:text-slate-600 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-6">
                                            <div className="size-10 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 bg-center bg-cover" data-alt="MacBook Pro Laptop Thumbnail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCd8I5SUWTqrz-UwTNW4Rj1bQTBagM6IEKkZ0peFQrMLjZDEENlWuGr4rJByO9F4cflZMIvXmJlPCNQ8EXXON4mYoSA2tgH_78o3YPJ4TRgljW7PwwHPvnNuR96k51hk-mdERZf0K4ISQEBUzUmt7YdrV0aeTXPV2TnquqDOBqvpEehAW9PypyuWHY1fFRbK8fYF0tuDbO_TjSlVck_7epeMpNRR94dH6cnbRYUdGzAQ967uqBRqPpJSjz2kE4PaGdnqTQkAU1Yu9Q')" }}></div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="font-bold text-slate-900">MacBook Pro</div>
                                            <div className="text-xs text-slate-400">SKU: APP-MBP-14</div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                Laptops
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-sm font-medium text-slate-700">$1,749.00</td>
                                        <td className="py-3 px-6 text-sm text-slate-600">12</td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                                <span className="material-symbols-outlined text-amber-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                4.92
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1.5">
                                                <div className="size-1.5 rounded-full bg-amber-500"></div>
                                                <span className="text-xs font-medium text-amber-700">Low Stock</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <button className="p-1.5 rounded hover:bg-slate-200  text-slate-400 hover:text-slate-600 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-6">
                                            <div className="size-10 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 bg-center bg-cover" data-alt="Perfume Bottle Thumbnail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5b6B73mUy9x-AhTMd8Ii7cx-shAW5bX7xrB6-NLN7saGrszaAszecmrvZ5E20wB4PFlrTQrTKOro8qmGUfvT02dNF8RV3dm3LJ6PfxLIr4UGM7lO1qSf0sZcd8QigynNaxCJtD3dhyZJJpIvAR-JSNiaWRSWCM3XOsewSvyEOXdU76PAP0ETacEBB33uAEAXLniVP6qgHErapDQBH3XcBxY6awlJ5ypJy4y5tWlTGzPDkIpsqa5GHDW77RI8uCkLAExLEtBg7rT0)'" }}></div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="font-bold text-slate-900">Eau De Parfum</div>
                                            <div className="text-xs text-slate-400">SKU: FRA-EDP-50</div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                Fragrances
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-sm font-medium text-slate-700">$89.00</td>
                                        <td className="py-3 px-6 text-sm text-slate-600">0</td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                                <span className="material-symbols-outlined text-amber-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                4.21
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1.5">
                                                <div className="size-1.5 rounded-full bg-red-500"></div>
                                                <span className="text-xs font-medium text-red-700">Out of Stock</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <button className="p-1.5 rounded hover:bg-slate-200  text-slate-400 hover:text-slate-600 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 4 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-6">
                                            <div className="size-10 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 bg-center bg-cover" data-alt="Skincare Cream Jar Thumbnail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-4TgnVURPmzoNpEeZcxozjqh2PaJ02rvoiunWyVS2HMytUnz83RsWBAF2glYaKqDmT9IOP7MkQOWnZCWdQLJCNDCgS8hFhMoR-DsUInw2acLVMR71mmkUF6euip7xPV3EalTyDNymZ5rIdg7U7R4Qbk8iYXKNkb_1AvxCLfYz1hdMllh1sQOzaK3747P6tIPiyCrWZK5Jjc0Ro-ihnlP8_x8HEf_TE4O6c7vdMhPDpsk_D7us7W5poGCWpm5YmUkSaUgOE__mIww')" }}></div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="font-bold text-slate-900">Hyaluronic Acid</div>
                                            <div className="text-xs text-slate-400">SKU: SKN-HYA-30</div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                Skincare
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-sm font-medium text-slate-700">$35.00</td>
                                        <td className="py-3 px-6 text-sm text-slate-600">342</td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                                <span className="material-symbols-outlined text-amber-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                4.85
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1.5">
                                                <div className="size-1.5 rounded-full bg-emerald-500"></div>
                                                <span className="text-xs font-medium text-emerald-700">Active</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <button className="p-1.5 rounded hover:bg-slate-200  text-slate-400 hover:text-slate-600 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 5 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-3 px-6">
                                            <div className="size-10 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 bg-center bg-cover" data-alt="Office Chair Thumbnail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCa1ctBpSC9sk3JXP1_iJ81eC7yvaCH4z6ymzTdX9vedLduGBRJe7W6IzaDQyHkmzLRSAKbzJM16C2Yrc7S7zLR5WolzN7J2ZUMHLayy5oTksw2rnWz7wn4zgFmDQQu6W60H1oKLRO50bNLFLOiqGCkwR19dliZojNdvwL1JwW_cCxcyGrMGI4BMrOWg25K_w-WVFZLYVEK8JWQ2djgYrjFQai1_sda_Sg_MBizvoGCx0JbcQphvwIdEs17sYiTqWDZS-dXxpYY004')" }}></div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="font-bold text-slate-900">Ergonomic Chair</div>
                                            <div className="text-xs text-slate-400">SKU: FUR-ERG-01</div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                Home &amp; Garden
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-sm font-medium text-slate-700">$299.00</td>
                                        <td className="py-3 px-6 text-sm text-slate-600">18</td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                                <span className="material-symbols-outlined text-amber-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                4.50
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1.5">
                                                <div className="size-1.5 rounded-full bg-emerald-500"></div>
                                                <span className="text-xs font-medium text-emerald-700">Active</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <button className="p-1.5 rounded hover:bg-slate-200  text-slate-400 hover:text-slate-600 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-200  flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-slate-500">
                                Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">5</span> of <span className="font-medium text-slate-900">50</span> products
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <span>Rows per page:</span>
                                    <select className="h-8 pl-2 pr-6 border-slate-200  rounded bg-white  text-sm focus:ring-primary focus:border-primary">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>50</option>
                                    </select>
                                </div>
                                <nav className="flex items-center gap-1">
                                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-400 disabled:opacity-50" disabled>
                                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                    </button>
                                    <button className="min-w-[32px] h-8 flex items-center justify-center rounded bg-indigo-500 text-white text-sm font-medium">1</button>
                                    <button className="min-w-[32px] h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-sm font-medium transition-colors">2</button>
                                    <button className="min-w-[32px] h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-sm font-medium transition-colors">3</button>
                                    <span className="text-slate-400 px-1">...</span>
                                    <button className="min-w-[32px] h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-sm font-medium transition-colors">10</button>
                                    <button className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {/* Footer note (Empty state simulation hidden) */}
                    <div className="hidden flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                        <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-[32px] text-slate-400">search_off</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No products found</h3>
                        <p className="text-slate-500 mb-6 text-center max-w-sm">We couldn't find any products matching your search criteria. Try adjusting your filters.</p>
                        <button className="text-primary font-medium hover:underline">Clear all filters</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminProducts;