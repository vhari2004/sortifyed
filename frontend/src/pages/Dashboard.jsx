import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import AppHeader from "../components/AppHeader";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import Stats from "../components/Stats";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = useCallback(async (keyword = "", selectedSource = "", page = 1) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        q: keyword,
        source: selectedSource,
        page: String(page),
      });
      const response = await API.get(`/jobs/?${params.toString()}`);

      setJobs(response.data.results ?? []);
      setTotalJobs(response.data.count ?? 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => fetchJobs("", "", 1));
  }, [fetchJobs]);

  const totalPages = Math.max(1, Math.ceil(totalJobs / 10));

  const handlePageChange = (page) => {
    void fetchJobs(search, source, page);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AppHeader description="Discover, compare, and save your next best opportunity." />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-400">
              Job dashboard
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
              A cleaner way to search across the roles that matter.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 lg:justify-self-end">
            Filter opportunities by keyword and source, then save the roles you
            want to revisit before applying.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_auto]">
            <label className="block text-left">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Search</span>
              <input
                type="text"
                placeholder="Role, company, skill, or keyword"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && fetchJobs(search, source, 1)
                }
              />
            </label>

            <label className="block text-left">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Source</span>
              <select
                value={source}
                onChange={(event) => setSource(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
              >
                <option value="">All sources</option>
                <option value="Python.org">Python.org</option>
                <option value="RemoteOK">RemoteOK</option>
                <option value="Wellfound">Wellfound</option>
              </select>
            </label>

            <button
              className="mt-0 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500/20 lg:mt-7"
              onClick={() => fetchJobs(search, source, 1)}
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search jobs"}
            </button>
          </div>
        </section>

        <Stats />

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                Latest opportunities
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {totalJobs} {totalJobs === 1 ? "role" : "roles"} found
              </p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              Loading opportunities...
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
                itemLabel={`${totalJobs} total roles`}
                onPageChange={handlePageChange}
                totalPages={totalPages}
              />
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                No jobs found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Try a broader keyword or switch back to all sources to refresh
                the list.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
