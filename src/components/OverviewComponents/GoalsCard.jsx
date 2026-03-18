import React, { useEffect, useMemo, useState } from "react";
import {
    Target,
    CircleCheck,
    Sparkles,
    ArrowUpRight,
    AlertCircle,
} from "lucide-react";

function GoalsCard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch("http://localhost:5000/tasks", {
                    credentials: "include",
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch tasks");
                }

                setTasks(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const visibleTasks = useMemo(() => tasks.slice(0, 5), [tasks]);

    const focusRate = useMemo(() => {
        if (!tasks.length) return 0;
        return Math.min(100, Math.round((visibleTasks.length / tasks.length) * 100));
    }, [tasks, visibleTasks]);

    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent backdrop-blur-2xl shadow-[0_20px_80px_rgba(59,130,246,0.25)]">

            {/* BLUE GLOW */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-blue-500/30 blur-3xl" />
                <div className="absolute -right-10 top-10 h-52 w-52 rounded-full bg-sky-400/25 blur-3xl" />
            </div>

            <div className="relative p-6 md:p-7">

                {/* HEADER */}
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">

                    <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-[0_12px_30px_rgba(59,130,246,0.4)]">
                            <Target size={24} />
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200">
                                <Sparkles size={12} />
                                Goals Intelligence
                            </div>

                            <h2 className="mt-3 text-2xl font-bold text-white">
                                Goals Overview
                            </h2>

                            <p className="mt-2 text-sm text-blue-100/80">
                                Track your priorities and stay focused on what matters.
                            </p>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-3 xl:min-w-[320px]">

                        <div className="rounded-[1.4rem] border border-blue-400/20 bg-blue-500/10 p-4 backdrop-blur-xl">
                            <p className="text-xs text-blue-200">Total Goals</p>
                            <p className="mt-2 text-3xl font-bold text-white">
                                {tasks.length}
                            </p>
                        </div>

                        <div className="rounded-[1.4rem] border border-cyan-400/20 bg-cyan-500/10 p-4 backdrop-blur-xl">
                            <p className="text-xs text-cyan-200">Focus</p>
                            <p className="mt-2 text-3xl font-bold text-white">
                                {focusRate}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                {loading ? (
                    <p className="mt-6 text-blue-200">Loading...</p>
                ) : error ? (
                    <div className="mt-6 flex items-center gap-3 text-red-400">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                ) : tasks.length === 0 ? (
                    <p className="mt-6 text-blue-200">No goals yet.</p>
                ) : (
                    <div className="mt-8 space-y-3">
                        {visibleTasks.map((task, index) => (
                            <div
                                key={task.id}
                                className="group/item flex items-center justify-between rounded-[1.4rem] border border-blue-400/20 bg-blue-500/10 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-blue-500/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                                        <CircleCheck size={16} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            {task.title}
                                        </p>
                                        <p className="text-xs text-blue-200/80">
                                            Goal #{index + 1}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-blue-200">
                                        Active
                                    </span>

                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-200 transition-all group-hover/item:bg-blue-400/30">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* PROGRESS */}
                <div className="mt-6 rounded-[1.4rem] border border-blue-400/20 bg-blue-500/10 p-4 backdrop-blur-xl">
                    <div className="mb-2 flex justify-between text-xs text-blue-200">
                        <span>Focus capacity</span>
                        <span className="text-cyan-200">{focusRate}%</span>
                    </div>

                    <div className="h-2 rounded-full bg-blue-500/20">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300"
                            style={{ width: `${focusRate}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalsCard;