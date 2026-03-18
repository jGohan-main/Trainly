import React, { useState } from "react";
import { CalendarPlus, X } from "lucide-react";

function CreateExerciseMonthButton({ onCreated }) {
    const now = new Date();

    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const closeModal = () => {
        if (loading) return;
        setOpen(false);
        setError("");
    };

    const handleCreate = async () => {
        try {
            setError("");

            const monthNumber = Number(month);
            const yearNumber = Number(year);

            if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
                setError("Month must be between 1 and 12");
                return;
            }

            if (!yearNumber || yearNumber < 2000 || yearNumber > 2100) {
                setError("Enter a valid year");
                return;
            }

            setLoading(true);

            const res = await fetch("http://localhost:5000/exercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    month: monthNumber,
                    year: yearNumber,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create exercise month");
            }

            onCreated?.(data);
            setOpen(false);
            setError("");
        } catch (err) {
            console.error("Create exercise month failed:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
                <CalendarPlus size={18} />
                <span>Add Workout Month</span>
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-5 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-900">
                                    Create Workout Month
                                </h2>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Enter the month and year you want to track.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">
                                    Month
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                                    placeholder="Enter month (1-12)"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">
                                    Year
                                </label>
                                <input
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                                    placeholder="Enter year"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={loading}
                                    className="rounded-xl border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-60"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCreate}
                                    disabled={loading}
                                    className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60"
                                >
                                    {loading ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateExerciseMonthButton;