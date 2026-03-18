import { useEffect, useMemo, useState } from "react";
import {
    CheckCircle2,
    Clock3,
    Sparkles,
    Target,
    Archive,
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

    const todoTasks = useMemo(
        () => tasks.filter((task) => !task.isDone),
        [tasks]
    );
    const completedTasks = useMemo(
        () => tasks.filter((task) => task.isDone),
        [tasks]
    );

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="h-14 w-14 animate-pulse rounded-[1.25rem] bg-zinc-100" />
                            <div className="flex-1">
                                <div className="h-4 w-28 animate-pulse rounded-full bg-zinc-100" />
                                <div className="mt-3 h-3 w-20 animate-pulse rounded-full bg-zinc-100" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[...Array(4)].map((__, j) => (
                                <div
                                    key={j}
                                    className="rounded-[1.25rem] border border-white/70 bg-white/85 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 animate-pulse rounded-xl bg-zinc-100" />
                                            <div>
                                                <div className="h-4 w-36 animate-pulse rounded-full bg-zinc-100" />
                                                <div className="mt-2 h-3 w-20 animate-pulse rounded-full bg-zinc-100" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-9 w-9 animate-pulse rounded-xl bg-zinc-100" />
                                            <div className="h-9 w-9 animate-pulse rounded-xl bg-zinc-100" />
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
            <div className="rounded-[2rem] border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-[0_20px_60px_rgba(239,68,68,0.08)]">
                <p className="text-sm font-medium text-red-600">{err}</p>
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

        return (
            <section className="relative flex flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0">
                    <div
                        className={`absolute -left-8 top-0 h-36 w-36 rounded-full blur-3xl ${isCompleted ? "bg-emerald-200/20" : "bg-blue-200/20"
                            }`}
                    />
                    <div
                        className={`absolute right-0 top-8 h-36 w-36 rounded-full blur-3xl ${isCompleted ? "bg-green-200/18" : "bg-violet-200/18"
                            }`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.76),transparent_26%),linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_35%)]" />
                </div>

                <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${isCompleted ? "via-emerald-300/70" : "via-blue-300/70"
                        } to-transparent`}
                />

                <div className="relative">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div
                                className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] text-white shadow-[0_16px_34px_rgba(15,23,42,0.14)] ${isCompleted
                                        ? "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600"
                                        : "bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-600"
                                    }`}
                            >
                                {icon}
                            </div>

                            <div>
                                <div
                                    className={`inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm ${isCompleted
                                            ? "border-emerald-100 text-emerald-700"
                                            : "border-blue-100 text-blue-700"
                                        }`}
                                >
                                    <Sparkles size={12} />
                                    {isCompleted ? "Finished Goals" : "Current Focus"}
                                </div>

                                <h2 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.04em] text-zinc-950">
                                    {title}
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-zinc-500">
                                    {subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700">
                            {count}
                        </div>
                    </div>

                    {items.length === 0 ? (
                        <div className="flex min-h-[260px] items-center justify-center rounded-[1.5rem] border border-dashed border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-8 text-center">
                            <div>
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-zinc-100 text-zinc-500">
                                    {isCompleted ? (
                                        <CheckCircle2 size={22} />
                                    ) : (
                                        <CircleDashed size={22} />
                                    )}
                                </div>
                                <p className="mt-4 text-base font-semibold text-zinc-900">
                                    {emptyText}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {items.map((task) => (
                                <li
                                    key={task.id}
                                    className={`group relative overflow-hidden rounded-[1.35rem] border p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 ${isCompleted
                                            ? "border-emerald-100/70 bg-gradient-to-br from-emerald-50/70 to-white hover:shadow-[0_16px_34px_rgba(16,185,129,0.10)]"
                                            : "border-white/70 bg-white/85 hover:border-blue-100 hover:shadow-[0_16px_34px_rgba(59,130,246,0.10)]"
                                        }`}
                                >
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                                        <div
                                            className={`absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl ${isCompleted
                                                    ? "bg-emerald-100/60"
                                                    : "bg-blue-100/60"
                                                }`}
                                        />
                                    </div>

                                    <div className="relative flex items-center justify-between gap-4">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <CheckTaskButton
                                                task={task}
                                                onToggled={updateTaskInState}
                                            />

                                            <div className="min-w-0">
                                                <p
                                                    className={`truncate text-sm font-semibold md:text-[15px] ${isCompleted
                                                            ? "text-zinc-500 line-through"
                                                            : "text-zinc-950"
                                                        }`}
                                                >
                                                    {task.title}
                                                </p>

                                                <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                                                    <Clock3 size={12} />
                                                    <span>
                                                        {isCompleted
                                                            ? "Marked as completed"
                                                            : "Active task"}
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
                                </li>
                            ))}
                        </ul>
                    )}

                    {isCompleted && (
                        <div className="mt-6 flex justify-center border-t border-zinc-200/80 pt-6">
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
                icon={<Target size={22} />}
            />

            <TaskColumn
                title="Completed"
                subtitle="Finished tasks ready to archive into your history system."
                count={completedTasks.length}
                items={completedTasks}
                emptyText="No completed tasks yet."
                variant="completed"
                icon={<CheckCircle2 size={22} />}
            />
        </div>
    );
}

export default TaskList;