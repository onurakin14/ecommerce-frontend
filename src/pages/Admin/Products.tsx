import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { type Category, createProduct, deleteProduct, fetchCategories, fetchProductsByPage, type Product, updateProduct } from "../../store/productSlice";
import { Link } from "react-router-dom";

function AdminProducts() {

    const dispatch = useAppDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [newProduct, setNewProduct] = useState<Product>();
    const [openMenuById, setOpenMenuById] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>();

    const [isEditModalActive, setEditModalActive] = useState(false);
    const [isDeleteModalActive, setDeleteModalActive] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByPage({})).then(res => {
            setProducts(res.payload as Product[]);
        }).catch(err => console.error(err));

        dispatch(fetchCategories()).then(res => {
            setCategories(res.payload as Category[]);
        }).catch(err => console.error(err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (selectedProduct) {
            setSelectedProduct((data: any) => ({ ...data, [name]: value }));
            //console.log(selectedProduct);
        } else {
            setNewProduct((data: any) => ({ ...data, [name]: value }));
            //console.log(newProduct);
        }
    };

    const handleCreateProduct = () => {
        dispatch(createProduct(newProduct!)).then(res => {
            console.log(res.payload); closeModals();
        }).catch(err => console.error(err));
    };

    const handleUpdateProduct = () => {
        dispatch(updateProduct(selectedProduct!)).then(res => {
            console.log(res.payload); closeModals();
        }).catch(err => console.error(err));
    }

    const handleDeleteProduct = (id: number) => {
        dispatch(deleteProduct(id)).then(res => {
            console.log(res.payload); closeModals();
        }).catch(err => console.error(err));
    }

    const closeModals = () => {
        setOpenMenuById(null); setSelectedProduct(null);
        setEditModalActive(false); setDeleteModalActive(false);
    }

    if (isEditModalActive) {
        return (
            <React.Fragment>
                <div className="flex items-center justify-center h-full">
                    {/* Modal Backdrop */}
                    <div className="fixed inset-0 bg-[#0e0e1b]/40 backdrop-blur-sm z-40 transition-opacity"></div>
                    {/* Modal Container */}
                    <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] z-50 animate-in fade-in zoom-in-95 duration-300 ring-1 ring-black/5">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between px-8 py-6 border-b border-slate-100 shrink-0">
                            <div>
                                <h2 className="text-2xl font-bold text-[#0e0e1b] tracking-tight leading-tight">{selectedProduct ? "Edit Product" : "Add Product"}</h2>
                                <p className="text-slate-500 mt-1 text-sm">Fill in the details below to update your inventory.</p>
                            </div>
                            <button onClick={() => closeModals()} className="group p-2 rounded-full hover:bg-slate-100 transition-colors">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-600">close</span>
                            </button>
                        </div>
                        {/* Modal Body (Scrollable Form) */}
                        <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
                            <form className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                {/* Left Column: Main Info */}
                                <div className="md:col-span-7 flex flex-col gap-6">
                                    {/* Product Title */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-[#0e0e1b]">Product Title <span className="text-error">*</span></label>
                                        <input name="title" onChange={handleChange} defaultValue={selectedProduct?.title} className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-[#0e0e1b] placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium" placeholder="e.g. Wireless Noise-Canceling Headphones" type="text" />
                                    </div>
                                    {/* Row: Category & Price */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-[#0e0e1b]">Category <span className="text-error">*</span></label>
                                            <div className="relative">
                                                <select name="category" onChange={handleChange} defaultValue={selectedProduct?.category} className="w-full h-12 px-4 pr-10 rounded-lg border border-slate-200 bg-white text-[#0e0e1b] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 appearance-none transition-all text-sm font-medium cursor-pointer">
                                                    <option disabled>Select category</option>
                                                    {categories.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.slug}>{item.name}</option>
                                                        )
                                                    })}
                                                </select>
                                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-[#0e0e1b]">Price</label>
                                            <div className="relative group">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-primary transition-colors">$</span>
                                                <input name="price" onChange={handleChange} defaultValue={selectedProduct?.price} className="w-full h-12 pl-8 pr-4 rounded-lg border border-slate-200 bg-white text-[#0e0e1b] placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium" placeholder="0.00" type="number" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Row: Discount & Stock */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-[#0e0e1b]">Discount</label>
                                            <div className="relative group">
                                                <input name="discountPercentage" onChange={handleChange} defaultValue={selectedProduct?.discountPercentage} className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-[#0e0e1b] placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium" placeholder="0" type="number" />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium group-focus-within:text-primary transition-colors">%</span>
                                            </div>
                                        </div>
                                        {/* Error State Example */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-[#0e0e1b]">Stock Quantity</label>
                                            <input name="stock" onChange={handleChange} defaultValue={selectedProduct?.stock} className="w-full h-12 px-4 rounded-lg border border-error bg-red-50/10 text-[#0e0e1b] focus:outline-none focus:border-error focus:ring-4 focus:ring-error/10 transition-all text-sm font-medium" type="number" />
                                            <p className="text-xs text-error font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">error</span>
                                                Stock cannot be negative
                                            </p>
                                        </div>
                                    </div>
                                    {/* Description */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-[#0e0e1b]">Description</label>
                                        <textarea name="description" onChange={handleChange} defaultValue={selectedProduct?.description} className="w-full p-4 rounded-lg border border-slate-200 bg-white text-[#0e0e1b] placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none transition-all text-sm font-medium" placeholder="Write a detailed description of the product..." rows={5}></textarea>
                                    </div>
                                </div>
                                {/* Right Column: Media & Meta */}
                                <div className="md:col-span-5 flex flex-col gap-6">
                                    {/* Image Upload Section */}
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100/50">
                                        <label className="block text-sm font-semibold text-[#0e0e1b] mb-3">Product Image</label>
                                        {/* Image URL Input */}
                                        <div className="flex gap-2 mb-4">
                                            <div className="relative flex-1">
                                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">link</span>
                                                <input name="thumbnail" onChange={handleChange} defaultValue={selectedProduct?.thumbnail} className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-white text-[#0e0e1b] placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-xs font-medium" placeholder="https://..." type="text" />
                                            </div>
                                            <button className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm" type="button">
                                                <span className="material-symbols-outlined text-lg">refresh</span>
                                            </button>
                                        </div>
                                        {/* Image Preview Area */}
                                        <div className="relative aspect-square w-full rounded-lg border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center overflow-hidden group hover:border-primary/50 transition-colors">
                                            {/* Display Image */}
                                            <img className="w-full h-full object-cover" data-alt="Preview of the product image showing a placeholder with text" src={selectedProduct?.thumbnail} />
                                            {/* Overlay Actions */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                                <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors" title="View Full" type="button">
                                                    <span className="material-symbols-outlined">visibility</span>
                                                </button>
                                                <button className="p-2 bg-white/10 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-colors" title="Remove" type="button">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-3 text-center">Accepts .jpg, .png, .webp (Max 5MB)</p>
                                    </div>
                                    {/* Rating Section */}
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-semibold text-[#0e0e1b]">Initial Rating</label>
                                            <span className="text-xs font-bold bg-primary/10 px-2 py-0.5 rounded">{selectedProduct?.rating}/5</span>
                                        </div>
                                        <div className="flex items-center gap-1 mb-2">
                                            <button className="text-amber-400 hover:scale-110 transition-transform" type="button"><span className="material-symbols-outlined fill-current">star</span></button>
                                            <button className="text-amber-400 hover:scale-110 transition-transform" type="button"><span className="material-symbols-outlined fill-current">star</span></button>
                                            <button className="text-amber-400 hover:scale-110 transition-transform" type="button"><span className="material-symbols-outlined fill-current">star</span></button>
                                            <button className="text-amber-400 hover:scale-110 transition-transform" type="button"><span className="material-symbols-outlined fill-current">star</span></button>
                                            <button className="text-slate-300 hover:text-amber-400 hover:scale-110 transition-all" type="button"><span className="material-symbols-outlined">star</span></button>
                                        </div>
                                        <p className="text-xs text-slate-500">Click stars to set default rating.</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Modal Footer */}
                        <div className="px-8 py-5 border-t border-slate-100bg-slate-50 shrink-0 flex items-center justify-between rounded-b-xl">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="material-symbols-outlined text-lg">info</span>
                                <span>Unsaved changes will be lost</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => closeModals()} className="px-6 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold text-sm transition-all shadow-sm" type="button">
                                    Cancel
                                </button>
                                <button onClick={() => selectedProduct ? handleUpdateProduct() : handleCreateProduct()} className="px-6 py-2.5 rounded-lg bg-primary hover:bg-[#3b3ddb] text-white font-semibold text-sm shadow-lg shadow-primary/25 flex items-center gap-2 transition-all active:scale-[0.98]" type="submit">
                                    <span className="material-symbols-outlined text-[18px]">save</span>
                                    Save Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    if (isDeleteModalActive) {
        return (
            <React.Fragment>
                <div className="flex items-center justify-center h-full">
                    {/* Dialog Overlay */}
                    <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"></div>
                    {/* Dialog Modal */}
                    <div aria-describedby="modal-description" aria-labelledby="modal-title" aria-modal="true" className="relative z-50 w-full max-w-[480px] scale-100 transform overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all border border-slate-200" role="alertdialog">
                        {/* Header Section */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            {/* Warning Icon Circle */}
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <span aria-hidden="true" className="material-symbols-outlined icon-filled text-red-500 text-2xl">warning</span>
                            </div>
                            {/* Text Content */}
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                <h3 className="text-xl font-bold leading-6 text-slate-900" id="modal-title">Delete Product</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-slate-500" id="modal-description">
                                        Are you sure you want to delete this product? This action cannot be undone and will remove the item from your inventory permanently.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            {/* Secondary Action (Cancel) */}
                            <button onClick={() => closeModals()} className="inline-flex w-full justify-center items-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400" type="button">
                                Cancel
                            </button>
                            {/* Primary Action (Delete) */}
                            <button onClick={() => handleDeleteProduct(selectedProduct?.id || 0)} className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 sm:w-auto transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" type="button">
                                <span className="material-symbols-outlined text-[1.125rem]">delete</span>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default AdminProducts;