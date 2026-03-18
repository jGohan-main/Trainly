import React, { useState } from "react";
import { Plus, Wallet, Landmark, X } from "lucide-react";

const CreateAccountButton = ({ onCreated }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setName("");
        setBalance("");
        setType("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Account name is required");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/accounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: name.trim(),
                    balance: balance === "" ? 0 : Number(balance),
                    type: type.trim() || null,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to create account");
                return;
            }

            resetForm();
            setOpen(false);

            if (onCreated) {
                onCreated(data);
            }
        } catch (err) {
            console.error(err);
            alert("Could not reach server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
            >
                <Plus size={16} />
                Create account
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-900">
                                    Create account
                                </h2>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Add a finance account to track your money
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    resetForm();
                                }}
                                className="rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">
                                    Account name
                                </label>
                                <div className="flex items-center rounded-xl border border-zinc-300 bg-white px-3 focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-200/70">
                                    <Wallet size={18} className="text-zinc-400" />
                                    <input
                                        type="text"
                                        placeholder="Example: Main Bank"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">
                                    Starting balance
                                </label>
                                <div className="flex items-center rounded-xl border border-zinc-300 bg-white px-3 focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-200/70">
                                    <span className="text-sm font-medium text-zinc-500">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={balance}
                                        onChange={(e) => setBalance(e.target.value)}
                                        className="w-full bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">
                                    Account type
                                </label>
                                <div className="flex items-center rounded-xl border border-zinc-300 bg-white px-3 focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-200/70">
                                    <Landmark size={18} className="text-zinc-400" />
                                    <input
                                        type="text"
                                        placeholder="Example: Checking, Savings, Cash"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full bg-transparent px-3 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpen(false);
                                        resetForm();
                                    }}
                                    className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateAccountButton;