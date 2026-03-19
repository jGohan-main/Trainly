import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, Loader2, X } from "lucide-react";

function EditTaskButton({ task, onUpdated }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!title.trim()) return;

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    title,
                    isDone: task.isDone,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update task");
            }

            onUpdated?.(data);
            setOpen(false);
        } catch (err) {
            console.error(err);
            alert(err.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) return;
        setTitle(task.title || "");
        setOpen(false);
    };

    const modal = open ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] md:p-7 dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.50)]">
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/20" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent dark:via-blue-400/30" />

                <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
                                <Pencil size={12} />
                                Edit Entry
                            </div>

                            <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                Edit task
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                                Refine the title to keep your focus list clean and intentional.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Task title
                            </label>

                            <input
                                autoFocus
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-white/10 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-1">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={loading || !title.trim()}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(59,130,246,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(59,130,246,0.30)] disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={15} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Pencil size={15} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="group inline-flex h-10 items-center gap-2 rounded-[1rem] border border-zinc-200/80 bg-white/70 px-3.5 text-sm font-medium text-zinc-700 shadow-[0_8px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/10 dark:text-zinc-200 dark:shadow-[0_8px_24px_rgba(0,0,0,0.18)] dark:hover:border-white/20 dark:hover:bg-white/15 dark:hover:text-white"
            >
                <Pencil
                    size={15}
                    className="transition-transform duration-200 group-hover:scale-105"
                />
                <span>Edit</span>
            </button>

            {typeof document !== "undefined" && createPortal(modal, document.body)}
        </>
    );
}

export default EditTaskButton;