import React, { useState } from "react";
import { Check } from "lucide-react";

export default function CheckTaskButton({ task, onToggled }) {
    const [loading, setLoading] = useState(false);

    const toggle = async () => {
        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isDone: !task.isDone }),
            });

            const updated = await res.json();
            if (!res.ok) throw new Error(updated?.error || "Failed to toggle");

            onToggled?.(updated);
        } catch (e) {
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggle}
            disabled={loading}
            className={`flex h-6 w-6 items-center justify-center rounded-md border transition duration-200 cursor-pointer
            ${task.isDone
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white hover:border-zinc-900"
                }`}
        >
            {task.isDone && <Check size={14} strokeWidth={3} />}
        </button>
    );
}