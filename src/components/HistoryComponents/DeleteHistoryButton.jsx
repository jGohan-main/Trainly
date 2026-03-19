import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, X, Sparkles, Loader2, AlertTriangle } from "lucide-react";

function DeleteHistoryButton({ id, onDeleted }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        if (loading) return;
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/history/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Failed to delete");
            }

            onDeleted?.(id);
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
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-200/30 blur-3xl dark:bg-red-500/20" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-300/70 to-transparent dark:via-red-400/30" />

                <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-[0_12px_30px_rgba(239,68,68,0.24)]">
                                <AlertTriangle size={20} />
                            </div>

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-200">
                                    <Sparkles size={12} />
                                    Danger Zone
                                </div>

                                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                    Delete history item
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                                    This will permanently remove this archived entry from your history.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-zinc-500 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-zinc-400 dark:hover:bg-white/15 dark:hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="rounded-[1.15rem] border border-red-200/80 bg-red-50/70 p-4 dark:border-red-400/20 dark:bg-red-500/10">
                        <p className="text-sm text-zinc-700 dark:text-red-100/90">
                            Are you sure you want to delete this history item? This action cannot be undone.
                        </p>
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
                            onClick={handleDelete}
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-[1rem] bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(239,68,68,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(239,68,68,0.30)] disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={15} className="animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={15} />
                                    Delete Item
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
                onClick={() => setOpen(true)}
                className="group inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-red-200/80 bg-white/80 text-zinc-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-600 dark:border-red-500/20 dark:bg-white/10 dark:text-red-200 dark:hover:bg-red-500/20 dark:hover:text-white"
            >
                <Trash2
                    size={16}
                    className="transition-transform duration-200 group-hover:scale-105"
                />
            </button>

            {typeof document !== "undefined" && createPortal(modal, document.body)}
        </>
    );
}

export default DeleteHistoryButton;