import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { createProduct, fetchCategories, updateProduct, type Category, type Product } from "../../store/productSlice";

type EditModalProps = { product?: Product | null; onClose: () => void; }

function ProductFormModal({ product, onClose }: EditModalProps) {

    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState<Category[]>();

    const [newProduct, setNewProduct] = useState<Product>();
    const [selectedProduct, setSelectedProduct] = useState<Product>(product!);

    useEffect(() => {
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
            console.log(res.payload); onClose();
        }).catch(err => console.error(err));
    };

    const handleUpdateProduct = () => {
        dispatch(updateProduct(selectedProduct!)).then(res => {
            console.log(res.payload); onClose();
        }).catch(err => console.error(err));
    }

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
                        <button onClick={onClose} className="group p-2 rounded-full hover:bg-slate-100 transition-colors">
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
                                                {categories?.map((item, index) => {
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
                            <button onClick={onClose} className="px-6 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold text-sm transition-all shadow-sm" type="button">
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

export default ProductFormModal;