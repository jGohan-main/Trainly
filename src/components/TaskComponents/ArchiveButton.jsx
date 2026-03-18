import React, { useState } from "react";
import { Archive, Loader2, Sparkles } from "lucide-react";

function ArchiveButton({ onArchived, disabled }) {
    const [loading, setLoading] = useState(false);

    const handleArchive = async () => {
        if (disabled || loading) return;

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/tasks/archive", {
                method: "POST",
                credentials: "include",
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
            type="button"
            onClick={handleArchive}
            disabled={isDisabled}
            className={`group inline-flex items-center gap-2 rounded-[1.1rem] px-5 py-3 text-sm font-semibold shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition-all duration-200 ${isDisabled
                ? "cursor-not-allowed border border-zinc-200 bg-zinc-100 text-zinc-400 shadow-none"
                : "border border-amber-100 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 text-white hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(245,158,11,0.24)]"
                }`}
        >
            {loading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Archive size={16} />
            )}

            <span>{loading ? "Archiving..." : "Archive"}</span>

            {!isDisabled && !loading && (
                <Sparkles
                    size={14}
                    className="transition-transform duration-200 group-hover:scale-110"
                />
            )}
        </button>
    );
}

export default ArchiveButton;