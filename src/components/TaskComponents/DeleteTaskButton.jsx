import React, { useState } from "react";
import { Trash2 } from "lucide-react";

function DeleteTaskButton({ taskId, onDeleted }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: "DELETE",
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
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition duration-200 hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            <Trash2 size={16} />
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}

export default DeleteTaskButton;