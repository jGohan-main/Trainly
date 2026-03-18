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
                <div className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
                    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
                        <div className="rounded-[1.5rem] border border-emerald-100/70 bg-gradient-to-br from-emerald-50 to-white p-5">
                            <div className="h-4 w-24 animate-pulse rounded-full bg-emerald-100" />
                            <div className="mt-4 h-10 w-36 animate-pulse rounded-full bg-zinc-100" />
                            <div className="mt-3 h-3 w-28 animate-pulse rounded-full bg-zinc-100" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-[1.5rem] border border-white/70 bg-white/85 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                                >
                                    <div className="h-10 w-10 animate-pulse rounded-2xl bg-zinc-100" />
                                    <div className="mt-4 h-4 w-28 animate-pulse rounded-full bg-zinc-100" />
                                    <div className="mt-2 h-3 w-20 animate-pulse rounded-full bg-zinc-100" />
                                    <div className="mt-5 h-8 w-24 animate-pulse rounded-full bg-zinc-100" />
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
            <div className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
                <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-emerald-100/70 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-5 shadow-[0_12px_30px_rgba(16,185,129,0.10)]">
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl" />
                            <div className="absolute bottom-0 left-0 h-16 w-20 rounded-tr-full bg-white/40 blur-xl" />
                        </div>

                        <div className="relative">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm">
                                <Sparkles size={12} />
                                Portfolio Snapshot
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-[0_12px_24px_rgba(16,185,129,0.22)]">
                                    <Wallet size={20} />
                                </div>

                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                                        Total Balance
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
                                        ${totalBalance.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-zinc-500">
                                A clean overview of all your current account balances in one place.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/60 bg-white/65 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                                    Accounts
                                </p>
                                <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-zinc-950">
                                    Financial Overview
                                </h2>
                            </div>

                            <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                                {accounts.length} total
                            </div>
                        </div>

                        {accounts.length === 0 ? (
                            <div className="flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-dashed border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-8 text-center">
                                <div>
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-zinc-100 text-zinc-500">
                                        <Wallet size={22} />
                                    </div>
                                    <p className="mt-4 text-base font-semibold text-zinc-900">
                                        No accounts created yet
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                                        Add your first account to start building your finance dashboard.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {accounts.map((account) => (
                                    <div
                                        key={account.id}
                                        className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/85 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-100 hover:shadow-[0_18px_40px_rgba(16,185,129,0.10)]"
                                    >
                                        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                                            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-emerald-100/60 blur-2xl" />
                                        </div>

                                        <div className="relative">
                                            <div className="mb-5 flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-[0_10px_24px_rgba(16,185,129,0.20)]">
                                                        {getAccountIcon(account.type)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-zinc-950">
                                                            {account.name}
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-zinc-500">
                                                            {account.type || "Personal account"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-1">
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

                                            <div className="rounded-[1.15rem] border border-emerald-100/60 bg-gradient-to-br from-emerald-50/80 to-white px-4 py-4">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                                    Current Balance
                                                </p>

                                                <div className="mt-2 flex items-end justify-between gap-3">
                                                    <p className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
                                                        ${Number(account.balance).toFixed(2)}
                                                    </p>

                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-500 shadow-sm transition group-hover:text-emerald-700">
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