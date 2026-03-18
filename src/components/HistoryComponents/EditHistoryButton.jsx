import React, { useState } from "react";
import { Pencil, X } from "lucide-react";

function EditHistoryButton({ task, onEdited }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setTitle(task.title);
        setOpen(true);
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

    return (
        <>
            <button
                type="button"
                onClick={handleOpen}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
                <Pencil size={16} />
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-zinc-900">
                                Edit history item
                            </h2>

                            <button
                                type="button"
                                onClick={() => !loading && setOpen(false)}
                                className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-zinc-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
                                placeholder="Enter task title"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                disabled={loading}
                                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-60"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={loading || !title.trim()}
                                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditHistoryButton;