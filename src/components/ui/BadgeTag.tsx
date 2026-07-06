import { BadgeColor, BadgeTagProps } from "@/types/components/badge";

const colorMap: Record<BadgeColor, string> = {
    brand: "bg-brand-50/80 dark:bg-brand-500/20 border-brand-300/50 dark:border-brand-500/40 text-brand-700 dark:text-brand-400",
    blue: "bg-blue-50/80 dark:bg-blue-500/20 border-blue-300/50 dark:border-blue-500/40 text-blue-700 dark:text-blue-400",
    green: "bg-green-50/80 dark:bg-green-500/20 border-green-300/50 dark:border-green-500/40 text-green-700 dark:text-green-400",
    red: "bg-red-50/80 dark:bg-red-500/20 border-red-300/50 dark:border-red-500/40 text-red-700 dark:text-red-400",
    yellow: "bg-yellow-50/80 dark:bg-yellow-500/20 border-yellow-300/50 dark:border-yellow-500/40 text-yellow-700 dark:text-yellow-400",
    gray: "bg-gray-50/80 dark:bg-gray-500/20 border-gray-300/50 dark:border-gray-500/40 text-gray-700 dark:text-gray-400",
    purple: "bg-purple-50/80 dark:bg-purple-500/20 border-purple-300/50 dark:border-purple-500/40 text-purple-700 dark:text-purple-400"
};

export function BadgeTag({ children, color = "gray", className = "", title }: BadgeTagProps) {
    const isIconOnly = className.includes("w-") || className.includes("h-");
    return (
        <span className={`inline-flex items-center justify-center gap-1.5 font-semibold border ${colorMap[color]} transition-all duration-200
            ${isIconOnly ? 'rounded-full' : 'px-3 py-1 text-xs rounded-xl'} ${className}`} title={title}>
            {children}
        </span>
    );
}
