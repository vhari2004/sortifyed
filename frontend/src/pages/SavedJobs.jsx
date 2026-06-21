import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import AppHeader from "../components/AppHeader";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const loadSavedJobs = useCallback(async (page = 1) => {
    setIsLoading(true);

    try {
      const response = await API.get(`/saved-jobs/?page=${page}`);
      setJobs(response.data.results ?? []);
      setTotalJobs(response.data.count ?? 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error loading saved jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => loadSavedJobs(1));
  }, [loadSavedJobs]);

  const totalPages = Math.max(1, Math.ceil(totalJobs / 10));

  const handlePageChange = (page) => {
    void loadSavedJobs(page);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AppHeader description="Review the roles you saved for later." />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-400">
            Saved roles
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950 dark:text-white">
            Your shortlist
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {totalJobs} {totalJobs === 1 ? "role" : "roles"} saved
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Loading saved jobs...
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className="grid gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              itemLabel={`${totalJobs} total saved roles`}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              No saved jobs yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Save roles from the dashboard to build a focused shortlist.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default SavedJobs;
