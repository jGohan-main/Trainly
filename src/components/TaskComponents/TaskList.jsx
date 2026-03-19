import { useEffect, useMemo, useState } from "react";
import {
    CheckCircle2,
    Clock3,
    Sparkles,
    Target,
    CircleDashed,
} from "lucide-react";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import CheckTaskButton from "./CheckTaskButton";
import ArchiveButton from "./ArchiveButton";

function TaskList({ refreshKey = 0 }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                setErr("");

                const res = await fetch("http://localhost:5000/tasks", {
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch tasks (${res.status})`);
                }

                const data = await res.json();

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.tasks)
                        ? data.tasks
                        : [];

                setTasks(list);
            } catch (e) {
                setErr(e.message || "Error fetching tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [refreshKey]);

    const updateTaskInState = (updatedTask) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const removeTaskFromState = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const handleArchived = () => {
        setTasks((prev) => prev.filter((task) => !task.isDone));
    };

    const todoTasks = useMemo(() => tasks.filter((task) => !task.isDone), [tasks]);
    const completedTasks = useMemo(() => tasks.filter((task) => task.isDone), [tasks]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-[2rem] border border-blue-200/80 bg-gradient-to-br from-blue-100/80 via-sky-50 to-white p-6 shadow-[0_20px_80px_rgba(59,130,246,0.10)] backdrop-blur-2xl dark:border-blue-400/20 dark:from-blue-500/10 dark:via-blue-400/5 dark:to-transparent dark:shadow-[0_20px_80px_rgba(59,130,246,0.20)]"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="h-14 w-14 animate-pulse rounded-[1.25rem] bg-blue-200/70 dark:bg-blue-500/20" />
                            <div className="flex-1">
                                <div className="h-4 w-28 animate-pulse rounded-full bg-blue-200/70 dark:bg-blue-500/20" />
                                <div className="mt-3 h-3 w-20 animate-pulse rounded-full bg-blue-200/70 dark:bg-blue-500/20" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[...Array(4)].map((__, j) => (
                                <div
                                    key={j}
                                    className="rounded-[1.25rem] border border-blue-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-blue-400/20 dark:bg-blue-500/10"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 animate-pulse rounded-xl bg-blue-200/70 dark:bg-blue-500/20" />
                                            <div>
                                                <div className="h-4 w-36 animate-pulse rounded-full bg-blue-200/70 dark:bg-blue-500/20" />
                                                <div className="mt-2 h-3 w-20 animate-pulse rounded-full bg-blue-200/70 dark:bg-blue-500/20" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-9 w-9 animate-pulse rounded-xl bg-blue-200/70 dark:bg-blue-500/20" />
                                            <div className="h-9 w-9 animate-pulse rounded-xl bg-blue-200/70 dark:bg-blue-500/20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (err) {
        return (
            <div className="rounded-[2rem] border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-[0_20px_60px_rgba(239,68,68,0.08)] dark:border-red-500/20 dark:bg-red-500/10">
                <p className="text-sm font-medium text-red-600 dark:text-red-300">{err}</p>
            </div>
        );
    }

    const TaskColumn = ({
        title,
        subtitle,
        count,
        items,
        emptyText,
        variant = "todo",
        icon,
    }) => {
        const isCompleted = variant === "completed";

        const theme = isCompleted
            ? {
                border: "border-emerald-200/80 dark:border-emerald-400/20",
                bg: "bg-gradient-to-br from-emerald-100/80 via-green-50 to-white dark:from-emerald-500/10 dark:via-green-400/5 dark:to-transparent",
                shadow: "shadow-[0_20px_80px_rgba(16,185,129,0.10)] dark:shadow-[0_20px_80px_rgba(16,185,129,0.22)]",
                glow1: "bg-emerald-300/30 dark:bg-emerald-500/30",
                glow2: "bg-green-200/30 dark:bg-green-400/25",
                badge: "border-emerald-300/60 bg-emerald-100/80 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200",
                iconBg: "from-emerald-500 to-green-400",
                statBg: "bg-white/70 dark:bg-emerald-500/10",
                itemBorder: "border-emerald-200/80 dark:border-emerald-400/20",
                itemBg: "bg-white/70 dark:bg-emerald-500/10",
                itemHover: "hover:bg-emerald-50 dark:hover:bg-emerald-500/20",
                subtle: "text-zinc-500 dark:text-emerald-200",
                subtext: "text-zinc-600 dark:text-emerald-100/80",
                bar: "bg-emerald-100 dark:bg-emerald-500/20",
            }
            : {
                border: "border-blue-200/80 dark:border-blue-400/20",
                bg: "bg-gradient-to-br from-blue-100/80 via-sky-50 to-white dark:from-blue-500/10 dark:via-blue-400/5 dark:to-transparent",
                shadow: "shadow-[0_20px_80px_rgba(59,130,246,0.10)] dark:shadow-[0_20px_80px_rgba(59,130,246,0.22)]",
                glow1: "bg-blue-300/30 dark:bg-blue-500/30",
                glow2: "bg-sky-200/30 dark:bg-sky-400/25",
                badge: "border-blue-300/60 bg-blue-100/80 text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200",
                iconBg: "from-blue-500 to-cyan-400",
                statBg: "bg-white/70 dark:bg-blue-500/10",
                itemBorder: "border-blue-200/80 dark:border-blue-400/20",
                itemBg: "bg-white/70 dark:bg-blue-500/10",
                itemHover: "hover:bg-blue-50 dark:hover:bg-blue-500/20",
                subtle: "text-zinc-500 dark:text-blue-200",
                subtext: "text-zinc-600 dark:text-blue-100/80",
                bar: "bg-blue-100 dark:bg-blue-500/20",
            };

        return (
            <section
                className={`relative overflow-hidden rounded-[2rem] border ${theme.border} ${theme.bg} ${theme.shadow} backdrop-blur-2xl`}
            >
                <div className="pointer-events-none absolute inset-0">
                    <div className={`absolute -left-16 top-0 h-44 w-44 rounded-full blur-3xl ${theme.glow1}`} />
                    <div className={`absolute -right-10 top-10 h-52 w-52 rounded-full blur-3xl ${theme.glow2}`} />
                </div>

                <div className="relative p-6 md:p-7">
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                        <div className="flex items-start gap-4">
                            <div
                                className={`flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br ${theme.iconBg} text-white shadow-[0_12px_30px_rgba(15,23,42,0.22)]`}
                            >
                                {icon}
                            </div>

                            <div>
                                <div
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${theme.badge}`}
                                >
                                    <Sparkles size={12} />
                                    {isCompleted ? "Finished Goals" : "Current Focus"}
                                </div>

                                <h2 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">
                                    {title}
                                </h2>

                                <p className={`mt-2 text-sm ${theme.subtext}`}>
                                    {subtitle}
                                </p>
                            </div>
                        </div>

                        <div className={`rounded-[1.4rem] border ${theme.itemBorder} ${theme.statBg} p-4 backdrop-blur-xl`}>
                            <p className={`text-xs ${theme.subtle}`}>Count</p>
                            <p className="mt-2 text-3xl font-bold text-zinc-950 dark:text-white">
                                {count}
                            </p>
                        </div>
                    </div>

                    {items.length === 0 ? (
                        <div className={`mt-8 flex min-h-[260px] items-center justify-center rounded-[1.5rem] border border-dashed ${theme.itemBorder} ${theme.statBg} p-8 text-center backdrop-blur-xl`}>
                            <div>
                                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-[1.1rem] ${theme.bar} text-zinc-500 dark:text-white/80`}>
                                    {isCompleted ? (
                                        <CheckCircle2 size={22} />
                                    ) : (
                                        <CircleDashed size={22} />
                                    )}
                                </div>
                                <p className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
                                    {emptyText}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-8 space-y-3">
                            {items.map((task, index) => (
                                <div
                                    key={task.id}
                                    className={`group/item flex items-center justify-between rounded-[1.4rem] border ${theme.itemBorder} ${theme.itemBg} p-4 backdrop-blur-xl transition-all duration-300 ${theme.itemHover}`}
                                >
                                    <div className="flex min-w-0 items-center gap-4">
                                        <CheckTaskButton
                                            task={task}
                                            onToggled={updateTaskInState}
                                        />

                                        <div className="min-w-0">
                                            <p
                                                className={`truncate text-sm font-semibold ${isCompleted
                                                        ? "text-zinc-500 line-through dark:text-zinc-400"
                                                        : "text-zinc-950 dark:text-white"
                                                    }`}
                                            >
                                                {task.title}
                                            </p>

                                            <div className={`mt-1 flex items-center gap-2 text-xs ${theme.subtle}`}>
                                                <Clock3 size={12} />
                                                <span>
                                                    {isCompleted
                                                        ? `Finished goal #${index + 1}`
                                                        : `Goal #${index + 1}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                        <EditTaskButton
                                            task={task}
                                            onUpdated={updateTaskInState}
                                        />
                                        <DeleteTaskButton
                                            taskId={task.id}
                                            onDeleted={removeTaskFromState}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {isCompleted && (
                        <div className="mt-6 flex justify-center border-t border-zinc-200/80 pt-6 dark:border-white/10">
                            <ArchiveButton
                                onArchived={handleArchived}
                                disabled={completedTasks.length === 0}
                            />
                        </div>
                    )}
                </div>
            </section>
        );
    };

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TaskColumn
                title="Todo"
                subtitle="Your current priorities and active goals waiting for action."
                count={todoTasks.length}
                items={todoTasks}
                emptyText="No todo tasks."
                variant="todo"
                icon={<Target size={24} />}
            />

            <TaskColumn
                title="Completed"
                subtitle="Finished tasks ready to archive into your history system."
                count={completedTasks.length}
                items={completedTasks}
                emptyText="No completed tasks yet."
                variant="completed"
                icon={<CheckCircle2 size={24} />}
            />
        </div>
    );
}

export default TaskList;