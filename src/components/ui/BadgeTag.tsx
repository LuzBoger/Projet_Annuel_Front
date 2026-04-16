interface BadgeTagProps {
    children: React.ReactNode;
    variant?: "default" | "popular";
    className?: string;
}

const variants = {
    default: "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300",
    popular: "border-yellow-200 bg-yellow-50/60 text-yellow-700 dark:bg-yellow-500/20 dark:border-yellow-500/40 dark:text-yellow-500",
}

export function BadgeTag({ children, variant = "default", className = "" }: BadgeTagProps) {
    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full border ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
