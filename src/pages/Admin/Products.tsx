import React from "react";

function AdminProducts() {
    return (
        <React.Fragment>
            <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth bg-gray-50">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-dark-custom tracking-tight mb-2">Product Management</h1>
                            <p className="text-slate-500">Create, edit and manage your inventory efficiently.</p>
                        </div>
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm shadow-primary/30 transition-all active:scale-95 shrink-0">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span>Add Product</span>
                        </button>
                    </div>
                    {/* Main Content Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        {/* Table Toolbar */}
                        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
                            {/* Search Bar Component */}
                            <div className="w-full md:w-96">
                                <label className="relative w-full block">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <input className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm text-dark-custom placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Search products by name..." type="text" />
                                </label>
                            </div>
                            {/* Filters */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-dark-custom transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                    Filters
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-dark-custom transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    Export
                                </button>
                            </div>
                        </div>
                        {/* Product Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-100">
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" />
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {/* Row 1 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-lg bg-white border border-slate-200 p-1 shrink-0">
                                                    <img alt="Smartphone with screen on" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0bWO0yeKLWKwWojwTQj6N9fDI-78GlJvxTuLmHjJKr_PyKqtXHGpw_Wxf7irybM3rQ9JErXAoR1Eg-H0-Ed-mmxIZpZTZvHj5mapSvA0WUyW7xgJOQur8r6ueRTTdl_AC1EY_CJSLV3880-NOTkmQuVYM7GFWaey6mvAaU_iI_wqaQ_Oczwn7mYG9WbnMAn7sch69zI7xNPux3EVOe1S664aSVM09atHYvnkO6PUrck-p9n8wq6uEsk6uYxXFPUkPUFq0lBHbnqc" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-dark-custom">iPhone 13 Pro</p>
                                                    <p className="text-xs text-slate-500">Apple</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Electronics</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-dark-custom">$999.00</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">45</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <span className="material-symbols-outlined icon-filled text-[18px]">star</span>
                                                <span className="text-sm font-medium text-slate-600">4.8</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="size-2 rounded-full bg-emerald-500"></span>
                                                <span className="text-sm font-medium text-slate-700">Active</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-primary p-1 rounded hover:bg-indigo-600/5 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-lg bg-white border border-slate-200 p-1 shrink-0">
                                                    <img alt="Red sneaker shoe side view" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_7_8JEbK9hu1Qymn55Ve_leUoLiz9HRCjunfJKl4WydcPz64cDrEVoR1cZM4Leg4E5gOdlx5JVA-BAppIwax6dnwurYf0IZgrVp0lSClTdoOFTxW6l-0jWndoPzPX6ZEAW_3vI6Rc98BY9GwAlp9U-sb2PSCwL6JvNOMcwOR4xbrWPMuJFEd7pWNu9IIzP_byx4HLxdq3S7KU4eUIHudH4T35YWpuCJuBET2lSEpZFq1qvbrI7MQlrSCz1SUvz90nNE0DNexpnD0" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-dark-custom">Nike Air Max</p>
                                                    <p className="text-xs text-slate-500">Nike</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Footwear</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-dark-custom">$120.00</span>
                                                <span className="text-xs text-green-600 font-medium">-15%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-400">0</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <span className="material-symbols-outlined icon-filled text-[18px]">star</span>
                                                <span className="text-sm font-medium text-slate-600">4.5</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                                                Out of Stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-primary p-1 rounded hover:bg-indigo-600/5 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-lg bg-white border border-slate-200 p-1 shrink-0">
                                                    <img alt="Black over-ear headphones" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLtqf98FzBYS3Yl9WHzzdc2dTmEJwsx_WSX8qbWFTEWI3mAteL7_tPWrloz5puZfKBV6Ww8GygQbU7yBMkmjV3FntDhCTJ6axHpng9zagkvy_8qw-2ky1SWL5voCyAjAYN0yM_4yTtnA6HevEuycngEme3D6GRiYs3Wfc0OgMSKdrtiP1EG0_t8wRqx8rEOFH3m7nsha9zZa08liBu9IjCmGNUuQan_FL7FREf_JYn81GwVKI562pDo6nfB2C7TNELLAS69O8L1fE" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-dark-custom">Sony WH-1000XM5</p>
                                                    <p className="text-xs text-slate-500">Sony</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Audio</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-dark-custom">$348.00</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-orange-600 font-medium">8</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <span className="material-symbols-outlined icon-filled text-[18px]">star</span>
                                                <span className="text-sm font-medium text-slate-600">4.7</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="size-2 rounded-full bg-orange-400"></span>
                                                <span className="text-sm font-medium text-slate-700">Low Stock</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-primary p-1 rounded hover:bg-indigo-600/5 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 4 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-lg bg-white border border-slate-200 p-1 shrink-0">
                                                    <img alt="Custom mechanical keyboard" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1MvnC1H3KXaBfp1gG3a2AzLVH17i44ZFAKjNS-9DIBRz-Fmv4JtXmgr_Af8zbGsRz5tFX4QYvLA22dlZnI7frpESIuh-pi0QiaZmyOEwkqTqc7NrP5pikUivKvvUXE39oWFLndGiefkNYGf_S36cb5xLKcMQRO8VSF7rqzfSH8fpVYPCdRcYdq0C14Y-zHNssQYMlCQsKP0kh7fQW3dMlsPaaAZFV71Zo4AEefxG-zcZsrtuceMn0KnoB9IDBFbYrF-_nOWzlvYo" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-dark-custom">Keychron Q1</p>
                                                    <p className="text-xs text-slate-500">Keychron</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Accessories</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-dark-custom">$149.00</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">120</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <span className="material-symbols-outlined icon-filled text-[18px]">star</span>
                                                <span className="text-sm font-medium text-slate-600">4.9</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="size-2 rounded-full bg-emerald-500"></span>
                                                <span className="text-sm font-medium text-slate-700">Active</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-primary p-1 rounded hover:bg-indigo-600/5 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 5 */}
                                    <tr className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <input className="rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-lg bg-white border border-slate-200 p-1 shrink-0">
                                                    <img alt="Analog camera on table" className="w-full h-full object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvIGGr7Jy3KPrBExC_kEYPp0gzlfCmXgHOP_KwmeH8N5Kwc0aEdJzS1kPQxBmcSEfEVoFm7uJHpVi_P8Z_o4fIUKHyv7DBI1vt7MWRS1nMS079H35JeuCRI-V_9GT5ixiNCbGUrlMexZ1YlA9chE_jrxXTcR9OQpOzGlynO63mzQJGVIZiYMTMF_gUNG9P-o08e1zxhJDmx-O49_0xInZdynUMHLVyC6LdO7HwKH__FiaEGlqEv7IMYUnSD1bFXu938OdfktzMAIs" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-dark-custom">Leica M11</p>
                                                    <p className="text-xs text-slate-500">Leica</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">Photography</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-dark-custom">$8,995.00</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">3</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <span className="material-symbols-outlined icon-filled text-[18px]">star</span>
                                                <span className="text-sm font-medium text-slate-600">5.0</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="size-2 rounded-full bg-orange-400"></span>
                                                <span className="text-sm font-medium text-slate-700">Low Stock</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-primary p-1 rounded hover:bg-indigo-600/5 transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
                            <span className="text-sm text-slate-500">Showing <span className="font-medium text-dark-custom">1</span> to <span className="font-medium text-dark-custom">5</span> of <span className="font-medium text-dark-custom">42</span> results</span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-500 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 border border-primary bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm shadow-primary/30">
                                    1
                                </button>
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50">
                                    2
                                </button>
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50">
                                    3
                                </button>
                                <span className="px-2 text-slate-400">...</span>
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50">
                                    8
                                </button>
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default AdminProducts;