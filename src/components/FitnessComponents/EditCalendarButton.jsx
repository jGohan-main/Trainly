import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, X, Sparkles, ArrowRight, Loader2 } from "lucide-react";

function EditCalendarButton({ calendar, onEdited }) {
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState(calendar.month);
    const [year, setYear] = useState(calendar.year);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setMonth(calendar.month);
        setYear(calendar.year);
        setOpen(true);
    };

    const handleClose = () => {
        if (loading) return;
        setOpen(false);
    };

    const handleSave = async () => {
        const monthNumber = Number(month);
        const yearNumber = Number(year);

        if (monthNumber < 1 || monthNumber > 12) return;
        if (!yearNumber) return;

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/exercise/${calendar.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    month: monthNumber,
                    year: yearNumber,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update calendar");
            }

            const updated = await res.json();
            onEdited?.(updated);
            setOpen(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const modal = open ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(15,23,42,0.34)] px-4 backdrop-blur-md dark:bg-[rgba(2,6,23,0.55)]">
            <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.20)] backdrop-blur-2xl md:p-7 dark:border-white/10 dark:bg-zinc-950/85 dark:shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.82),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_35%)]" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-200/30 blur-3xl dark:bg-violet-500/20" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/70 to-transparent dark:via-violet-400/30" />

                <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-200">
                                <Sparkles size={12} />
                                Edit Month
                            </div>

                            <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                Edit workout month
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Update the month and year for this workout calendar.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-zinc-500 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-zinc-400 dark:hover:bg-white/15 dark:hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Month
                            </label>

                            <div className="group flex items-center rounded-[1.15rem] border border-white/70 bg-white/82 px-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-violet-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100/80 dark:border-white/10 dark:bg-white/10 dark:focus-within:border-violet-400/30 dark:focus-within:bg-white/12 dark:focus-within:ring-violet-500/10">
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    placeholder="Enter number (1-12)"
                                    className="w-full bg-transparent py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none dark:text-white dark:placeholder:text-zinc-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Year
                            </label>

                            <div className="group flex items-center rounded-[1.15rem] border border-white/70 bg-white/82 px-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-violet-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100/80 dark:border-white/10 dark:bg-white/10 dark:focus-within:border-violet-400/30 dark:focus-within:bg-white/12 dark:focus-within:ring-violet-500/10">
                                <input
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full bg-transparent py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none dark:text-white dark:placeholder:text-zinc-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="rounded-[1rem] border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white/15"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={loading}
                            className="group inline-flex items-center gap-2 rounded-[1rem] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(168,85,247,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(168,85,247,0.30)] disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={15} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <span>Save Changes</span>
                                    <ArrowRight
                                        size={15}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                                    />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <button
                type="button"
                onClick={handleOpen}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-purple-200/80 bg-white/80 text-zinc-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-400/20 dark:bg-white/10 dark:text-purple-200 dark:hover:bg-purple-500/20 dark:hover:text-white"
            >
                <Pencil
                    size={16}
                    className="transition-transform duration-200 group-hover:scale-105"
                />
            </button>

            {typeof document !== "undefined" ? createPortal(modal, document.body) : null}
        </>
    );
}

export default EditCalendarButton;