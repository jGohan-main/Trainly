import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-zinc-900">
                    Workout Calendar
                </h1>

                <CreateExerciseMonthButton onCreated={handleCreated} />
            </div>

            {loading && (
                <p className="text-sm text-zinc-500">Loading month...</p>
            )}

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {!loading && !error && months.length === 0 && (
                <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
                    No workout months yet.
                </div>
            )}

            {!loading && !error && currentMonth && (
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handlePrev}
                            disabled={currentIndex === months.length - 1}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft size={18} />
                        </button>

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

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={currentIndex === 0}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <MonthCalendar
                        month={currentMonth.month}
                        year={currentMonth.year}
                        exerciseDateId={currentMonth.id}
                    />
                </div>
            )
            }
        </div >
    );
}

export default FitnessPage;