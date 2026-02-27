import { useEffect, useState } from "react";

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

                // ✅ Adjust URL to match your backend route
                const res = await fetch(`http://localhost:5000/tasks?userId=${userId}`);

                if (!res.ok) {
                    throw new Error(`Failed to fetch tasks (${res.status})`);
                }

                const data = await res.json();
                setTasks(data);
            } catch (e) {
                setErr(e.message || "Error fetching tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId, refreshKey]);

    if (!userId) return <p>No userId provided.</p>;
    if (loading) return <p>Loading tasks...</p>;
    if (err) return <p style={{ color: "red" }}>{err}</p>;

    if (tasks.length === 0) return <p>No tasks yet.</p>;

    return (
        <div>
            <h3>Your Tasks</h3>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>
                        <strong>{t.title}</strong>
                        {t.completed ? " ✅" : " ⏳"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;