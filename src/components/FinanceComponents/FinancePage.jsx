import React, { useState } from "react";
import { Wallet, Sparkles } from "lucide-react";
import CreateAccountButton from "./CreateAccountButton";
import FinanceList from "./FinanceList";

const FinancePage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl md:p-7">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-10 top-0 h-36 w-36 rounded-full bg-emerald-200/20 blur-3xl" />
                    <div className="absolute right-0 top-8 h-40 w-40 rounded-full bg-green-200/20 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_26%),linear-gradient(to_bottom,rgba(255,255,255,0.14),transparent_35%)]" />
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />

                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] text-white shadow-[0_16px_34px_rgba(16,185,129,0.20)]">
                            <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600" />
                            <div className="absolute inset-[1px] rounded-[1.18rem] bg-gradient-to-br from-white/15 to-transparent" />
                            <Wallet size={22} className="relative z-10" />
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
                                <Sparkles size={12} />
                                Finance System
                            </div>

                            <h1 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.05em] text-zinc-950">
                                Finance
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                                Track accounts, balances, and your money flow in one clean,
                                premium overview.
                            </p>
                        </div>
                    </div>

                    <div className="self-start">
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