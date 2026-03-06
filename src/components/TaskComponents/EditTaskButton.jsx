import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";

function EditTaskButton({ task, onUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [saving, setSaving] = useState(false);

    const save = async () => {
        if (!title.trim()) return;

        try {
            setSaving(true);

            const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });

            if (!res.ok) throw new Error(`Failed to update (${res.status})`);

            const updatedTask = await res.json();
            onUpdated?.(updatedTask);
            setIsEditing(false);
        } catch (e) {
            console.error(e);
            alert(e.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    const cancel = () => {
        setTitle(task.title);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") save();
        if (e.key === "Escape") cancel();
    };

    if (!isEditing) {
        return (
            <button
                onClick={() => setIsEditing(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer"
                title="Edit task"
            >
                <Pencil size={16} />
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />

            <button
                onClick={save}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white transition hover:bg-zinc-800 disabled:opacity-60"
                title="Save"
            >
                <Check size={16} />
            </button>

            <button
                onClick={cancel}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 transition hover:bg-zinc-100"
                title="Cancel"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default EditTaskButton;