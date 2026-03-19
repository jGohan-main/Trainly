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
            className={`group inline-flex items-center gap-2 rounded-[1.1rem] px-5 py-3 text-sm font-semibold transition-all duration-200 backdrop-blur-xl ${isDisabled
                    ? "cursor-not-allowed border border-zinc-200/80 bg-white/60 text-zinc-400 shadow-none dark:border-white/10 dark:bg-white/5 dark:text-zinc-500"
                    : "border border-amber-200/80 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500 text-white shadow-[0_12px_30px_rgba(245,158,11,0.22)] hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(245,158,11,0.32)] dark:border-amber-400/20 dark:from-amber-500 dark:via-orange-500 dark:to-yellow-500 dark:shadow-[0_12px_30px_rgba(245,158,11,0.28)] dark:hover:shadow-[0_20px_45px_rgba(245,158,11,0.40)]"
                }`}
        >
            {loading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Archive
                    size={16}
                    className="transition-transform duration-200 group-hover:scale-105"
                />
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