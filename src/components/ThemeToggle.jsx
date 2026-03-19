import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, getInitialTheme } from "../layouts/theme";

function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const initialTheme = getInitialTheme();
        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}

export default ThemeToggle;