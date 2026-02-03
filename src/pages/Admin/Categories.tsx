import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Plus,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

interface Category {
  slug: string;
  name: string;
  url: string;
  status: "active" | "hidden";
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active" as "active" | "hidden",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (newCategory.name && !newCategory.slug) {
      setNewCategory(prev => ({ ...prev, slug: prev.name.toLowerCase().replace(/\s+/g, '-') }));
    }
  }, [newCategory.name]);

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

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === "all" || cat.status === statusFilter)
  );

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSelectCategory = (slug: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, slug]);
    } else {
      setSelectedCategories(prev => prev.filter(s => s !== slug));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCategories(paginatedCategories.map((cat: Category) => cat.slug));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleAddCategory = () => {
    setNewCategory({ name: "", slug: "", description: "", status: "active" });
    setShowAddModal(true);
  };

  const handleSaveCategory = () => {
    if (newCategory.name.trim()) {
      const slug = newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, '-');
      const category: Category = {
        slug,
        name: newCategory.name.trim(),
        url: slug,
        status: newCategory.status,
      };
      console.log("Adding category:", category);
      setCategories(prev => [...prev, category]);
      console.log("Categories after add:", [...categories, category]);
      setNewCategory({ name: "", slug: "", description: "", status: "active" });
      setShowAddModal(false);
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCategories(prev => prev.filter(cat => !selectedCategories.includes(cat.slug)));
    setSelectedCategories([]);
    setDeleteSuccess(true);
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
                  to="/admin"
                  className="ms-1 text-sm font-medium text-gray-500 hover:text-blue-600 md:ms-2 transition-colors"
                >
                  Catalog
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="ms-1 text-sm font-medium text-gray-900 md:ms-2">
                  Categories
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Category Management
            </h2>
            <p className="text-gray-600 text-sm">
              Create, organize and manage product categories for your store.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleAddCategory}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
            {selectedCategories.length > 0 && (
              <button 
                onClick={handleDeleteSelected}
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                Delete Category ({selectedCategories.length})
              </button>
            )}
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
          <div className="flex flex-col md:flex-row gap-2 p-1">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2.5 bg-transparent border-transparent focus:border-transparent focus:ring-0 text-gray-900 placeholder-gray-500 text-sm"
                placeholder="Search categories by name, slug..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200 my-2"></div>
            {/* Status Filter */}
            <div className="relative min-w-[180px]">
              <select
                className="block w-full py-2.5 pl-3 pr-10 bg-transparent border-transparent focus:border-transparent focus:ring-0 text-sm text-gray-900 cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-left">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[60px]">
                    <div className="flex items-center">
                      <input
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-600 focus:ring-2"
                        type="checkbox"
                        checked={paginatedCategories.length > 0 && paginatedCategories.every((cat: Category) => selectedCategories.includes(cat.slug))}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                    Products
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedCategories.map((category: Category) => (
                  <tr key={category.slug} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <input
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-600 focus:ring-2"
                          type="checkbox"
                          checked={selectedCategories.includes(category.slug)}
                          onChange={(e) => handleSelectCategory(category.slug, e.target.checked)}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 bg-cover bg-center shrink-0 border border-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm font-medium">
                            {category.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <Link
                          to={`/admin/categories/${category.slug}`}
                          className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {category.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <code className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-sm font-medium text-gray-600">
                        {Math.floor(Math.random() * 50) + 1}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.status === "active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {category.status === "active" ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">
                        {new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select 
                className="form-select bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-1.5 py-1"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <span className="text-sm text-gray-600">
              Page <span className="font-medium text-gray-900">{currentPage}</span> of{" "}
              <span className="font-medium text-gray-900">{totalPages}</span>
            </span>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
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
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteSuccess(false);
                    }}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="px-6 py-2">
                  <div className="mt-2 space-y-2">
                    <p className="text-base text-slate-600 leading-relaxed">
                      Are you sure you want to delete the following categories?
                    </p>
                    <ul className="list-disc list-inside text-sm text-slate-500">
                      {selectedCategories.map(slug => {
                        const cat = categories.find(c => c.slug === slug);
                        return <li key={slug}>{cat?.name}</li>;
                      })}
                    </ul>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      This will not delete products but will remove category association. This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4">
                  <button 
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteSuccess(false);
                    }}
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
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteSuccess(false);
                    }}
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

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/20 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-100 transform transition-all scale-100 opacity-100 flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Add Category</h2>
                <p className="text-sm text-slate-500 mt-1">Fill in the details below to create a new product category.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form className="flex flex-col gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900" htmlFor="categoryName">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                    id="categoryName"
                    placeholder="e.g., Smart Home"
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900" htmlFor="categorySlug">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 material-symbols-outlined text-[18px]">link</span>
                    <input
                      className="flex h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                      id="categorySlug"
                      placeholder="smart-home"
                      type="text"
                      value={newCategory.slug}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
                    />
                  </div>
                  <p className="text-[0.8rem] text-slate-500">The "slug" is the URL-friendly version of the name.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                    id="description"
                    placeholder="Briefly describe what belongs in this category..."
                    value={newCategory.description}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium text-slate-900 block">Visibility Status</label>
                    <p className="text-xs text-slate-500">Hidden categories won't appear in the store.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={newCategory.status === "active"}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, status: e.target.checked ? "active" : "hidden" }))}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 focus:ring-2 focus:ring-slate-400"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveCategory}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-primary shadow-md"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}