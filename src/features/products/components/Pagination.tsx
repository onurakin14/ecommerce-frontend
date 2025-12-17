/**
 * Pagination Component
 *
 * Sayfa numaraları ve Previous/Next butonları
 * - Mevcut sayfa vurgulanır
 * - Fazla sayfa varsa ... ile kısaltır
 * - İlk/son sayfada Previous/Next butonları devre dışı kalır
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className="mt-12 flex items-center justify-center">
      <ul className="flex items-center -space-x-px text-sm">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex h-9 items-center justify-center rounded-l-xl border border-gray-200 bg-white px-3 leading-tight text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <li key={pageNum}>
                <button
                  onClick={() => onPageChange(pageNum)}
                  className={`flex h-9 items-center justify-center border border-gray-200 px-3 leading-tight ${
                    currentPage === pageNum
                      ? "bg-indigo-500/20 font-semibold text-indigo-500"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              </li>
            );
          } else if (
            pageNum === currentPage - 2 ||
            pageNum === currentPage + 2
          ) {
            return (
              <li key={pageNum}>
                <span className="flex h-9 items-center justify-center border border-gray-200 bg-white px-3 leading-tight text-gray-600">
                  ...
                </span>
              </li>
            );
          }
          return null;
        })}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex h-9 items-center justify-center rounded-r-xl border border-gray-200 bg-white px-3 leading-tight text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
