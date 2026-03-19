import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, X, Sparkles, ArrowRight, Loader2 } from "lucide-react";

function EditHistoryButton({ task, onEdited }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setTitle(task.title);
        setOpen(true);
    };

    const handleClose = () => {
        if (loading) return;
        setOpen(false);
    };

    const handleSave = async () => {
        if (!title.trim()) return;

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/history/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ title: title.trim() }),
            });

            if (!res.ok) {
                throw new Error("Failed to update");
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] md:p-7 dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.50)]">

                {/* glow accents */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-yellow-200/40 blur-3xl dark:bg-yellow-500/20" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent dark:via-yellow-400/30" />

                <div className="relative">
                    {/* HEADER */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-100 bg-yellow-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-700 dark:border-yellow-400/20 dark:bg-yellow-500/10 dark:text-yellow-200">
                                <Sparkles size={12} />
                                Edit Entry
                            </div>

                            <h2 className="mt-3 text-xl font-semibold text-zinc-950 dark:text-white">
                                Edit history item
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Update the archived task title.
                            </p>
                        </div>

                        <button
                            onClick={handleClose}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* INPUT */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 dark:border-white/10 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-yellow-400 dark:focus:ring-yellow-500/20"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={handleClose}
                            disabled={loading}
                            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={loading || !title.trim()}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:-translate-y-0.5 disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={15} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Save Changes
                                    <ArrowRight size={14} />
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
                onClick={handleOpen}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-200 bg-white text-zinc-700 transition hover:bg-yellow-50 hover:text-yellow-700 dark:border-yellow-400/20 dark:bg-zinc-800 dark:text-yellow-200 dark:hover:bg-yellow-500/20"
            >
                <Pencil size={16} />
            </button>

            {typeof document !== "undefined" &&
                createPortal(modal, document.body)}
        </>
    );
}

export default EditHistoryButton;