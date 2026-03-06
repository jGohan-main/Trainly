import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";

function HistoryList({ userId }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        if (!userId) return;

        const fetchHistory = async () => {
            try {
                setLoading(true);
                setErr("");

                const res = await fetch(`http://localhost:5000/history/${userId}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch history (${res.status})`);
                }

                const data = await res.json();

                const list =
                    Array.isArray(data)
                        ? data
                        : Array.isArray(data?.history)
                            ? data.history
                            : [];

                setHistory(list);
            } catch (e) {
                setErr(e.message || "Error fetching history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [userId]);

    const groupedHistory = useMemo(() => {
        const groups = {};

        for (const task of history) {
            const dateValue = task.doneAt || task.archivedAt || task.createdAt;
            const date = new Date(dateValue);

            const dateLabel = date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            if (!groups[dateLabel]) {
                groups[dateLabel] = [];
            }

            groups[dateLabel].push(task);
        }

        return Object.entries(groups);
    }, [history]);

    if (!userId) {
        return (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-zinc-500">No userId provided.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-zinc-500">Loading history...</p>
            </div>
        );
    }

    if (err) {
        return (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
                <p className="text-sm font-medium text-red-600">{err}</p>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500">
                        <CalendarDays size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900">
                        No history yet
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-zinc-500">
                        Once you archive completed tasks, they’ll appear here
                        organized by date.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {groupedHistory.map(([dateLabel, tasks]) => (
                <section
                    key={dateLabel}
                    className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                    <div className="mb-5 flex items-center gap-3 border-b border-zinc-200 pb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
                            <CalendarDays size={18} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-zinc-900">
                                {dateLabel}
                            </h2>
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                                {tasks.length} {tasks.length === 1 ? "task" : "tasks"} completed
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 transition hover:border-zinc-300 hover:bg-zinc-100/70"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm">
                                        <CheckCircle2 size={18} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-zinc-900">
                                            {task.title}
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            Archived in Trackly history
                                        </p>
                                    </div>
                                </div>

                                <div className="ml-4 flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600">
                                    <Clock3 size={14} />
                                    <span>
                                        {task.doneAt
                                            ? new Date(task.doneAt).toLocaleTimeString("en-US", {
                                                hour: "numeric",
                                                minute: "2-digit",
                                            })
                                            : "Time unavailable"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default HistoryList;