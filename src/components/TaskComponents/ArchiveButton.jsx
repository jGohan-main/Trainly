import React, { useState } from "react";
import { Archive, Loader2 } from "lucide-react";

function ArchiveButton({ userId, onArchived, disabled }) {
    const [loading, setLoading] = useState(false);

    const handleArchive = async () => {
        if (disabled) return;

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/tasks/${userId}/archive`, {
                method: "POST",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to archive tasks");
            }

            onArchived?.(data);
        } catch (err) {
            alert(err.message || "Error archiving tasks");
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = disabled || loading;

    return (
        <button
            onClick={handleArchive}
            disabled={isDisabled}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition shadow-sm
            ${isDisabled
                    ? "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
        >
            {loading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Archive size={16} />
            )}

            {loading ? "Archiving..." : "Archive"}
        </button>
    );
}

export default ArchiveButton;