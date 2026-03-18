import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckSquare,
    Sparkles,
    ArrowRight,
} from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Login failed");
                return;
            }

            navigate("/main");
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-6">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-140px] top-[-140px] h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
                <div className="absolute right-[-120px] top-[10%] h-96 w-96 rounded-full bg-violet-300/16 blur-3xl" />
                <div className="absolute bottom-[-120px] left-[8%] h-72 w-72 rounded-full bg-cyan-200/18 blur-3xl" />
            </div>

            <div className="relative w-full max-w-[540px] overflow-hidden rounded-[34px] border border-white/60 bg-white/68 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:p-7">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.78),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.16),transparent_36%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-200/20 blur-3xl" />

                <div className="relative">
                    {/* top row */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.35rem] text-white shadow-[0_14px_34px_rgba(15,23,42,0.20)]">
                                <div className="absolute inset-0 rounded-[1.35rem] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                                <div className="absolute inset-[1px] rounded-[1.28rem] bg-gradient-to-br from-white/15 to-transparent" />
                                <CheckSquare
                                    size={23}
                                    strokeWidth={2.3}
                                    className="relative z-10"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[1.85rem] font-semibold leading-none tracking-[-0.08em] text-zinc-950">
                                    Trackly
                                </p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                                    Journal • Tasks • History
                                </p>
                            </div>
                        </div>

                        <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sky-100 bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700 shadow-sm">
                            <Sparkles size={11} />
                            Premium
                        </div>
                    </div>

                    {/* headline */}
                    <div className="mb-6">
                        <h1 className="text-[2rem] font-semibold leading-[1] tracking-[-0.07em] text-zinc-950">
                            Welcome back
                        </h1>
                        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
                            Sign in to enter your personal workspace with goals, history,
                            routines, and everything beautifully in sync.
                        </p>
                    </div>

                    {/* form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="grid gap-4">
                            <div>
                                <label className="mb-2 block text-[13px] font-medium text-zinc-700">
                                    Email
                                </label>

                                <div className="group flex items-center rounded-[1.15rem] border border-white/70 bg-white/82 px-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-sky-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/80">
                                    <Mail
                                        size={18}
                                        className="text-zinc-400 transition group-focus-within:text-sky-600"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="block text-[13px] font-medium text-zinc-700">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs font-medium text-zinc-400 transition hover:text-sky-700"
                                    >
                                        Forgot?
                                    </button>
                                </div>

                                <div className="group flex items-center rounded-[1.15rem] border border-white/70 bg-white/82 px-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-sky-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/80">
                                    <Lock
                                        size={18}
                                        className="text-zinc-400 transition group-focus-within:text-sky-600"
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="text-zinc-400 transition hover:text-zinc-700"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-[1.15rem] bg-gradient-to-r from-zinc-900 via-zinc-800 to-black py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(15,23,42,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <span>{loading ? "Signing in..." : "Sign in"}</span>
                            {!loading && (
                                <ArrowRight
                                    size={16}
                                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                            )}
                        </button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-200" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                            Secure access
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-200" />
                    </div>

                    <p className="text-center text-sm text-zinc-500">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="cursor-pointer font-semibold text-zinc-950 transition hover:text-sky-700 hover:underline"
                        >
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;