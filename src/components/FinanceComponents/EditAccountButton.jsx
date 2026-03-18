import React, { useState } from "react";
import { Pencil } from "lucide-react";

const EditAccountButton = ({ account, onUpdated }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(account.name);
    const [balance, setBalance] = useState(account.balance);
    const [type, setType] = useState(account.type || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(`http://localhost:5000/accounts/${account.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    balance: Number(balance),
                    type,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data.error || "Failed to update account");
                return;
            }

            onUpdated(data);
            setOpen(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* EDIT BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-blue-100 hover:text-blue-600 transition"
            >
                <Pencil size={16} />
            </button>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">

                        <h2 className="text-lg font-semibold text-zinc-900">
                            Edit Account
                        </h2>

                        <form onSubmit={handleUpdate} className="mt-4 space-y-3">

                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Account Name"
                                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                                required
                            />

                            <input
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                placeholder="Type (optional)"
                                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                            />

                            <input
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                type="number"
                                placeholder="Balance"
                                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
                            />

                            <div className="flex justify-end gap-2 pt-2">

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-xl border border-zinc-300 px-4 py-2 text-sm"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    );
};

export default EditAccountButton;