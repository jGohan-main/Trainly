import React, { useEffect, useMemo, useState } from "react";
import {
    X,
    CalendarDays,
    Dumbbell,
    Sparkles,
    ChevronRight,
} from "lucide-react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function MonthCalendar({ month, year, exerciseDateId }) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [workoutType, setWorkoutType] = useState("");
    const [workouts, setWorkouts] = useState([]);

    const today = new Date();
    const isCurrentMonth =
        today.getMonth() + 1 === month && today.getFullYear() === year;
    const todayDate = today.getDate();

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    const cells = [];

    for (let i = 0; i < startDay; i++) {
        cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        cells.push(day);
    }

    const fetchWorkouts = async () => {
        try {
            const res = await fetch(`http://localhost:5000/workouts/${exerciseDateId}`, {
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch workouts");
            }

            setWorkouts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching workouts:", err);
        }
    };

    useEffect(() => {
        if (exerciseDateId) {
            fetchWorkouts();
        }
    }, [exerciseDateId]);

    const workoutsByDay = useMemo(() => {
        return workouts.reduce((acc, workout) => {
            acc[Number(workout.day)] = workout;
            return acc;
        }, {});
    }, [workouts]);

    const totalWorkoutDays = workouts.length;

    const handleDayClick = (day) => {
        const existingWorkout = workouts.find((w) => Number(w.day) === Number(day));
        setSelectedDay(day);
        setWorkoutType(existingWorkout ? existingWorkout.workoutType : "");
    };

    const closeModal = () => {
        setSelectedDay(null);
        setWorkoutType("");
    };

    const handleSave = async () => {
        try {
            const res = await fetch("http://localhost:5000/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    day: selectedDay,
                    month,
                    year,
                    workoutType,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to save workout");
            }

            await fetchWorkouts();
            closeModal();
        } catch (err) {
            console.error("Error saving workout:", err);
        }
    };

    const getWorkoutForDay = (day) => workoutsByDay[day];

    return (
        <>
            <div className="relative overflow-hidden rounded-[2rem] border border-purple-200/80 bg-gradient-to-br from-purple-100/80 via-fuchsia-50 to-white p-5 shadow-[0_20px_80px_rgba(168,85,247,0.10)] backdrop-blur-2xl dark:border-purple-400/20 dark:bg-gradient-to-br dark:from-purple-500/10 dark:via-fuchsia-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(168,85,247,0.22)] md:p-6">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/30" />
                    <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-400/25" />
                </div>

                <div className="relative">
                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-purple-500 to-fuchsia-400 text-white shadow-[0_12px_30px_rgba(168,85,247,0.28)] dark:shadow-[0_12px_30px_rgba(168,85,247,0.4)]">
                                <CalendarDays size={22} />
                            </div>

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/60 bg-purple-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-700 dark:border-purple-400/20 dark:bg-purple-500/10 dark:text-purple-200">
                                    <Sparkles size={12} />
                                    Monthly Training
                                </div>

                                <h2 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white">
                                    {monthNames[month - 1]} {year}
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-purple-100/80">
                                    A clean view of your training rhythm, recovery flow,
                                    and consistency across the month.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:min-w-[220px]">
                            <div className="rounded-[1.25rem] border border-purple-200/80 bg-white/70 p-4 shadow-[0_10px_24px_rgba(168,85,247,0.08)] backdrop-blur-xl dark:border-purple-400/20 dark:bg-purple-500/10">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-purple-200">
                                    Workout Days
                                </p>
                                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                    {totalWorkoutDays}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Weekday header */}
                    <div className="mb-4 grid grid-cols-7 gap-2">
                        {weekDays.map((day) => (
                            <div
                                key={day}
                                className="rounded-xl border border-purple-200/80 bg-white/70 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 shadow-sm backdrop-blur-xl dark:border-purple-400/20 dark:bg-purple-500/10 dark:text-purple-200"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-2 md:gap-3">
                        {cells.map((day, index) => {
                            const workout = day ? getWorkoutForDay(day) : null;
                            const isToday = isCurrentMonth && day === todayDate;

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={!day}
                                    onClick={() => day && handleDayClick(day)}
                                    className={[
                                        "group relative min-h-[96px] overflow-hidden rounded-[1.1rem] border p-3 text-left transition-all duration-300 md:min-h-[104px]",
                                        day
                                            ? "border-purple-200/80 bg-white/72 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:-translate-y-0.5 hover:border-purple-300 hover:bg-white hover:shadow-[0_16px_34px_rgba(168,85,247,0.10)] dark:border-purple-400/20 dark:bg-purple-500/10 dark:hover:border-purple-400/30 dark:hover:bg-purple-500/20 dark:hover:shadow-[0_16px_34px_rgba(168,85,247,0.18)]"
                                            : "cursor-default border-transparent bg-transparent shadow-none",
                                        isToday
                                            ? "ring-2 ring-fuchsia-400/70 dark:ring-fuchsia-300/80"
                                            : "",
                                    ].join(" ")}
                                >
                                    {day && (
                                        <>
                                            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                                                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-purple-200/60 blur-2xl dark:bg-purple-400/20" />
                                            </div>

                                            <div className="relative flex h-full flex-col">
                                                <div className="flex items-start justify-between">
                                                    <div
                                                        className={[
                                                            "flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm font-semibold transition-all duration-300",
                                                            workout
                                                                ? "bg-gradient-to-br from-purple-500 to-fuchsia-400 text-white shadow-sm"
                                                                : "bg-purple-100 text-zinc-700 dark:bg-purple-500/20 dark:text-white",
                                                        ].join(" ")}
                                                    >
                                                        {day}
                                                    </div>

                                                    {isToday && (
                                                        <span className="rounded-full bg-fuchsia-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-200">
                                                            Today
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mt-3 flex-1">
                                                    {workout ? (
                                                        <div className="rounded-[1rem] border border-purple-200/80 bg-gradient-to-br from-purple-50 to-fuchsia-50 px-3 py-2 shadow-sm dark:border-purple-400/20 dark:from-purple-500/15 dark:to-fuchsia-500/10">
                                                            <div className="mb-1 flex items-center gap-2">
                                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-400 text-white">
                                                                    <Dumbbell size={12} />
                                                                </div>
                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-700 dark:text-purple-200">
                                                                    Workout
                                                                </p>
                                                            </div>

                                                            <p className="line-clamp-2 text-xs font-medium leading-5 text-zinc-800 dark:text-white">
                                                                {workout.workoutType}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex h-full items-end">
                                                            <p className="text-[11px] font-medium text-zinc-400 transition group-hover:text-zinc-500 dark:text-purple-200/55 dark:group-hover:text-purple-200/80">
                                                                Add session
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {selectedDay && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.30)] p-4 backdrop-blur-md dark:bg-[rgba(2,6,23,0.55)]">
                    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.20)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/85 dark:shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.82),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_35%)]" />
                        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-500/20" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent dark:via-violet-400/30" />

                        <div className="relative">
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-200">
                                        <Sparkles size={12} />
                                        Training Entry
                                    </div>

                                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                        Add Workout
                                    </h2>

                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                        {monthNames[month - 1]} {selectedDay}, {year}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-zinc-500 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-zinc-400 dark:hover:bg-white/15 dark:hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Workout type
                                </label>

                                <div className="group flex items-center rounded-[1.15rem] border border-white/70 bg-white/82 px-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-violet-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100/80 dark:border-white/10 dark:bg-white/10 dark:focus-within:border-violet-400/30 dark:focus-within:bg-white/12 dark:focus-within:ring-violet-500/10">
                                    <Dumbbell
                                        size={17}
                                        className="text-zinc-400 transition group-focus-within:text-violet-600 dark:text-zinc-500 dark:group-focus-within:text-violet-300"
                                    />
                                    <input
                                        type="text"
                                        value={workoutType}
                                        onChange={(e) => setWorkoutType(e.target.value)}
                                        placeholder="Example: Chest, Legs, Back..."
                                        className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none dark:text-white dark:placeholder:text-zinc-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-[1rem] border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white/15"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={!workoutType.trim()}
                                    className="group inline-flex items-center gap-2 rounded-[1rem] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(168,85,247,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(168,85,247,0.30)] disabled:opacity-60"
                                >
                                    <span>Save Workout</span>
                                    <ChevronRight
                                        size={15}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MonthCalendar;