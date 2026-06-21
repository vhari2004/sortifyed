import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { saveStoredProfile } from "../utils/profile";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    roleTitle: "",
    location: "",
    skills: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await API.post("/accounts/register/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      saveStoredProfile({
        username: form.username,
        email: form.email,
        fullName: form.fullName || form.username,
        roleTitle: form.roleTitle || "Job seeker",
        location: form.location,
        skills: form.skills,
      });
      navigate("/login");
    } catch (requestError) {
      console.error(requestError);
      setError("We could not create your account. Please check the details.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 sm:p-8">
            <div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                Create your profile
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                Start tracking better job matches
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Set up your account to search, save, and compare opportunities.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={registerUser}>
              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full name
                </span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                />
              </label>

              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Username
                </span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={(event) =>
                    updateField("username", event.target.value)
                  }
                  required
                />
              </label>

              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</span>
                <input
                  type="email"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                />
              </label>

              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </span>
                <input
                  type="password"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  placeholder="Create a secure password"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  required
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-left">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Role title
                  </span>
                  <input
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                    placeholder="Frontend Developer"
                    value={form.roleTitle}
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
                    placeholder="Bengaluru"
                    value={form.location}
                    onChange={(event) =>
                      updateField("location", event.target.value)
                    }
                  />
                </label>
              </div>

              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Skills
                </span>
                <textarea
                  className="mt-2 min-h-24 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  placeholder="React, Django, Python"
                  value={form.skills}
                  onChange={(event) => updateField("skills", event.target.value)}
                />
              </label>

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500/20"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <section className="hidden lg:block">
          <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-400">
            Job search workspace
          </p>
          <h2 className="mt-4 max-w-xl text-5xl font-semibold leading-tight text-slate-950 dark:text-white">
            Keep your search organized from day one.
          </h2>
          <div className="mt-8 max-w-xl space-y-3">
            {[
              "Review roles from multiple sources in one place.",
              "Save interesting jobs before they disappear.",
              "Use match scores to prioritize your applications.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-white px-5 py-4 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
