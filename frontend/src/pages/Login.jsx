import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { decodeToken, saveStoredProfile } from "../utils/profile";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await API.post("/token/", form);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      saveStoredProfile({
        ...decodeToken(response.data.access),
        fullName: form.username,
        username: form.username,
      });

      navigate("/");
    } catch (requestError) {
      console.error(requestError);
      setError("The username or password you entered is incorrect.");
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
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden lg:block">
          <p className="text-sm font-semibold uppercase text-blue-700 dark:text-blue-400">
            Sortifyed
          </p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold leading-tight text-slate-950 dark:text-white">
            Find roles worth your time, faster.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-400">
            Search curated job sources, keep track of saved roles, and focus on
            the opportunities that fit your next move.
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {["Curated feeds", "Saved roles", "Match scores"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 sm:p-8">
            <div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Continue to your job dashboard.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={login}>
              <label className="block text-left">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Username
                </span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(event) =>
                    updateField("username", event.target.value)
                  }
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
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  required
                />
              </label>

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-500/20"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              New to Sortifyed?{" "}
              <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/register">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
