import React, { useEffect, useMemo, useState } from "react";
import { Wallet, Landmark } from "lucide-react";

function FinanceCard() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch("http://localhost:5000/accounts", {
                    credentials: "include",
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch accounts");
                }

                setAccounts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const totalBalance = useMemo(() => {
        return accounts.reduce((sum, account) => {
            return sum + (Number(account.balance) || 0);
        }, 0);
    }, [accounts]);

    const formatMoney = (value) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-green-200/80 bg-gradient-to-br from-green-100/80 via-emerald-50 to-white shadow-[0_20px_80px_rgba(34,197,94,0.10)] backdrop-blur-2xl dark:border-green-400/20 dark:bg-gradient-to-br dark:from-green-500/10 dark:via-emerald-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(34,197,94,0.25)]">
            {/* GREEN GLOW */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-300/30 blur-3xl dark:bg-green-500/30" />
                <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-400/25" />
            </div>

            <div className="relative p-6 md:p-7">
                {/* HEADER */}
                <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-green-500 to-emerald-400 text-white shadow-[0_12px_30px_rgba(34,197,94,0.28)] dark:shadow-[0_12px_30px_rgba(34,197,94,0.4)]">
                        <Wallet size={24} />
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-300/60 bg-green-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-700 dark:border-green-400/20 dark:bg-green-500/10 dark:text-green-200">
                            <Landmark size={12} />
                            Accounts
                        </div>

                        <h2 className="mt-3 text-2xl font-semibold text-zinc-950 dark:text-white">
                            Finance Overview
                        </h2>

                        <p className="mt-2 text-sm text-zinc-600 dark:text-green-100/80">
                            Track your accounts and keep your balances visible.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <p className="mt-6 text-sm text-zinc-600 dark:text-green-200">
                        Loading finance data...
                    </p>
                ) : error ? (
                    <p className="mt-6 text-sm text-red-500 dark:text-red-400">
                        {error}
                    </p>
                ) : (
                    <>
                        {/* TOP STATS */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-green-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-green-400/20 dark:bg-green-500/10">
                                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-green-200">
                                    Total Accounts
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
                                    {accounts.length}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-emerald-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-500/10">
                                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-emerald-200">
                                    Total Balance
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
                                    {formatMoney(totalBalance)}
                                </p>
                            </div>
                        </div>

                        {/* ACCOUNTS LIST */}
                        <div className="mt-8 rounded-[1.75rem] border border-green-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-green-400/20 dark:bg-green-500/10">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-green-200">
                                        Account List
                                    </p>
                                    <p className="mt-1 text-sm text-zinc-600 dark:text-green-100/80">
                                        Your saved finance accounts
                                    </p>
                                </div>

                                <div className="rounded-full border border-green-200/80 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:border-green-400/20 dark:bg-green-500/10 dark:text-green-200">
                                    {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
                                </div>
                            </div>

                            {accounts.length === 0 ? (
                                <div className="rounded-2xl border border-green-200/80 bg-white/70 p-4 text-sm text-zinc-600 backdrop-blur-xl dark:border-green-400/20 dark:bg-green-500/10 dark:text-green-100/80">
                                    No accounts added yet.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {accounts.slice(0, 4).map((account) => (
                                        <div
                                            key={account.id}
                                            className="flex items-center justify-between rounded-2xl border border-green-200/80 bg-white/70 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-green-50 dark:border-green-400/20 dark:bg-green-500/10 dark:hover:bg-green-500/20"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
                                                    {account.name}
                                                </p>
                                                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-green-100/70">
                                                    {account.type || "Account"}
                                                </p>
                                            </div>

                                            <div className="ml-4 rounded-xl border border-emerald-200/80 bg-emerald-50 px-3 py-2 text-sm font-semibold text-zinc-900 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-white">
                                                {formatMoney(Number(account.balance) || 0)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FinanceCard;