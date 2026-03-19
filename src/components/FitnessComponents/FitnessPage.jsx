import React, { useEffect, useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Dumbbell,
    Sparkles,
    CalendarDays,
} from "lucide-react";
import CreateExerciseMonthButton from "./CreateCalendarButton";
import MonthCalendar from "./MonthCalendar";
import DeleteCalendarButton from "./DeleteCalendarButton";
import EditCalendarButton from "./EditCalendarButton";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function FitnessPage() {
    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchMonths = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch("http://localhost:5000/exercise", {
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch months");
            }

            const sortedMonths = [...data].sort((a, b) => {
                if (b.year !== a.year) return b.year - a.year;
                return b.month - a.month;
            });

            setMonths(sortedMonths);

            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();

            const foundIndex = sortedMonths.findIndex(
                (m) => Number(m.month) === currentMonth && Number(m.year) === currentYear
            );

            setCurrentIndex(foundIndex !== -1 ? foundIndex : 0);
        } catch (err) {
            console.error("fetchMonths error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMonths();
    }, []);

    const handleCreated = () => {
        fetchMonths();
    };

    const currentMonth = useMemo(() => {
        if (months.length === 0) return null;
        return months[currentIndex];
    }, [months, currentIndex]);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, months.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="space-y-6 p-6">
            {/* HERO / HEADER */}
            <section className="relative overflow-hidden rounded-[2rem] border border-purple-200/80 bg-gradient-to-br from-purple-100/80 via-fuchsia-50 to-white p-6 shadow-[0_20px_80px_rgba(168,85,247,0.10)] backdrop-blur-2xl dark:border-purple-400/20 dark:from-purple-500/10 dark:via-fuchsia-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(168,85,247,0.22)] md:p-7">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/30" />
                    <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-400/25" />
                </div>

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-purple-500 to-fuchsia-400 text-white shadow-[0_12px_30px_rgba(168,85,247,0.28)] dark:shadow-[0_12px_30px_rgba(168,85,247,0.4)]">
                            <Dumbbell size={24} />
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/60 bg-purple-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-700 dark:border-purple-400/20 dark:bg-purple-500/10 dark:text-purple-200">
                                <Sparkles size={12} />
                                Fitness System
                            </div>

                            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white">
                                Workout Calendar
                            </h1>

                            <p className="mt-2 text-sm text-zinc-600 dark:text-purple-100/80">
                                Organize each month, navigate your workout history, and keep
                                your training visible.
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0">
                        <CreateExerciseMonthButton onCreated={handleCreated} />
                    </div>
                </div>
            </section>

            {loading && (
                <div className="rounded-[1.6rem] border border-purple-200/80 bg-white/70 p-5 text-sm text-zinc-600 backdrop-blur-xl dark:border-purple-400/20 dark:bg-purple-500/10 dark:text-purple-200">
                    Loading month...
                </div>
            )}

            {error && (
                <div className="rounded-[1.6rem] border border-red-200 bg-red-50 p-5 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                    {error}
                </div>
            )}

            {!loading && !error && months.length === 0 && (
                <div className="rounded-[1.6rem] border border-dashed border-purple-200/80 bg-white/70 p-8 text-center backdrop-blur-xl dark:border-purple-400/20 dark:bg-purple-500/10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200">
                        <CalendarDays size={22} />
                    </div>
                    <p className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
                        No workout months yet.
                    </p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-purple-100/75">
                        Create your first workout month to start tracking your calendar.
                    </p>
                </div>
            )}

            {!loading && !error && currentMonth && (
                <section className="space-y-5">
                    {/* TOP CONTROL BAR */}
                    <div className="rounded-[1.75rem] border border-purple-200/80 bg-white/70 p-4 shadow-[0_12px_34px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-purple-400/20 dark:bg-purple-500/10 dark:shadow-[0_12px_34px_rgba(0,0,0,0.18)]">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={currentIndex === months.length - 1}
                                    className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-purple-200/80 bg-white/80 text-zinc-700 shadow-sm transition hover:bg-purple-50 hover:text-purple-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-purple-400/20 dark:bg-white/10 dark:text-purple-200 dark:hover:bg-purple-500/20 dark:hover:text-white"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-purple-200">
                                        Current Month
                                    </p>
                                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                                        {monthNames[currentMonth.month - 1]} {currentMonth.year}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={currentIndex === 0}
                                    className="ml-1 flex h-11 w-11 items-center justify-center rounded-[1rem] border border-purple-200/80 bg-white/80 text-zinc-700 shadow-sm transition hover:bg-purple-50 hover:text-purple-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-purple-400/20 dark:bg-white/10 dark:text-purple-200 dark:hover:bg-purple-500/20 dark:hover:text-white"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <EditCalendarButton
                                    calendar={currentMonth}
                                    onEdited={(updatedCalendar) => {
                                        setMonths((prev) =>
                                            prev.map((m) =>
                                                m.id === updatedCalendar.id ? updatedCalendar : m
                                            )
                                        );
                                    }}
                                />

                                <DeleteCalendarButton
                                    id={currentMonth.id}
                                    onDeleted={(id) => {
                                        setMonths((prev) => prev.filter((m) => m.id !== id));
                                        setCurrentIndex(0);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* CALENDAR SHELL */}
                    <div className="rounded-[2rem] border border-purple-200/80 bg-white/70 p-4 shadow-[0_20px_80px_rgba(168,85,247,0.08)] backdrop-blur-2xl dark:border-purple-400/20 dark:bg-purple-500/10 dark:shadow-[0_20px_80px_rgba(168,85,247,0.18)] md:p-5">
                        <MonthCalendar
                            month={currentMonth.month}
                            year={currentMonth.year}
                            exerciseDateId={currentMonth.id}
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

export default FitnessPage;