import React, { useEffect, useMemo, useState } from "react";
import {
    Wallet,
    Landmark,
    CreditCard,
    PiggyBank,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";
import DeleteAccountButton from "./DeleteAccountButton";
import EditAccountButton from "./EditAccountButton";

const FinanceList = ({ refreshKey }) => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setLoading(true);

                const res = await fetch("http://localhost:5000/accounts", {
                    credentials: "include",
                });

                const data = await res.json();

                if (!res.ok) {
                    console.error(data.error || "Failed to load accounts");
                    return;
                }

                setAccounts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, [refreshKey]);

    const totalBalance = useMemo(
        () => accounts.reduce((sum, acc) => sum + (Number(acc.balance) || 0), 0),
        [accounts]
    );

    const getAccountIcon = (type = "") => {
        const normalized = type.toLowerCase();

        if (
            normalized.includes("bank") ||
            normalized.includes("checking") ||
            normalized.includes("savings")
        ) {
            return <Landmark size={18} />;
        }

        if (normalized.includes("credit")) {
            return <CreditCard size={18} />;
        }

        if (normalized.includes("save")) {
            return <PiggyBank size={18} />;
        }

        return <Wallet size={18} />;
    };

    if (loading) {
        return (
            <div className="space-y-5">
                <div className="rounded-[2rem] border border-emerald-200/80 bg-gradient-to-br from-emerald-100/80 via-green-50 to-white p-6 shadow-[0_20px_80px_rgba(16,185,129,0.10)] backdrop-blur-2xl dark:border-emerald-400/20 dark:from-emerald-500/10 dark:via-green-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(16,185,129,0.22)]">
                    <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
                        <div className="rounded-[1.6rem] border border-emerald-200/80 bg-white/70 p-5 backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-500/10">
                            <div className="h-4 w-28 animate-pulse rounded-full bg-emerald-200/70 dark:bg-emerald-500/20" />
                            <div className="mt-4 h-10 w-40 animate-pulse rounded-full bg-emerald-200/70 dark:bg-emerald-500/20" />
                            <div className="mt-3 h-3 w-36 animate-pulse rounded-full bg-emerald-200/70 dark:bg-emerald-500/20" />
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-[1.5rem] border border-emerald-200/80 bg-white/70 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-500/10"
                                >
                                    <div className="h-10 w-10 animate-pulse rounded-2xl bg-emerald-200/70 dark:bg-emerald-500/20" />
                                    <div className="mt-4 h-4 w-28 animate-pulse rounded-full bg-emerald-200/70 dark:bg-emerald-500/20" />
                                    <div className="mt-2 h-3 w-20 animate-pulse rounded-full bg-emerald-200/70 dark:bg-emerald-500/20" />
                                    <div className="mt-5 h-8 w-24 animate-pulse rounded-full bg-emerald-200/70 dark:bg-emerald-500/20" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="rounded-[2rem] border border-emerald-200/80 bg-gradient-to-br from-emerald-100/80 via-green-50 to-white p-6 shadow-[0_20px_80px_rgba(16,185,129,0.10)] backdrop-blur-2xl dark:border-emerald-400/20 dark:from-emerald-500/10 dark:via-green-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(16,185,129,0.22)]">
                <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
                    {/* LEFT SUMMARY */}
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-emerald-200/80 bg-white/70 p-6 shadow-[0_12px_30px_rgba(16,185,129,0.08)] backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/40 blur-2xl dark:bg-emerald-500/20" />
                            <div className="absolute bottom-0 left-0 h-20 w-24 rounded-tr-full bg-white/40 blur-xl dark:bg-white/5" />
                        </div>

                        <div className="relative">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                                <Sparkles size={12} />
                                Portfolio Snapshot
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-[0_12px_24px_rgba(16,185,129,0.22)]">
                                    <Wallet size={20} />
                                </div>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-200">
                                        Total Balance
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                                        ${totalBalance.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-emerald-100/80">
                                A clean overview of all your current account balances in one place.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT LIST */}
                    <div className="rounded-[1.75rem] border border-emerald-200/80 bg-white/70 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-emerald-200">
                                    Accounts
                                </p>
                                <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                                    Financial Overview
                                </h2>
                            </div>

                            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
                                {accounts.length} total
                            </div>
                        </div>

                        {accounts.length === 0 ? (
                            <div className="flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-dashed border-emerald-200/80 bg-white/70 p-8 text-center backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-500/10">
                                <div>
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                                        <Wallet size={22} />
                                    </div>
                                    <p className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
                                        No accounts created yet
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-emerald-100/75">
                                        Add your first account to start building your finance dashboard.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                                {accounts.map((account) => (
                                    <div
                                        key={account.id}
                                        className="group relative overflow-hidden rounded-[1.5rem] border border-emerald-200/80 bg-white/70 p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-500/20"
                                    >
                                        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                                            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-100/60 blur-2xl dark:bg-emerald-400/15" />
                                        </div>

                                        <div className="relative">
                                            <div className="mb-5 flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-[0_10px_24px_rgba(16,185,129,0.20)]">
                                                        {getAccountIcon(account.type)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-base font-semibold text-zinc-950 dark:text-white">
                                                            {account.name}
                                                        </p>
                                                        <p className="mt-0.5 text-sm text-zinc-500 dark:text-emerald-100/75">
                                                            {account.type || "Personal account"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-1 shrink-0">
                                                    <EditAccountButton
                                                        account={account}
                                                        onUpdated={(updatedAccount) =>
                                                            setAccounts((prev) =>
                                                                prev.map((a) =>
                                                                    a.id === updatedAccount.id
                                                                        ? updatedAccount
                                                                        : a
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <DeleteAccountButton
                                                        accountId={account.id}
                                                        onDeleted={() =>
                                                            setAccounts((prev) =>
                                                                prev.filter((a) => a.id !== account.id)
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="rounded-[1.15rem] border border-emerald-200/80 bg-white/70 px-4 py-4 backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-500/10">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
                                                    Current Balance
                                                </p>

                                                <div className="mt-2 flex items-end justify-between gap-3">
                                                    <p className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                                                        ${Number(account.balance).toFixed(2)}
                                                    </p>

                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-sm transition group-hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:group-hover:bg-emerald-500/25">
                                                        <ArrowUpRight size={15} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinanceList;