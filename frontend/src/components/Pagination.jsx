function Pagination({ currentPage, totalPages, onPageChange, itemLabel }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Page {currentPage} of {totalPages}
        {itemLabel ? ` · ${itemLabel}` : ""}
      </p>

      <div className="flex items-center gap-2">
        <button
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/60 dark:hover:bg-blue-500/10 dark:hover:text-blue-300 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="button"
        >
          Previous
        </button>
        <button
          className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-blue-600 dark:hover:bg-blue-500 dark:disabled:bg-slate-700"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
