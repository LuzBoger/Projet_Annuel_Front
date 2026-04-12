interface BadgeTagProps {
    children: React.ReactNode;
    variant?: "default" | "popular";
}

const variants = {
    default: "border-gray-200 dark:border-white text-gray-600 dark:text-white",
    popular: "border-yellow-300 bg-yellow-50 text-yellow-700",
}

export function BadgeTag({ children, variant = "default" }: BadgeTagProps) {
    return (
        <span className={`px-3 py-1 text-xs rounded-full border ${variants[variant]}`}>
            {children}
        </span>
    );
}