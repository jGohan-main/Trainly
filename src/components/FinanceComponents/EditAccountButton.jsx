import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, X, Sparkles, ArrowRight, Loader2, Wallet, Landmark } from "lucide-react";

const EditAccountButton = ({ account, onUpdated }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(account.name);
    const [balance, setBalance] = useState(account.balance);
    const [type, setType] = useState(account.type || "");
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setName(account.name);
        setBalance(account.balance);
        setType(account.type || "");
        setOpen(true);
    };

    const handleClose = () => {
        if (loading) return;
        setOpen(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/accounts/${account.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    balance: Number(balance),
                    type,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data.error || "Failed to update account");
                return;
            }

            onUpdated?.(data);
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
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/20" />
                <div className="pointer-events-none absolute left-[-40px] bottom-[-20px] h-28 w-28 rounded-full bg-green-200/35 blur-3xl dark:bg-green-500/15" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent dark:via-emerald-400/30" />

                <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-[1rem] text-white shadow-[0_16px_34px_rgba(16,185,129,0.30)]">
                                <div className="absolute inset-0 rounded-[1rem] bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700" />
                                <div className="absolute inset-[1px] rounded-[0.92rem] bg-gradient-to-br from-white/20 to-transparent" />
                                <Wallet size={20} className="relative z-10" />
                            </div>

                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                                    <Sparkles size={12} />
                                    Edit Entry
                                </div>

                                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                    Edit account
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                    Update account details and keep your finance dashboard clean.
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

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Account name
                            </label>

                            <div className="flex items-center rounded-xl border border-zinc-200 bg-white px-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-200 dark:border-white/10 dark:bg-zinc-800 dark:focus-within:border-emerald-400 dark:focus-within:ring-emerald-500/20">
                                <Wallet size={18} className="text-zinc-400 dark:text-zinc-500" />
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Account Name"
                                    className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Account type
                            </label>

                            <div className="flex items-center rounded-xl border border-zinc-200 bg-white px-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-200 dark:border-white/10 dark:bg-zinc-800 dark:focus-within:border-emerald-400 dark:focus-within:ring-emerald-500/20">
                                <Landmark size={18} className="text-zinc-400 dark:text-zinc-500" />
                                <input
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    placeholder="Type (optional)"
                                    className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Balance
                            </label>

                            <div className="flex items-center rounded-xl border border-zinc-200 bg-white px-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-200 dark:border-white/10 dark:bg-zinc-800 dark:focus-within:border-emerald-400 dark:focus-within:ring-emerald-500/20">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                    $
                                </span>
                                <input
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    type="number"
                                    step="0.01"
                                    placeholder="Balance"
                                    className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
                                />
                            </div>
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
                                type="submit"
                                disabled={loading}
                                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(16,185,129,0.35)] disabled:opacity-60"
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
                    </form>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <button
                type="button"
                onClick={handleOpen}
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-emerald-100 hover:text-emerald-700 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-200"
            >
                <Pencil
                    size={16}
                    className="transition-transform duration-200 group-hover:scale-105"
                />
            </button>

            {typeof document !== "undefined" && createPortal(modal, document.body)}
        </>
    );
};

export default EditAccountButton;