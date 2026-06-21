import { useState } from "react";
import AppHeader from "../components/AppHeader";
import {
  getCurrentProfile,
  getProfileInitials,
  saveStoredProfile,
} from "../utils/profile";

function Profile() {
  const [profile, setProfile] = useState(() => getCurrentProfile());
  const [status, setStatus] = useState("");

  const updateField = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
    setStatus("");
  };

  const saveProfile = (event) => {
    event.preventDefault();
    const savedProfile = saveStoredProfile(profile);

    setProfile(savedProfile);
    setStatus("Profile details saved.");
  };

  const initials = getProfileInitials(profile);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AppHeader description="Manage your account details and job-search preferences." />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-400">
              Profile
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950 dark:text-white">
              Your profile details
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Keep your details current so your workspace feels personal and
              your job search stays organized.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-blue-700 text-xl font-semibold text-white dark:bg-blue-500">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-slate-950 dark:text-white">
                    {profile.fullName}
                  </p>
                  <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    @{profile.username}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 text-sm">
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="font-medium text-slate-500 dark:text-slate-400">
                    Role
                  </p>
                  <p className="mt-1 text-slate-900 dark:text-slate-100">
                    {profile.roleTitle}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="font-medium text-slate-500 dark:text-slate-400">
                    Skills
                  </p>
                  <p className="mt-1 text-slate-900 dark:text-slate-100">
                    {profile.skills || "Add skills to personalize your profile."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
            onSubmit={saveProfile}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-left sm:col-span-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full name
                </span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  value={profile.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  required
                />
              </label>

              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Username
                </span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  value={profile.username}
                  onChange={(event) =>
                    updateField("username", event.target.value)
                  }
                  required
                />
              </label>

              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  type="email"
                  value={profile.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </label>

              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Role title
                </span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  value={profile.roleTitle}
                  onChange={(event) =>
                    updateField("roleTitle", event.target.value)
                  }
                />
              </label>

              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Location
                </span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  value={profile.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                />
              </label>

              <label className="block text-left sm:col-span-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Skills
                </span>
                <textarea
                  className="mt-2 min-h-28 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  placeholder="Python, React, Django, SQL"
                  value={profile.skills}
                  onChange={(event) =>
                    updateField("skills", event.target.value)
                  }
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500/20"
                type="submit"
              >
                Save profile
              </button>
              {status && (
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {status}
                </p>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
