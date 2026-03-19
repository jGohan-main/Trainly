import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, X, Sparkles, Loader2, AlertTriangle } from "lucide-react";

const DeleteAccountButton = ({ accountId, onDeleted }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        if (loading) return;
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/accounts/${accountId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data.error || "Failed to delete account");
                return;
            }

            setOpen(false);
            onDeleted?.();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const modal = open ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] md:p-7 dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_24px_80px_rgba(0,0,0,0.50)]">
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-200/40 blur-3xl dark:bg-red-500/20" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent dark:via-red-400/30" />

                <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-[0_12px_30px_rgba(239,68,68,0.24)]">
                                <AlertTriangle size={20} />
                            </div>

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-200">
                                    <Sparkles size={12} />
                                    Danger Zone
                                </div>

                                <h2 className="mt-3 text-xl font-semibold text-zinc-950 dark:text-white">
                                    Delete account
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                    This will permanently remove this account and its saved balance.
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

                    <div className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 dark:border-red-500/20 dark:bg-red-500/10">
                        <p className="text-sm text-zinc-700 dark:text-red-100/90">
                            Are you sure you want to delete this account? This action cannot be undone.
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-4 py-2 text-sm font-medium text-white shadow-[0_14px_30px_rgba(239,68,68,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(239,68,68,0.30)] disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={15} className="animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={15} />
                                    Delete Account
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
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-red-100 hover:text-red-600 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-red-500/20 dark:hover:text-red-200"
            >
                <Trash2
                    size={16}
                    className="transition-transform duration-200 group-hover:scale-105"
                />
            </button>

            {typeof document !== "undefined" && createPortal(modal, document.body)}
        </>
    );
};

export default DeleteAccountButton;