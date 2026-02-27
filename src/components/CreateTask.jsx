import React, { useState } from "react";

const CreateTask = ({ userId, onTaskCreated }) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!title.trim()) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    userId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to create task");
                return;
            }

            setTitle("");

            // tell parent a task was created
            if (onTaskCreated) {
                onTaskCreated(data);
            }

        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                placeholder="Enter today's task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create Task"}
            </button>
        </div>
    );
};

export default CreateTask;