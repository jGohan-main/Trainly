import React, { useEffect, useMemo, useState } from "react";
import { Dumbbell, CalendarDays } from "lucide-react";

function FitnessCard() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const today = now.getDate();

    useEffect(() => {
        const fetchCurrentMonthWorkouts = async () => {
            try {
                setLoading(true);

                const exerciseRes = await fetch("http://localhost:5000/exercise", {
                    credentials: "include",
                });

                const exerciseData = await exerciseRes.json();

                if (!exerciseRes.ok) {
                    throw new Error(exerciseData.error || "Failed to fetch exercise months");
                }

                const currentExerciseMonth = exerciseData.find(
                    (item) =>
                        Number(item.month) === currentMonth &&
                        Number(item.year) === currentYear
                );

                if (!currentExerciseMonth) {
                    setWorkouts([]);
                    return;
                }

                const workoutRes = await fetch(
                    `http://localhost:5000/workouts/${currentExerciseMonth.id}`,
                    {
                        credentials: "include",
                    }
                );

                const workoutData = await workoutRes.json();

                if (!workoutRes.ok) {
                    throw new Error(workoutData.error || "Failed to fetch workouts");
                }

                setWorkouts(Array.isArray(workoutData) ? workoutData : []);
            } catch (err) {
                console.error(err);
                setWorkouts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentMonthWorkouts();
    }, [currentMonth, currentYear]);

    const sortedWorkouts = useMemo(() => {
        return [...workouts].sort((a, b) => Number(a.day) - Number(b.day));
    }, [workouts]);

    const workoutDays = useMemo(
        () => sortedWorkouts.map((w) => Number(w.day)),
        [sortedWorkouts]
    );

    const lastWorkout =
        sortedWorkouts.length > 0
            ? sortedWorkouts[sortedWorkouts.length - 1]
            : null;

    const twoWeekBars = useMemo(() => {
        const activeDays = new Set(workoutDays);
        const startDay = Math.max(1, today - 14);

        return Array.from({ length: today - startDay + 1 }, (_, i) => {
            const day = startDay + i;
            return {
                day,
                active: activeDays.has(day),
                isToday: day === today,
            };
        });
    }, [today, workoutDays]);

    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-purple-200/80 bg-gradient-to-br from-purple-100/80 via-fuchsia-50 to-white shadow-[0_20px_80px_rgba(168,85,247,0.10)] backdrop-blur-2xl dark:border-purple-400/20 dark:bg-gradient-to-br dark:from-purple-500/10 dark:via-fuchsia-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(168,85,247,0.25)]">
            {/* PURPLE GLOW */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/30" />
                <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-400/25" />
            </div>

            <div className="relative p-6 md:p-7">
                {/* HEADER */}
                <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-purple-500 to-fuchsia-400 text-white shadow-[0_12px_30px_rgba(168,85,247,0.28)] dark:shadow-[0_12px_30px_rgba(168,85,247,0.4)]">
                        <Dumbbell size={24} />
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/60 bg-purple-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-700 dark:border-purple-400/20 dark:bg-purple-500/10 dark:text-purple-200">
                            <CalendarDays size={12} />
                            Last 2 Weeks
                        </div>

                        <h2 className="mt-3 text-2xl font-semibold text-zinc-950 dark:text-white">
                            Fitness Overview
                        </h2>

                        <p className="mt-2 text-sm text-zinc-600 dark:text-purple-100/80">
                            Showing today and the previous 14 days
                        </p>
                    </div>
                </div>

                {/* STATS */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-purple-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-purple-400/20 dark:bg-purple-500/10">
                        <p className="text-xs uppercase text-zinc-500 dark:text-purple-200">
                            Workout Days
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
                            {twoWeekBars.filter((item) => item.active).length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-fuchsia-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-fuchsia-400/20 dark:bg-fuchsia-500/10">
                        <p className="text-xs uppercase text-zinc-500 dark:text-fuchsia-200">
                            Last Workout
                        </p>
                        <p className="mt-2 text-sm font-semibold text-zinc-950 dark:text-white">
                            {lastWorkout?.workoutType || "None"}
                        </p>
                    </div>
                </div>

                {/* CHART */}
                <div className="mt-8 rounded-[1.75rem] border border-purple-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-purple-400/20 dark:bg-purple-500/10">
                    {loading ? (
                        <p className="text-sm text-zinc-600 dark:text-purple-200">
                            Loading workouts...
                        </p>
                    ) : (
                        <div className="flex items-end gap-2 overflow-hidden rounded-2xl border border-purple-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-purple-400/20 dark:bg-purple-500/10">
                            {twoWeekBars.map((item) => (
                                <div
                                    key={item.day}
                                    className="flex flex-1 flex-col items-center gap-2"
                                >
                                    <div
                                        className={`w-full rounded-t-xl transition-all duration-500 ${item.active
                                                ? "h-20 bg-gradient-to-t from-purple-600 via-fuchsia-500 to-pink-300 shadow-[0_10px_24px_rgba(168,85,247,0.22)] dark:shadow-[0_10px_24px_rgba(168,85,247,0.28)]"
                                                : "h-6 bg-purple-200 dark:bg-purple-500/20"
                                            } ${item.isToday
                                                ? "ring-2 ring-fuchsia-400/80 dark:ring-fuchsia-300/80"
                                                : ""
                                            }`}
                                    />

                                    <p
                                        className={`text-[10px] ${item.isToday
                                                ? "font-semibold text-fuchsia-700 dark:text-fuchsia-200"
                                                : "text-zinc-500 dark:text-purple-200/75"
                                            }`}
                                    >
                                        {item.day}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FitnessCard;