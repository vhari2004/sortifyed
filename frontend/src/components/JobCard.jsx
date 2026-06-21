import { useState } from "react";
import API from "../services/api";

function JobCard({ job }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveJob = async () => {
    setIsSaving(true);

    try {
      await API.post(`/jobs/${job.id}/save/`);
      setSaved(true);
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/60 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold leading-7 text-slate-950 dark:text-white">
              {job.title}
            </h3>
            {job.match_score !== undefined && (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                {job.match_score}% match
              </span>
            )}
          </div>
          <p className="mt-1 font-medium text-blue-700 dark:text-blue-400">{job.company}</p>
        </div>

        {job.location && (
          <p className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {job.location}
          </p>
        )}
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {job.description || "No description provided for this role yet."}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={saveJob}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/60 dark:hover:bg-blue-500/10 dark:hover:text-blue-300 dark:disabled:bg-slate-800"
          disabled={isSaving || saved}
        >
          {saved ? "Saved" : isSaving ? "Saving..." : "Save job"}
        </button>
        <a
          href={job.job_url}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-slate-950 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Apply now
        </a>
      </div>
    </article>
  );
}

export default JobCard;
