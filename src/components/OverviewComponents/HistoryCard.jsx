import React, { useEffect, useMemo, useState } from "react";
import { History as HistoryIcon, Sparkles, TrendingUp } from "lucide-react";

function HistoryCard() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch("http://localhost:5000/history", {
                    credentials: "include",
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch history");
                }

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.history)
                        ? data.history
                        : [];

                setHistory(list);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const chartData = useMemo(() => {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const grouped = {};

        for (let i = 0; i < 7; i++) {
            const date = new Date(sevenDaysAgo);
            date.setDate(sevenDaysAgo.getDate() + i);

            const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            grouped[key] = {
                date,
                count: 0,
            };
        }

        for (const task of history) {
            const dateValue = task.doneAt || task.archivedAt || task.createdAt;
            const taskDate = new Date(dateValue);

            if (taskDate < sevenDaysAgo || taskDate > today) continue;

            const key = `${taskDate.getFullYear()}-${taskDate.getMonth()}-${taskDate.getDate()}`;

            if (grouped[key]) {
                grouped[key].count += 1;
            }
        }

        return Object.values(grouped);
    }, [history]);

    const maxCount = Math.max(...chartData.map((item) => item.count), 1);
    const totalCompleted = chartData.reduce((sum, item) => sum + item.count, 0);
    const activeDays = chartData.filter((item) => item.count > 0).length;
    const bestDay = chartData.reduce(
        (best, item) => (item.count > best.count ? item : best),
        chartData[0] || { date: new Date(), count: 0 }
    );

    const yAxisLabels = [
        maxCount,
        Math.max(Math.ceil(maxCount * 0.66), 1),
        Math.max(Math.ceil(maxCount * 0.33), 1),
        0,
    ];

    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-gradient-to-br from-yellow-500/10 via-amber-400/5 to-transparent backdrop-blur-2xl shadow-[0_20px_80px_rgba(234,179,8,0.25)]">
            {/* YELLOW GLOW */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-500/30 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-amber-400/25 blur-3xl" />
            </div>

            <div className="relative p-6 md:p-7">
                {/* TOP HEADER */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-[0_12px_30px_rgba(245,158,11,0.4)]">
                            <HistoryIcon size={24} />
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-200">
                                <Sparkles size={12} />
                                Last 7 Days
                            </div>

                            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                                History Overview
                            </h2>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-yellow-100/80">
                                A polished snapshot of your completed tasks across the last
                                seven days, so you can quickly see momentum, consistency,
                                and your strongest day.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 lg:min-w-[360px]">
                        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-4 backdrop-blur-xl">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-200">
                                Total Done
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-white">
                                {totalCompleted}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 backdrop-blur-xl">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200">
                                Active Days
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-white">
                                {activeDays}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-4 backdrop-blur-xl">
                            <div className="flex items-center justify-between">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-200">
                                    Best Day
                                </p>
                                <TrendingUp size={14} className="text-yellow-200" />
                            </div>
                            <p className="mt-2 text-2xl font-semibold text-white">
                                {bestDay?.count || 0}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CHART AREA */}
                <div className="mt-8 rounded-[1.75rem] border border-yellow-400/20 bg-yellow-500/10 p-4 backdrop-blur-xl md:p-5">
                    {loading ? (
                        <div className="flex h-[320px] items-center justify-center rounded-[1.25rem] border border-yellow-400/20 bg-yellow-500/10 backdrop-blur-xl">
                            <p className="text-sm text-yellow-200">Loading chart...</p>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            {/* Y AXIS */}
                            <div className="hidden h-[320px] w-12 shrink-0 flex-col justify-between pt-2 text-right text-xs font-medium text-yellow-200 sm:flex">
                                {yAxisLabels.map((label, index) => (
                                    <span key={index}>{label}</span>
                                ))}
                            </div>

                            {/* CHART */}
                            <div className="flex-1">
                                <div className="relative h-[320px] rounded-[1.5rem] border border-yellow-400/20 bg-yellow-500/10 px-4 pb-4 pt-6 backdrop-blur-xl">
                                    {/* GRID LINES */}
                                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-4 pb-16 pt-6">
                                        {[0, 1, 2, 3].map((line) => (
                                            <div
                                                key={line}
                                                className="border-t border-dashed border-yellow-400/20"
                                            />
                                        ))}
                                    </div>

                                    {/* BARS */}
                                    <div className="relative z-10 flex h-full items-end gap-3 md:gap-4">
                                        {chartData.map((item, index) => {
                                            const heightPercent =
                                                item.count === 0
                                                    ? 6
                                                    : Math.max((item.count / maxCount) * 100, 12);

                                            const isBestDay =
                                                item.count > 0 &&
                                                item.count === bestDay?.count &&
                                                bestDay?.count > 0;

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex flex-1 flex-col items-center justify-end gap-3"
                                                >
                                                    <div
                                                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.count > 0
                                                                ? "border border-yellow-400/20 bg-yellow-500/10 text-yellow-200"
                                                                : "bg-yellow-500/10 text-yellow-100/60"
                                                            }`}
                                                    >
                                                        {item.count}
                                                    </div>

                                                    <div className="flex h-[220px] w-full items-end justify-center">
                                                        <div
                                                            className={`relative w-full max-w-[54px] rounded-t-[1.25rem] transition-all duration-500 ${isBestDay
                                                                    ? "bg-gradient-to-t from-amber-500 via-yellow-400 to-yellow-300 shadow-[0_14px_30px_rgba(245,158,11,0.35)]"
                                                                    : item.count > 0
                                                                        ? "bg-gradient-to-t from-yellow-500 to-yellow-300"
                                                                        : "bg-yellow-500/20"
                                                                }`}
                                                            style={{ height: `${heightPercent}%` }}
                                                        >
                                                            {isBestDay && (
                                                                <div className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/90" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <p className="text-xs font-medium text-white">
                                                            {item.date.toLocaleDateString("en-US", {
                                                                weekday: "short",
                                                            })}
                                                        </p>
                                                        <p className="mt-1 text-[11px] text-yellow-100/70">
                                                            {item.date.toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* BOTTOM INSIGHT */}
                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-5 backdrop-blur-xl">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-200">
                            Insight
                        </p>
                        <p className="mt-2 text-sm font-medium text-white">
                            {totalCompleted === 0
                                ? "You have no completed tasks in the last 7 days yet."
                                : `You completed ${totalCompleted} task${totalCompleted === 1 ? "" : "s"
                                } across ${activeDays} active day${activeDays === 1 ? "" : "s"
                                } in the last week.`}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5 backdrop-blur-xl">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200">
                            Momentum
                        </p>
                        <p className="mt-2 text-sm font-medium text-white">
                            {bestDay?.count > 0
                                ? `Your strongest day reached ${bestDay.count} completed task${bestDay.count === 1 ? "" : "s"
                                }.`
                                : "Start completing tasks to build visible momentum."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryCard;