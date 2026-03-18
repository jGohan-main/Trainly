import React, { useState } from "react";
import { Pencil, Loader2 } from "lucide-react";

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
        setTitle(task.title || "");
        setOpen(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-[1rem] border border-zinc-200 bg-white/85 px-3.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
            >
                <Pencil size={15} />
                <span>Edit</span>
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.34)] px-4 backdrop-blur-md">
                    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.20)] backdrop-blur-2xl md:p-7">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.84),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_35%)]" />
                        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-zinc-200/40 blur-3xl" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/70 to-transparent" />

                        <div className="relative">
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-700 shadow-sm">
                                        <Pencil size={12} />
                                        Edit Entry
                                    </div>

                                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950">
                                        Edit task
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                                        Refine the title to keep your focus list clean and intentional.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/75 text-zinc-500 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                                        Task title
                                    </label>

                                    <div className="group flex items-center rounded-[1.15rem] border border-white/70 bg-white/85 px-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-zinc-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-zinc-100">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full bg-transparent py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="rounded-[1rem] border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={loading || !title.trim()}
                                        className="inline-flex items-center gap-2 rounded-[1rem] bg-gradient-to-r from-zinc-950 via-zinc-900 to-black px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.22)] disabled:opacity-60"
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
            )}
        </>
    );
}

export default EditTaskButton;