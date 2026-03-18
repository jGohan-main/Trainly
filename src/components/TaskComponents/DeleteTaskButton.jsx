import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

function DeleteTaskButton({ taskId, onDeleted }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error(`Failed to delete (${res.status})`);
            }

            onDeleted?.(taskId);
        } catch (e) {
            console.error(e);
            alert(e.message || "Delete failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-[1rem] border border-red-100 bg-white/85 px-3.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-[0_10px_24px_rgba(239,68,68,0.10)] disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? (
                <Loader2 size={15} className="animate-spin" />
            ) : (
                <Trash2 size={15} />
            )}
            <span>{loading ? "Deleting..." : "Delete"}</span>
        </button>
    );
}

export default DeleteTaskButton;