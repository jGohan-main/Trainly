import React, { useState } from "react";
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleCreate();
        }

        if (e.key === "Escape") {
            setOpen(false);
        }
    };

    return (
        <>
            {/* BUTTON */}
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

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.35)] px-4 backdrop-blur-md">
                    <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.25)] backdrop-blur-2xl md:p-7">

                        {/* PREMIUM BLUE GLOW SYSTEM */}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_30%),linear-gradient(to_bottom,rgba(255,255,255,0.10),transparent_35%)]" />

                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/30 blur-3xl" />
                        <div className="pointer-events-none absolute left-[-40px] bottom-[-20px] h-28 w-28 rounded-full bg-indigo-300/25 blur-3xl" />

                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

                        <div className="relative">
                            {/* HEADER */}
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="relative flex h-12 w-12 items-center justify-center rounded-[1rem] text-white shadow-[0_16px_34px_rgba(59,130,246,0.30)]">
                                        <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700" />
                                        <div className="absolute inset-[1px] rounded-[0.92rem] bg-gradient-to-br from-white/20 to-transparent" />
                                        <CheckSquare2 size={20} className="relative z-10" />
                                    </div>

                                    <div>
                                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
                                            <Sparkles size={12} />
                                            New Entry
                                        </div>

                                        <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950">
                                            Create task
                                        </h2>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            Add something meaningful to your focus list.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-zinc-500 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* INPUT */}
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                                        Task title
                                    </label>

                                    <div className="flex items-center rounded-[1.15rem] border border-white/70 bg-white/90 px-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100">
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="Enter today's task..."
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="w-full bg-transparent py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="rounded-[1rem] border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCreate}
                                        disabled={loading || !title.trim()}
                                        className="group inline-flex items-center gap-2 rounded-[1rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(59,130,246,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(59,130,246,0.35)] disabled:opacity-60"
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
            )}
        </>
    );
};

export default CreateTask;