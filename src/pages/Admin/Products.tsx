import React, { useEffect, useState, useCallback } from "react";
import { type Product } from "../../store/productSlice";
import ProductFormModal from "../../components/admin/ProductFormModal";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Plus, 
  Trash2,
  Home,
  CheckCircle,
  AlertTriangle,
  X,
  MoreVertical
} from "lucide-react";

function AdminProducts() {
    // State Tanımları
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    
    // **Silinenleri Hafızada Tutma State'i**
    const [deletedHistory, setDeletedHistory] = useState<number[]>(() => {
        // Sayfa ilk açıldığında LocalStorage'dan silinmişleri oku
        const saved = localStorage.getItem("deletedProducts");
        return saved ? JSON.parse(saved) : [];
    });

    // Seçim ve Modal State'leri
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    
    // Filtre ve Pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Edit Modal State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditModalActive, setEditModalActive] = useState(false);
    const [openMenuById, setOpenMenuById] = useState<number | null>(null);

    // Kategorileri Getir
    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Categories error:", err));
    }, []);

    //  Ürünleri Getir 
    const loadData = useCallback(async () => {
        if (deleteSuccess) return; 

        setLoading(true);
        try {
            let url = "";
            if (selectedCategory !== "All Categories") {
                url = `https://dummyjson.com/products/category/${selectedCategory}`;
            } else if (searchTerm) {
                url = `https://dummyjson.com/products/search?q=${searchTerm}`;
            } else {
                url = `https://dummyjson.com/products?limit=100`;
            }

            const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}select=title,price,stock,category,thumbnail,brand,rating`);
            const data = await res.json();
            
            let result = data.products;

            result = result.filter((p: Product) => !deletedHistory.includes(p.id));

            if (priceRange.min) result = result.filter((p: any) => p.price >= Number(priceRange.min));
            if (priceRange.max) result = result.filter((p: any) => p.price <= Number(priceRange.max));

            setProducts(result);
        } catch (error) {
            console.error("Load error:", error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, selectedCategory, priceRange, deleteSuccess, deletedHistory]); 

    useEffect(() => {
        const delay = setTimeout(loadData, 300);
        return () => clearTimeout(delay);
    }, [loadData]);

    // Pagination Logic
    const totalPages = Math.ceil(products.length / rowsPerPage);
    const paginatedProducts = products.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Seçim Fonksiyonları
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const currentIds = paginatedProducts.map(p => p.id);
            const uniqueIds = Array.from(new Set([...selectedProductIds, ...currentIds]));
            setSelectedProductIds(uniqueIds);
        } else {
            const currentIds = paginatedProducts.map(p => p.id);
            setSelectedProductIds(prev => prev.filter(id => !currentIds.includes(id)));
        }
    };

    const handleSelectProduct = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedProductIds(prev => [...prev, id]);
        } else {
            setSelectedProductIds(prev => prev.filter(item => item !== id));
        }
    };

    //  Silme Mantığı 
    const handleDeleteSelected = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        //  Ekrandan sil
        setProducts(prev => prev.filter(p => !selectedProductIds.includes(p.id)));
        
        // LocalStorage için listeyi güncelle
        const newDeletedHistory = [...deletedHistory, ...selectedProductIds];
        setDeletedHistory(newDeletedHistory);
        
        // Tarayıcı hafızasına kaydet
        localStorage.setItem("deletedProducts", JSON.stringify(newDeletedHistory));

        setDeleteSuccess(true);
        setSelectedProductIds([]); 
    };

    const closeModals = () => {
        setOpenMenuById(null);
        setSelectedProduct(null);
        setEditModalActive(false);
    };

    return (
        <React.Fragment>
            {isEditModalActive && (<ProductFormModal product={selectedProduct} onClose={closeModals} />)}

            {!isEditModalActive && (
                <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 lg:p-10">
                    <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                        
                        {/* Breadcrumbs */}
                        <nav aria-label="Breadcrumb" className="flex">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                                <li className="inline-flex items-center">
                                    <Link to="/admin" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                                        <Home className="w-4 h-4 mr-1" />
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                        <Link to="/admin" className="ms-1 text-sm font-medium text-gray-500 hover:text-indigo-600 md:ms-2 transition-colors">
                                            Catalog
                                        </Link>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                        <span className="ms-1 text-sm font-medium text-gray-900 md:ms-2">
                                            Products
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                    Product Catalog
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    Manage, filter and organize your store's inventory.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                {selectedProductIds.length > 0 && (
                                    <button 
                                        onClick={handleDeleteSelected}
                                        className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none animate-in fade-in zoom-in duration-200"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        Delete ({selectedProductIds.length})
                                    </button>
                                )}
                                
                                <button 
                                    onClick={() => { setEditModalActive(true); setSelectedProduct(null); }}
                                    className="inline-flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Product
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
                                <div className="md:col-span-4">
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Keyword Search</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 text-sm focus:bg-white focus:border-indigo-500 transition-all outline-none" placeholder="Search by name, brand..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} />
                                    </div>
                                </div>

                                <div className="md:col-span-3">
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Category</label>
                                    <select value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value); setCurrentPage(1);}} className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm outline-none focus:bg-white focus:border-indigo-500 capitalize cursor-pointer font-medium">
                                        <option>All Categories</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>)}
                                    </select>
                                </div>

                                <div className="md:col-span-3">
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Price Range</label>
                                    <div className="flex items-center gap-2">
                                        <input type="number" placeholder="Min" className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:bg-white outline-none" value={priceRange.min} onChange={(e) => setPriceRange({...priceRange, min: e.target.value})} />
                                        <span className="text-slate-300">-</span>
                                        <input type="number" placeholder="Max" className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm focus:bg-white outline-none" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <button onClick={() => {setSearchTerm(""); setSelectedCategory("All Categories"); setPriceRange({min:"", max:""});}} className="w-full h-11 text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                            <div className="flex-1 overflow-x-auto">
                                {loading ? (
                                    <div className="p-20 text-center text-slate-400 font-medium">Loading products...</div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                                <th className="py-4 px-6 w-[60px]">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                                                            checked={paginatedProducts.length > 0 && paginatedProducts.every(p => selectedProductIds.includes(p.id))}
                                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                                        />
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Product</th>
                                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                                                <th className="px-6 py-4 text-right"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {paginatedProducts.map((item) => (
                                                <tr key={item.id} className={`hover:bg-slate-50/50 transition-colors group ${selectedProductIds.includes(item.id) ? 'bg-indigo-50/30' : ''}`}>
                                                    <td className="py-4 px-6">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                                                            checked={selectedProductIds.includes(item.id)}
                                                            onChange={(e) => handleSelectProduct(item.id, e.target.checked)}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="size-11 rounded-xl bg-slate-100 p-1 shrink-0 border border-slate-200/50 overflow-hidden">
                                                                <img src={item.thumbnail} className="w-full h-full object-contain" alt="" />
                                                            </div>
                                                            <div>
                                                                <span className="text-sm font-bold text-slate-900 block leading-tight">{item.title}</span>
                                                                <span className="text-[11px] text-slate-400 font-medium uppercase tracking-tighter">{item.brand}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">{item.category}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">${item.price}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                                                        {item.stock} <span className="text-[10px] text-slate-400 ml-1 font-normal">in stock</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button onClick={() => setOpenMenuById(openMenuById === item.id ? null : item.id)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                                            <MoreVertical className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-500 font-medium">Rows per page:</span>
                                    <select 
                                        className="bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1.5 py-1 outline-none font-semibold"
                                        value={rowsPerPage}
                                        onChange={(e) => {
                                            setRowsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {[5, 10, 20, 50].map(val => <option key={val} value={val}>{val}</option>)}
                                    </select>
                                </div>

                                <div className="text-sm text-slate-500 font-medium">
                                    Page <span className="text-slate-900 font-bold">{currentPage}</span> of <span className="text-slate-900 font-bold">{totalPages || 1}</span>
                                    <span className="mx-2 text-slate-300">|</span>
                                    <span className="text-indigo-600 font-bold">{products.length}</span> results found
                                </div>

                                <div className="flex items-center gap-2">
                                    <button 
                                        className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button 
                                        className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        disabled={currentPage >= totalPages}
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inline Delete Modal */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 z-[100 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px] p-4">
                            <div className="w-full max-w-[480px] overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100">
                                {!deleteSuccess ? (
                                    <>
                                        <div className="flex items-start justify-between p-6 pb-2">
                                            <div className="flex items-center gap-3 text-red-600">
                                                <div className="flex items-center justify-center size-10 rounded-full bg-red-100">
                                                    <AlertTriangle className="w-5 h-5" />
                                                </div>
                                                <h2 className="text-xl font-bold leading-none text-slate-900">Delete Products</h2>
                                            </div>
                                            <button 
                                                onClick={() => setShowDeleteModal(false)}
                                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="px-6 py-2">
                                            <div className="mt-2 space-y-2">
                                                <p className="text-base text-slate-600 leading-relaxed">
                                                    Are you sure you want to delete <span className="font-bold text-slate-900">{selectedProductIds.length}</span> selected items?
                                                </p>
                                                <p className="text-sm text-slate-500 leading-relaxed">
                                                    This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
                                            <button 
                                                onClick={() => setShowDeleteModal(false)}
                                                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 w-full sm:w-auto transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={confirmDelete}
                                                className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full sm:w-auto transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-start justify-between p-6 pb-2">
                                            <div className="flex items-center gap-3 text-green-600">
                                                <div className="flex items-center justify-center size-10 rounded-full bg-green-100">
                                                    <CheckCircle className="w-6 h-6" />
                                                </div>
                                                <h2 className="text-xl font-bold leading-none text-slate-900">Success</h2>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    setShowDeleteModal(false);
                                                    setDeleteSuccess(false);
                                                }}
                                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="px-6 py-2">
                                            <div className="mt-2 space-y-2">
                                                <p className="text-base text-slate-600 leading-relaxed">
                                                    Selected products have been deleted successfully!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
                                            <button 
                                                onClick={() => {
                                                    setShowDeleteModal(false);
                                                    setDeleteSuccess(false);
                                                }}
                                                className="inline-flex h-10 items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full sm:w-auto transition-colors"
                                            >
                                                OK
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            )}
        </React.Fragment>
    );
}

export default AdminProducts;