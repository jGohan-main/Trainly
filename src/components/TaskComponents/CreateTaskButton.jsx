import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Plus, X, Sparkles, ArrowRight, CheckSquare2 } from "lucide-react";

const CreateTask = ({ onCreated }) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCreate = async () => {
        if (!title.trim()) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ title }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to create task");
                return;
            }

            setTitle("");
            setOpen(false);
            onCreated?.(data);
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) return;
        setOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleCreate();
        }

        if (e.key === "Escape") {
            handleClose();
        }
    };

    const modal = open ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] md:p-7 dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.50)]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/20" />
                <div className="pointer-events-none absolute left-[-40px] bottom-[-20px] h-28 w-28 rounded-full bg-indigo-200/35 blur-3xl dark:bg-indigo-500/15" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent dark:via-blue-400/30" />

                <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-[1rem] text-white shadow-[0_16px_34px_rgba(59,130,246,0.30)]">
                                <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700" />
                                <div className="absolute inset-[1px] rounded-[0.92rem] bg-gradient-to-br from-white/20 to-transparent" />
                                <CheckSquare2 size={20} className="relative z-10" />
                            </div>

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 shadow-sm dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
                                    <Sparkles size={12} />
                                    New Entry
                                </div>

                                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                    Create task
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                    Add something meaningful to your focus list.
                                </p>
                            </div>
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
                                placeholder="Enter today's task..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200 placeholder:text-zinc-400 dark:border-white/10 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
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
                                onClick={handleCreate}
                                disabled={loading || !title.trim()}
                                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(59,130,246,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(59,130,246,0.35)] disabled:opacity-60"
                            >
                                <span>{loading ? "Creating..." : "Create Task"}</span>

                                {!loading && (
                                    <ArrowRight
                                        size={15}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                                    />
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
                className="group inline-flex items-center gap-2 rounded-[1.1rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(59,130,246,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(59,130,246,0.35)]"
            >
                <Plus
                    size={18}
                    className="transition-transform duration-200 group-hover:rotate-90"
                />
                <span>New Task</span>
            </button>

            {typeof document !== "undefined" && createPortal(modal, document.body)}
        </>
    );
};

export default CreateTask;