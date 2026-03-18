import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const DeleteAccountButton = ({ accountId, onDeleted }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/accounts/${accountId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data.error || "Failed to delete account");
                return;
            }

            setOpen(false);
            onDeleted();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* DELETE ICON BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-red-100 hover:text-red-600 transition"
            >
                <Trash2 size={16} />
            </button>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
                        <h2 className="text-lg font-semibold text-zinc-900">
                            Delete account?
                        </h2>

                        <p className="mt-2 text-sm text-zinc-600">
                            Are you sure you want to delete this account? This action
                            cannot be undone.
                        </p>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                onClick={() => setOpen(false)}
                                disabled={loading}
                                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteAccountButton;