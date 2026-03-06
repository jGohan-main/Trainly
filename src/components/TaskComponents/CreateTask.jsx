import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const CreateTask = ({ userId, onCreated }) => {
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
                body: JSON.stringify({ title, userId }),
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
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800 cursor-pointer"
            >
                <Plus size={18} />
                New Task
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-900">
                                    Create task
                                </h2>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Add something you want to get done.
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Enter today's task..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleCreate}
                                    disabled={loading}
                                    className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-70 cursor-pointer"
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
};

export default CreateTask;