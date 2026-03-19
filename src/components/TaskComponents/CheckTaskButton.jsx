import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function CheckTaskButton({ task, onToggled }) {
    const [loading, setLoading] = useState(false);

    const toggle = async () => {
        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
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
            type="button"
            onClick={toggle}
            disabled={loading}
            className={`group flex h-10 w-10 items-center justify-center rounded-[1rem] border shadow-[0_8px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${task.isDone
                    ? "border-emerald-200/80 bg-emerald-500 text-white hover:scale-[1.03] hover:bg-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                    : "border-zinc-200/80 bg-white/70 text-zinc-400 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/10 dark:text-zinc-400 dark:hover:border-blue-400/30 dark:hover:bg-blue-500/20 dark:hover:text-blue-200"
                }`}
        >
            {loading ? (
                <Loader2 size={15} className="animate-spin" />
            ) : task.isDone ? (
                <Check size={16} strokeWidth={3} />
            ) : (
                <Check
                    size={16}
                    strokeWidth={3}
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
            )}
        </button>
    );
}