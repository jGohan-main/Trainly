import React from "react";
import {
    CheckSquare,
    LayoutDashboard,
    History,
    LogOut,
    Wallet,
    Dumbbell,
    Target,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

function SideNav({ active, onSelect, collapsed, setCollapsed }) {
    const handleLogout = async () => {
        try {
            await fetch("http://localhost:5000/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            localStorage.removeItem("user");
            window.location.href = "/";
        }
    };

    const getActiveClasses = (key) => {
        if (key === "overview") {
            return "bg-gradient-to-r from-zinc-800 to-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]";
        }

        if (key === "tasks") {
            return "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-[0_12px_30px_rgba(59,130,246,0.22)]";
        }

        if (key === "fitness") {
            return "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-[0_12px_30px_rgba(168,85,247,0.22)]";
        }

        if (key === "finance") {
            return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_12px_30px_rgba(34,197,94,0.22)]";
        }

        if (key === "homework") {
            return "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-[0_12px_30px_rgba(234,179,8,0.22)]";
        }

        return "bg-zinc-900 text-white";
    };

    const NavButton = ({ itemKey, label, icon }) => {
        const isActive = active === itemKey;

        return (
            <div className="group relative">
                <button
                    type="button"
                    onClick={() => onSelect(itemKey)}
                    className={`relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300 ${collapsed ? "justify-center" : ""
                        } ${isActive
                            ? getActiveClasses(itemKey)
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                        }`}
                >
                    {isActive && (
                        <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-60 blur-md" />
                    )}

                    <span
                        className={`relative z-10 transition-transform duration-300 ${!isActive ? "group-hover:scale-110 group-hover:-translate-y-[1px]" : ""
                            }`}
                    >
                        {icon}
                    </span>

                    {!collapsed && (
                        <span className="relative z-10 truncate">
                            {label}
                        </span>
                    )}
                </button>

                {collapsed && (
                    <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 rounded-xl bg-zinc-900 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
                        {label}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside
            className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-zinc-200/80 bg-white/80 px-4 py-5 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-zinc-950/80 ${collapsed ? "w-20" : "w-72"
                }`}
        >
            {/* ambient bg accents */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-500/10" />
                <div className="absolute bottom-20 right-0 h-28 w-28 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-500/10" />
            </div>

            <div className="relative z-10 mb-8 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                            <CheckSquare size={18} className="relative z-10" />
                        </div>

                        <div>
                            <p className="text-xl font-semibold tracking-[-0.04em] text-zinc-900 dark:text-zinc-100">
                                Trackly
                            </p>
                            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                                Personal System
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {!collapsed && <ThemeToggle />}

                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>
            </div>

            {collapsed && (
                <div className="relative z-10 mb-6 flex justify-center">
                    <ThemeToggle />
                </div>
            )}

            {!collapsed && (
                <div className="relative z-10 mb-6 flex items-center gap-3 px-2">
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-zinc-400 dark:text-zinc-500">
                        Dashboard
                    </span>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
                </div>
            )}

            <nav className="relative z-10 flex flex-col gap-2">
                <NavButton
                    itemKey="overview"
                    label="Overview"
                    icon={<LayoutDashboard size={18} />}
                />
            </nav>

            {!collapsed && (
                <div className="relative z-10 my-6 flex items-center gap-3 px-2">
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.20em] text-zinc-400 dark:text-zinc-500">
                        Systems
                    </span>
                    <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
                </div>
            )}

            <nav className="relative z-10 flex flex-col gap-2">
                <NavButton
                    itemKey="tasks"
                    label="Personal Goals"
                    icon={<Target size={18} />}
                />

                <NavButton
                    itemKey="fitness"
                    label="Workout"
                    icon={<Dumbbell size={18} />}
                />

                <NavButton
                    itemKey="finance"
                    label="Finance"
                    icon={<Wallet size={18} />}
                />

                <NavButton
                    itemKey="homework"
                    label="History"
                    icon={<History size={18} />}
                />
            </nav>

            <div className="relative z-10 mt-auto border-t border-zinc-200 pt-4 dark:border-white/10">
                <div className="group relative">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-zinc-600 transition-all duration-300 hover:bg-red-50 hover:text-red-600 dark:text-zinc-300 dark:hover:bg-red-500/10 dark:hover:text-red-400 ${collapsed ? "justify-center" : ""
                            }`}
                    >
                        <LogOut size={18} />
                        {!collapsed && <span>Logout</span>}
                    </button>

                    {collapsed && (
                        <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 rounded-xl bg-zinc-900 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
                            Logout
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

export default SideNav;