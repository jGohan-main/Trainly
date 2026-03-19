import { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    ChevronDown,
    ChevronRight,
    Sparkles,
    Archive,
    BadgeCheck,
    TimerReset,
} from "lucide-react";
import DeleteHistoryButton from "./DeleteHistoryButton";
import EditHistoryButton from "./EditHistoryButton";

function HistoryList() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                setErr("");

                const res = await fetch("http://localhost:5000/history", {
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch history (${res.status})`);
                }

                const data = await res.json();

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.history)
                        ? data.history
                        : [];

                setHistory(list);
            } catch (e) {
                setErr(e.message || "Error fetching history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const totalArchived = history.length;

    const groupedHistory = useMemo(() => {
        const groups = {};

        for (const task of history) {
            const dateValue = task.doneAt || task.archivedAt || task.createdAt;
            const date = new Date(dateValue);

            const dateLabel = date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            if (!groups[dateLabel]) {
                groups[dateLabel] = {
                    label: dateLabel,
                    rawDate: date,
                    tasks: [],
                };
            }

            groups[dateLabel].tasks.push(task);
        }

        return Object.values(groups).sort((a, b) => b.rawDate - a.rawDate);
    }, [history]);

    const toggleSection = (dateLabel) => {
        setOpenSections((prev) => ({
            ...prev,
            [dateLabel]: !prev[dateLabel],
        }));
    };

    const formatTime = (value) => {
        if (!value) return "Time unavailable";
        return new Date(value).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    };

    const getSectionSubtitle = (rawDate) => {
        const today = new Date();
        const target = new Date(rawDate);

        const todayOnly = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const targetOnly = new Date(
            target.getFullYear(),
            target.getMonth(),
            target.getDate()
        );

        const diffMs = todayOnly - targetOnly;
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Completed today";
        if (diffDays === 1) return "Completed yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        return "Archived activity";
    };

    if (loading) {
        return (
            <div className="rounded-[2rem] border border-yellow-200/80 bg-gradient-to-br from-yellow-100/80 via-amber-50 to-white p-6 shadow-[0_20px_80px_rgba(234,179,8,0.10)] backdrop-blur-2xl dark:border-yellow-400/20 dark:from-yellow-500/10 dark:via-amber-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(234,179,8,0.22)]">
                <div className="mb-6 flex items-center gap-4">
                    <div className="h-14 w-14 animate-pulse rounded-[1.25rem] bg-yellow-200/70 dark:bg-yellow-500/20" />
                    <div className="flex-1">
                        <div className="h-4 w-40 animate-pulse rounded-full bg-yellow-200/70 dark:bg-yellow-500/20" />
                        <div className="mt-3 h-3 w-28 animate-pulse rounded-full bg-yellow-200/70 dark:bg-yellow-500/20" />
                    </div>
                </div>

                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-[1.5rem] border border-yellow-200/80 bg-white/70 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-yellow-400/20 dark:bg-yellow-500/10"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <div className="h-4 w-52 animate-pulse rounded-full bg-yellow-200/70 dark:bg-yellow-500/20" />
                                    <div className="mt-3 h-3 w-24 animate-pulse rounded-full bg-yellow-200/70 dark:bg-yellow-500/20" />
                                </div>
                                <div className="h-10 w-24 animate-pulse rounded-2xl bg-yellow-200/70 dark:bg-yellow-500/20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (err) {
        return (
            <div className="rounded-[2rem] border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-[0_20px_60px_rgba(239,68,68,0.08)] dark:border-red-500/20 dark:bg-red-500/10">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300">
                        <Archive size={20} />
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-red-700 dark:text-red-300">
                            Unable to load history
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-red-600 dark:text-red-200">
                            {err}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="rounded-[2rem] border border-yellow-200/80 bg-gradient-to-br from-yellow-100/80 via-amber-50 to-white p-10 shadow-[0_20px_80px_rgba(234,179,8,0.10)] backdrop-blur-2xl dark:border-yellow-400/20 dark:from-yellow-500/10 dark:via-amber-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(234,179,8,0.22)]">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500 text-white shadow-[0_16px_34px_rgba(245,158,11,0.18)]">
                        <Archive size={24} />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                        No history yet
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-yellow-100/80">
                        Once you archive completed tasks, they’ll appear here in a
                        beautifully organized timeline by date.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Top summary */}
            <div className="relative overflow-hidden rounded-[2rem] border border-yellow-200/80 bg-gradient-to-br from-yellow-100/80 via-amber-50 to-white p-6 shadow-[0_20px_80px_rgba(234,179,8,0.10)] backdrop-blur-2xl dark:border-yellow-400/20 dark:from-yellow-500/10 dark:via-amber-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(234,179,8,0.22)]">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-300/30 blur-3xl dark:bg-yellow-500/30" />
                    <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-400/25" />
                </div>

                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-[0_12px_30px_rgba(245,158,11,0.28)] dark:shadow-[0_12px_30px_rgba(245,158,11,0.4)]">
                            <Archive size={22} />
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/60 bg-yellow-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-700 dark:border-yellow-400/20 dark:bg-yellow-500/10 dark:text-yellow-200">
                                <Sparkles size={12} />
                                History Archive
                            </div>

                            <h1 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white">
                                Completion History
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-yellow-100/80">
                                A premium timeline of completed and archived tasks, grouped
                                by day so you can review your progress with clarity.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 lg:min-w-[280px]">
                        <div className="rounded-[1.25rem] border border-yellow-200/80 bg-white/70 p-4 shadow-[0_10px_24px_rgba(245,158,11,0.08)] backdrop-blur-xl dark:border-yellow-400/20 dark:bg-yellow-500/10">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-yellow-200">
                                Total Archived
                            </p>
                            <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                {totalArchived}
                            </p>
                        </div>

                        <div className="rounded-[1.25rem] border border-amber-200/80 bg-white/70 p-4 shadow-[0_10px_24px_rgba(234,179,8,0.08)] backdrop-blur-xl dark:border-amber-400/20 dark:bg-amber-500/10">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-amber-200">
                                Active Dates
                            </p>
                            <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                {groupedHistory.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grouped sections */}
            {groupedHistory.map((group) => {
                const { label: dateLabel, rawDate, tasks } = group;
                const isOpen = openSections[dateLabel] ?? false;
                const firstTime = tasks[0]?.doneAt || tasks[0]?.archivedAt || tasks[0]?.createdAt;

                return (
                    <section
                        key={dateLabel}
                        className={`relative overflow-hidden rounded-[2rem] border border-yellow-200/80 bg-white/70 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 dark:border-yellow-400/20 dark:bg-yellow-500/10 dark:shadow-[0_18px_50px_rgba(0,0,0,0.18)] ${isOpen ? "p-6" : "p-4"
                            }`}
                    >
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-400/15" />
                        </div>

                        <div className="relative">
                            {/* Header */}
                            <div
                                className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${isOpen ? "mb-4 border-b border-zinc-200/70 pb-4 dark:border-white/10" : ""
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_12px_24px_rgba(245,158,11,0.18)]">
                                        <CalendarDays size={20} />
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                                {dateLabel}
                                            </h2>

                                            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700 dark:bg-amber-500/10 dark:text-amber-200">
                                                {getSectionSubtitle(rawDate)}
                                            </span>
                                        </div>

                                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                                            <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-white/10">
                                                <BadgeCheck size={13} />
                                                <span>{tasks.length} completed</span>
                                            </div>

                                            <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-white/10">
                                                <TimerReset size={13} />
                                                <span>{formatTime(firstTime)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => toggleSection(dateLabel)}
                                    className="inline-flex items-center gap-2 rounded-[1rem] border border-yellow-200/80 bg-white/80 px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-yellow-50 hover:text-yellow-700 dark:border-yellow-400/20 dark:bg-white/10 dark:text-yellow-200 dark:hover:bg-yellow-500/20 dark:hover:text-white"
                                >
                                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    <span>{isOpen ? "Collapse" : "Expand"}</span>
                                </button>
                            </div>

                            {/* Content */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="space-y-3 pt-1">
                                    {tasks.map((task) => {
                                        const timeValue =
                                            task.doneAt || task.archivedAt || task.createdAt;

                                        return (
                                            <div
                                                key={task.id}
                                                className="group relative overflow-hidden rounded-[1.4rem] border border-yellow-200/80 bg-white/70 px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-300 hover:bg-yellow-50 dark:border-yellow-400/20 dark:bg-yellow-500/10 dark:hover:border-yellow-400/30 dark:hover:bg-yellow-500/20"
                                            >
                                                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                                    <div className="flex min-w-0 items-start gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-sm">
                                                            <CheckCircle2 size={18} />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <p className="truncate text-sm font-semibold text-zinc-950 md:text-[15px] dark:text-white">
                                                                    {task.title}
                                                                </p>

                                                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                                                                    Completed
                                                                </span>
                                                            </div>

                                                            <p className="mt-1 text-sm text-zinc-500 dark:text-yellow-100/75">
                                                                Archived in Trackly history for long-term review.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                                                        <EditHistoryButton
                                                            task={task}
                                                            onEdited={(updatedTask) => {
                                                                setHistory((prev) =>
                                                                    prev.map((t) =>
                                                                        t.id === updatedTask.id
                                                                            ? updatedTask
                                                                            : t
                                                                    )
                                                                );
                                                            }}
                                                        />

                                                        <DeleteHistoryButton
                                                            id={task.id}
                                                            onDeleted={(id) => {
                                                                setHistory((prev) =>
                                                                    prev.filter((t) => t.id !== id)
                                                                );
                                                            }}
                                                        />

                                                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200">
                                                            <Clock3 size={14} />
                                                            <span>{formatTime(timeValue)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default HistoryList;