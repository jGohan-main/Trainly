import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, CheckSquare } from "lucide-react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        try {
            setLoading(true);

            const signupRes = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim(),
                }),
            });

            const signupData = await signupRes.json();

            if (!signupRes.ok) {
                alert(signupData.error || "Signup failed");
                return;
            }

            // Automatically login after signup
            const loginRes = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim(),
                }),
            });

            if (!loginRes.ok) {
                alert("Login after signup failed");
                return;
            }

            navigate("/main");

        } catch (err) {
            console.error("Network/server error:", err);
            alert("Could not reach server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-100 px-4">
            <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-zinc-300/40 blur-3xl" />
            <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-zinc-400/20 blur-3xl" />

            <div className="relative w-full max-w-md rounded-[28px] border border-zinc-200/80 bg-white/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur">
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                            <CheckSquare
                                size={24}
                                strokeWidth={2.3}
                                className="relative z-10"
                            />
                        </div>

                        <div className="flex flex-col text-left leading-tight">
                            <span className="text-3xl font-semibold tracking-[-0.06em] text-zinc-900">
                                Trackly
                            </span>
                            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">
                                Journal • Tasks • History
                            </span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-zinc-900">
                        Create account
                    </h1>

                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
                        Start organizing your life with Trackly
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-700">
                            Email
                        </label>

                        <div className="flex items-center rounded-xl border border-zinc-300 bg-white px-3 transition duration-200 focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-200/70">
                            <Mail size={18} className="text-zinc-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-700">
                            Password
                        </label>

                        <div className="flex items-center rounded-xl border border-zinc-300 bg-white px-3 transition duration-200 focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-200/70">
                            <Lock size={18} className="text-zinc-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-zinc-200" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">
                        Get started
                    </span>
                    <div className="h-px flex-1 bg-zinc-200" />
                </div>

                <p className="text-center text-sm text-zinc-500">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="cursor-pointer font-semibold text-zinc-900 transition hover:underline"
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;