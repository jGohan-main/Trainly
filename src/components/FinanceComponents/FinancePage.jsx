import React, { useState } from "react";
import { Wallet, Sparkles } from "lucide-react";
import CreateAccountButton from "./CreateAccountButton";
import FinanceList from "./FinanceList";

const FinancePage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200/80 bg-gradient-to-br from-emerald-100/80 via-green-50 to-white p-6 shadow-[0_20px_80px_rgba(16,185,129,0.10)] backdrop-blur-2xl dark:border-emerald-400/20 dark:from-emerald-500/10 dark:via-green-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(16,185,129,0.22)] md:p-7">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/20" />
                    <div className="absolute right-0 top-8 h-44 w-44 rounded-full bg-green-200/25 blur-3xl dark:bg-green-400/15" />
                </div>

                <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-green-400 text-white shadow-[0_12px_30px_rgba(16,185,129,0.28)] dark:shadow-[0_12px_30px_rgba(16,185,129,0.40)]">
                            <Wallet size={24} />
                        </div>

                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                                <Sparkles size={12} />
                                Finance System
                            </div>

                            <h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white md:text-[2.25rem]">
                                Financial Overview
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-emerald-100/80 md:text-[15px]">
                                Track accounts, balances, and your money flow in one clean,
                                organized, premium workspace.
                            </p>
                        </div>
                    </div>

                    <div className="self-start xl:self-auto">
                        <CreateAccountButton
                            onCreated={() => setRefreshKey((k) => k + 1)}
                        />
                    </div>
                </div>
            </div>

            <FinanceList refreshKey={refreshKey} />
        </div>
    );
};

export default FinancePage;