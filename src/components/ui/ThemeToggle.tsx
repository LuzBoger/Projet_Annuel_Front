import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const ctx = useContext(ThemeContext);

    if (!ctx) return null;

    const isDark = ctx.theme === "dark";

    return (
        <button
            type="button"
            onClick={() => ctx.toggle()}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}
