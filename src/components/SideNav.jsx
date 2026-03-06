import React from "react";
import { CheckSquare, LayoutDashboard, History, LogOut } from "lucide-react";

function SideNav({ active, onSelect }) {
    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const navItemClass = (key) =>
        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${active === key
            ? "bg-zinc-900 text-white shadow-sm"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
        }`;

    return (
        <aside className="flex h-screen w-72 flex-col border-r border-zinc-200 bg-white/90 px-4 py-5 backdrop-blur">
            {/* Brand */}
            <div className="mb-8 flex items-center gap-4 px-2">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                    <CheckSquare size={22} strokeWidth={2.3} className="relative z-10" />
                </div>

                <div className="flex flex-col leading-tight">
                    <span className="text-2xl font-semibold tracking-[-0.06em] text-zinc-900">
                        Trackly
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">
                        Journal • Tasks • History
                    </span>
                </div>
            </div>

            {/* Section label */}
            <div className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-zinc-400">
                Workspace
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => onSelect("tasks")}
                    className={navItemClass("tasks")}
                >
                    <LayoutDashboard size={18} />
                    <span>Tasks</span>
                </button>

                <button
                    type="button"
                    onClick={() => onSelect("history")}
                    className={navItemClass("history")}
                >
                    <History size={18} />
                    <span>History</span>
                </button>
            </nav>

            {/* Bottom area */}
            <div className="mt-auto border-t border-zinc-200 pt-4">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default SideNav;