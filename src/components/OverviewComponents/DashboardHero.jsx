import React from "react";
import {
    LayoutDashboard,
    Sparkles,
    Crown,
    ChevronRight,
    Star,
} from "lucide-react";

function DashboardHero({ user }) {
    const level = 3;
    const currentXp = 72;
    const nextLevelXp = 100;
    const xpPercent = (currentXp / nextLevelXp) * 100;

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            {/* subtle glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-zinc-200/60 blur-3xl dark:bg-white/10" />
                <div className="absolute right-0 top-10 h-44 w-44 rounded-full bg-zinc-300/40 blur-3xl dark:bg-white/5" />
            </div>

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT */}
                <div className="max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300">
                        <LayoutDashboard size={14} />
                        Dashboard Overview
                    </div>

                    <h1 className="text-[2.5rem] font-semibold tracking-[-0.06em] text-zinc-950 md:text-[3rem] dark:text-white">
                        Welcome back{user?.name ? `, ${user.name}` : ""}
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 md:text-[15px] dark:text-zinc-400">
                        Your personal command center for goals, focus, progress, and momentum.
                    </p>

                    {/* XP CARD */}
                    <div className="mt-6 max-w-2xl rounded-[1.6rem] border border-zinc-200/80 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                                    <Crown size={12} />
                                    Progress
                                </div>

                                <div className="mt-3 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white">
                                        <Star size={18} />
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                                            Level
                                        </p>
                                        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
                                            {level}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:max-w-[320px]">
                                <div className="mb-2 flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                                    <span>XP</span>
                                    <span>{currentXp}/{nextLevelXp}</span>
                                </div>

                                <div className="h-3 rounded-full bg-zinc-200 dark:bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(59,130,246,0.45)]"
                                        style={{ width: `${xpPercent}%` }}
                                    />
                                </div>

                                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                                    {nextLevelXp - currentXp} XP to next level
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="grid gap-4 lg:w-[360px]">
                    {/* PROFILE */}
                    <div className="rounded-[1.8rem] border border-zinc-200/80 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                        <div className="mb-4 flex justify-between">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                                    Profile
                                </p>
                                <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                                    Identity
                                </h3>
                            </div>

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                                <ChevronRight size={16} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-900 dark:bg-white/10 dark:text-white">
                                {user?.name?.[0]?.toUpperCase() || "U"}
                            </div>

                            <div>
                                <p className="font-semibold text-zinc-950 dark:text-white">
                                    {user?.name || "User"}
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {user?.email || "Workspace"}
                                </p>

                                <div className="mt-2 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                    <Sparkles size={12} />
                                    Active
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DAILY */}
                    <div className="rounded-[1.8rem] border border-zinc-200/80 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                        <p className="text-xs uppercase text-zinc-500 dark:text-zinc-400">
                            Daily Focus
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">
                            Stay consistent
                        </h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            One clear priority. Keep it simple.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardHero;