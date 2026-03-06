import { useEffect, useState } from "react";
import DeleteTaskButton from "./TaskComponents/DeleteTaskButton";
import EditTaskButton from "./TaskComponents/EditTaskButton";
import CheckTaskButton from "./TaskComponents/CheckTaskButton";
import ArchiveButton from "./TaskComponents/ArchiveButton";

function TaskList({ userId, refreshKey = 0 }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        if (!userId) return;

        const fetchTasks = async () => {
            try {
                setLoading(true);
                setErr("");

                const res = await fetch(`http://localhost:5000/tasks?userId=${userId}`);
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
    }, [userId, refreshKey]);

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

    if (!userId) return <p>No userId provided.</p>;
    if (loading) return <p>Loading tasks...</p>;
    if (err) return <p className="text-red-500">{err}</p>;

    const todoTasks = tasks.filter((task) => !task.isDone);
    const completedTasks = tasks.filter((task) => task.isDone);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-zinc-900">Todo</h2>

                {todoTasks.length === 0 ? (
                    <p className="text-sm text-zinc-500">No todo tasks.</p>
                ) : (
                    <ul className="space-y-3">
                        {todoTasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <CheckTaskButton
                                        task={task}
                                        onToggled={updateTaskInState}
                                    />
                                    <span className="truncate font-medium text-zinc-900">
                                        {task.title}
                                    </span>
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
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-zinc-900">Completed</h2>
                </div>

                {completedTasks.length === 0 ? (
                    <p className="text-sm text-zinc-500">No completed tasks yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {completedTasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <CheckTaskButton
                                        task={task}
                                        onToggled={updateTaskInState}
                                    />
                                    <span className="truncate font-medium text-zinc-500 line-through">
                                        {task.title}
                                    </span>
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
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 flex justify-center border-t border-zinc-200 pt-6">
                    <ArchiveButton
                        userId={userId}
                        onArchived={handleArchived}
                        disabled={completedTasks.length === 0}
                    />
                </div>
            </section>
        </div>

    );
}

export default TaskList;