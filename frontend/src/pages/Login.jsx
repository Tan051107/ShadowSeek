import { useState } from "react";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        const user = users.find(
            u =>
                u.email === email &&
                u.password === password
        );

        if (!user) {
            alert("Invalid Login");
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));

        switch(user.role){

            case "admin":
                navigate("/admin/governance");
                break;

            case "employee":
                navigate("/employee/emp_approval");
                break;

            default:
                navigate("/");
        }

    };

    return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.35),_transparent_35%)]" />
            <div className="relative">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                ShadowSeek
              </div>
              <h1 className="mt-8 text-3xl font-semibold tracking-tight">
                Turn Shadow AI into Governed AI
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Enterprise-Grade Visibility and Control for Responsible AI Adoption. No More Shadow AI. Just Governed AI.
              </p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-semibold">Fast onboarding</p>
                  <p className="text-sm text-slate-300">Start in minutes with guided access.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-slate-50/80 p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-indigo-600 shadow-sm">
                  ShadowSeek
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
                  Welcome back
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Access approvals and governance from a single dashboard.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Remember me
                  </label>
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-700">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
                >
                  Sign in
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
                Demo credentials:{" "}
                <span className="font-semibold text-slate-800">
                  admin@test.com / 123456
                </span>{" "}
                or{" "}
                <span className="font-semibold text-slate-800">
                  employee@test.com / 123456
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
