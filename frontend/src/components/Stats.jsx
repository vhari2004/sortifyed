import { useCallback, useEffect, useState } from "react";
import API from "../services/api";

const statItems = [
  { key: "total_jobs", label: "Total jobs", tone: "text-blue-700" },
  { key: "saved_jobs", label: "Saved jobs", tone: "text-emerald-700" },
  { key: "applied_jobs", label: "Applied jobs", tone: "text-violet-700" },
];

function Stats() {
  const [stats, setStats] = useState({});

  const loadStats = useCallback(async () => {
    try {
      const response = await API.get("/dashboard-stats/");
      setStats(response.data);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadStats);
  }, [loadStats]);

  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {statItems.map((item) => (
        <div
          key={item.key}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
          <p className={`mt-3 text-3xl font-semibold ${item.tone}`}>
            {stats[item.key] ?? 0}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Stats;
