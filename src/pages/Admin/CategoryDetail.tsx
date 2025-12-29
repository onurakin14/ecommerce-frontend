import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, Home, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  slug: string;
  name: string;
  url: string;
  status?: "active" | "hidden";
}

export default function CategoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const category = categories.find(cat => cat.slug === slug);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [category]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      // Transform to our format
      const transformedCategories = data.map((cat: any) => ({
        slug: cat.slug,
        name: cat.name,
        url: cat.url,
        status: Math.random() > 0.5 ? "active" : "hidden" as "active" | "hidden",
      }));
      setCategories(transformedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      const count = data.products.filter((p: any) => p.category === category!.slug).length;
      setTotalProducts(count);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (category) {
      setCategories(prev => prev.filter(cat => cat.slug !== category.slug));
      setDeleteSuccess(true);
      // Navigate back after a short delay
      setTimeout(() => {
        navigate("/admin/categories");
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <p>Category not found</p>
        </div>
      </div>
    );
  }

  // Mock stats
  const createdAt = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
  const lastUpdated = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000);

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                to="/admin"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link
                  to="/admin/categories"
                  className="ms-1 text-sm font-medium text-gray-500 hover:text-blue-600 md:ms-2 transition-colors"
                >
                  Categories
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="ms-1 text-sm font-medium text-gray-900 md:ms-2">
                  {category.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-gray-900 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                {category.name}
              </h1>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                category.status === "active"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-gray-100 text-gray-600 border-gray-200"
              }`}>
                {category.status === "active" ? "Active" : "Hidden"}
              </span>
            </div>
            <p className="text-gray-600 text-base font-normal leading-normal">
              Manage category details, visibility, and associated products.
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col gap-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1 rounded-xl p-5 border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-sm font-medium leading-normal">Total Products</p>
                  <span className="material-symbols-outlined text-blue-600 text-[24px]">inventory_2</span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">{totalProducts}</p>
                  <span className="text-green-600 text-xs font-medium bg-green-100 px-1.5 py-0.5 rounded">+2%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Products listed in this category</p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              {/* Slug */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-600 text-[18px]">link</span>
                  <p className="text-gray-600 text-sm font-medium">Slug</p>
                </div>
                <div className="flex items-center">
                  <code className="text-gray-900 text-sm bg-gray-100 px-2 py-1 rounded border border-gray-200 font-mono">
                    /{category.slug}
                  </code>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-600 text-[18px]">toggle_on</span>
                  <p className="text-gray-600 text-sm font-medium">Visibility Status</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${category.status === "active" ? "bg-green-500" : "bg-gray-500"}`}></div>
                  <p className="text-gray-900 text-sm font-medium">
                    {category.status === "active" ? "Publicly Visible" : "Hidden"}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-600 text-[18px]">calendar_today</span>
                  <p className="text-gray-600 text-sm font-medium">Created At</p>
                </div>
                <p className="text-gray-900 text-sm">
                  {createdAt.toLocaleDateString()} <span className="text-gray-500 text-xs ml-1">10:45 AM</span>
                </p>
              </div>

              {/* Last Updated */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-600 text-[18px]">update</span>
                  <p className="text-gray-600 text-sm font-medium">Last Updated</p>
                </div>
                <p className="text-gray-900 text-sm">
                  {lastUpdated.toLocaleDateString()} <span className="text-gray-500 text-xs ml-1">by Admin</span>
                </p>
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-600 text-[18px]">description</span>
                  <p className="text-gray-600 text-sm font-medium">Description</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Mobile devices with advanced computing capabilities and connectivity. This category includes the latest Android and iOS devices, featuring high-resolution touchscreens, multi-camera systems, and 5G support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button 
              onClick={handleDelete}
              className="group flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-white border border-red-200 text-red-600 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-50 transition-all shadow-sm"
            >
              <Trash2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span className="truncate">Delete Category</span>
            </button>
            <button className="group flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-sm hover:bg-blue-700 transition-all hover:shadow-md hover:-translate-y-0.5">
              <Edit className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              <span className="truncate">Edit Details</span>
            </button>
          </div>
        </div>

        {/* Helper text */}
        <p className="text-center text-xs text-gray-500 mt-2">
          Editing category ID: <span className="font-mono">#CAT-{Math.floor(Math.random() * 100000)}</span>
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-[480px] overflow-hidden rounded-xl bg-white shadow-2xl border border-slate-100">
            {!deleteSuccess ? (
              <>
                <div className="flex items-start justify-between p-6 pb-2">
                  <div className="flex items-center gap-3 text-red-600">
                    <div className="flex items-center justify-center size-10 rounded-full bg-red-100">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>warning</span>
                    </div>
                    <h2 className="text-xl font-bold leading-none text-gray-900">Delete Category</h2>
                  </div>
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="px-6 py-2">
                  <div className="mt-2 space-y-2">
                    <p className="text-base text-slate-600 leading-relaxed">
                      Are you sure you want to delete the <strong className="text-slate-900">{category?.name}</strong> category?
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      This will not delete products but will remove category association. This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
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
                    Delete Category
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between p-6 pb-2">
                  <div className="flex items-center gap-3 text-green-600">
                    <div className="flex items-center justify-center size-10 rounded-full bg-green-100">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                    </div>
                    <h2 className="text-xl font-bold leading-none text-gray-900">Success</h2>
                  </div>
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="px-6 py-2">
                  <div className="mt-2 space-y-2">
                    <p className="text-base text-slate-600 leading-relaxed">
                      Category deleted successfully!
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
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
    </div>
  );
}