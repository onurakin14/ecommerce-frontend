import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchProductsByPage, type Product } from "../../store/productSlice";
import { Link } from "react-router-dom";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import ProductFormModal from "../../components/admin/ProductFormModal";

function AdminProducts() {

    const dispatch = useAppDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [openMenuById, setOpenMenuById] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>();

    const [isEditModalActive, setEditModalActive] = useState(false);
    const [isDeleteModalActive, setDeleteModalActive] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByPage({})).then(res => {
            setProducts(res.payload as Product[]);
        }).catch(err => console.error(err));
    }, []);

    const closeModals = () => {
        setOpenMenuById(null); setSelectedProduct(null);
        setEditModalActive(false); setDeleteModalActive(false);
    }

    return (
        <React.Fragment>
            {isEditModalActive && (<ProductFormModal product={selectedProduct} onClose={closeModals} />)}
            {isDeleteModalActive && (<DeleteConfirmModal product={selectedProduct} onClose={closeModals} />)}

            {!isEditModalActive && !isDeleteModalActive && (
                <main className="flex-1 overflow-y-auto md:p-8 scroll-smooth">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-dark-custom tracking-tight mb-2">Product Management</h1>
                                <p className="text-slate-500">Create, edit and manage your inventory efficiently.</p>
                            </div>
                            <button onClick={() => { setEditModalActive(true); setSelectedProduct(null) }} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm shadow-primary/30 transition-all active:scale-95 shrink-0">
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
                                            <th className="px-1 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">
                                                <input className="rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" />
                                            </th>
                                            <th className="px-1 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                                            <th className="px-1 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                            <th className="px-1 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                                            <th className="px-1 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                                            <th className="px-1 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                                            <th className="px-1 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                            <th className="px-1 md:px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {products.map((item, index) => {
                                            return (
                                                <tr key={index} className="group hover:bg-slate-50 transition-colors">
                                                    <td className="px-1 md:px-6 py-4">
                                                        <input className="rounded border-slate-300 text-primary focus:ring-primary/20" type="checkbox" />
                                                    </td>
                                                    <td className="px-1 md:px-6 py-4">
                                                        <Link to={`${item.id}`} state={{ item }}>
                                                            <div className="flex items-center gap-4">
                                                                <div className="size-10 rounded-lg bg-white border border-slate-200 p-1 shrink-0">
                                                                    <img alt="Smartphone with screen on" className="w-full h-full object-cover rounded" src={item.thumbnail} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-dark-custom">{item.title}</p>
                                                                    <p className="text-xs text-slate-500">{item.brand}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td className="px-1 md:px-6 py-4">
                                                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">{item.category}</span>
                                                    </td>
                                                    <td className="px-1 md:px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-dark-custom">${item.price}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-1 md:px-6 py-4">
                                                        <span className="text-sm text-slate-600">{item.stock}</span>
                                                    </td>
                                                    <td className="px-1 md:px-6 py-4">
                                                        <div className="flex items-center gap-1 text-amber-400">
                                                            <span className="material-symbols-outlined icon-filled text-[18px]">star</span>
                                                            <span className="text-sm font-medium text-slate-600">{item.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-1 md:px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="size-2 rounded-full bg-emerald-500"></span>
                                                            <span className="text-sm font-medium text-slate-700">Active</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-1 md:px-6 py-4 text-right">
                                                        <button className="p-2 rounded-full hover:bg-gray-100"
                                                            onClick={() => setOpenMenuById(openMenuById === item.id ? null : item.id)}>
                                                            <span className="material-symbols-outlined">more_vert</span>
                                                        </button>

                                                        {openMenuById === item.id && (
                                                            <div className="absolute mt-2 w-32 bg-white rounded-lg shadow-lg">
                                                                <ul className="py-1 text-sm text-gray-700">
                                                                    <li>
                                                                        <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
                                                                            onClick={() => { setEditModalActive(true); setSelectedProduct(item) }}>
                                                                            <span className="material-symbols-outlined me-3">edit</span>
                                                                            Edit
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
                                                                            onClick={() => { setDeleteModalActive(true); setSelectedProduct(item) }}>
                                                                            <span className="material-symbols-outlined me-3">delete</span>
                                                                            Delete
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <div className="px-1 md:px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
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
            )}
        </React.Fragment>
    )
}

export default AdminProducts;