import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearStoredProfile,
  getCurrentProfile,
  getProfileInitials,
} from "../utils/profile";

function AppHeader({ description }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState(() => getCurrentProfile());
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const refreshProfile = () => setProfile(getCurrentProfile());

    window.addEventListener("storage", refreshProfile);
    window.addEventListener("profile:update", refreshProfile);
    return () => {
      window.removeEventListener("storage", refreshProfile);
      window.removeEventListener("profile:update", refreshProfile);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    clearStoredProfile();
    navigate("/login");
  };

  const initials = getProfileInitials(profile);

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Link to="/" className="text-2xl font-semibold text-slate-950 dark:text-white">
            Sortifyed<span className="text-blue-700 dark:text-blue-400">.</span>
          </Link>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-3">
          <Link
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
            to="/saved"
          >
            Saved jobs
          </Link>

          <button
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
            onClick={() => setIsDarkMode((current) => !current)}
            type="button"
          >
            {isDarkMode ? "Light mode" : "Dark mode"}
          </button>

          <div className="relative">
            <button
              className="flex items-center gap-3 rounded-full border border-slate-300 bg-white py-1 pl-1 pr-3 text-left transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500/60 dark:hover:bg-blue-500/10"
              onClick={() => setIsMenuOpen((current) => !current)}
              type="button"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-700 text-sm font-semibold text-white dark:bg-blue-500">
                {initials}
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                  {profile.fullName}
                </span>
                <span className="block max-w-40 truncate text-xs text-slate-500 dark:text-slate-400">
                  {profile.roleTitle}
                </span>
              </span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 z-20 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
                <div className="border-b border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-blue-700 font-semibold text-white dark:bg-blue-500">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-950 dark:text-white">
                        {profile.fullName}
                      </p>
                      <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                        {profile.email || profile.username}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-4 grid gap-3 text-sm">
                    <div>
                      <dt className="font-medium text-slate-500 dark:text-slate-400">
                        Role
                      </dt>
                      <dd className="text-slate-800 dark:text-slate-100">
                        {profile.roleTitle}
                      </dd>
                    </div>
                    {profile.location && (
                      <div>
                        <dt className="font-medium text-slate-500 dark:text-slate-400">
                          Location
                        </dt>
                        <dd className="text-slate-800 dark:text-slate-100">
                          {profile.location}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="grid gap-2 p-3">
                  <Link
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={() => setIsMenuOpen(false)}
                    to="/profile"
                  >
                    Profile details
                  </Link>
                  <button
                    className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                    onClick={logout}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
