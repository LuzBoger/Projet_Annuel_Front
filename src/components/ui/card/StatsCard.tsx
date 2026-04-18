import { clsx } from "clsx";

export type StatsCardVariant = 'default' | 'brand' | 'emerald' | 'blue' | 'rose' | 'amber' | 'gray';

interface StatsCardProps {
    title: string;
    value: number | string;
    color?: string;
    variant?: StatsCardVariant;
    className?: string;
}

const variantMap: Record<StatsCardVariant, { container: string; title: string; value: string }> = {
    default: {
        container: "bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 shadow-sm",
        title: "text-slate-500 dark:text-gray-400",
        value: "text-gray-900 dark:text-white"
    },
    brand: {
        container: "bg-brand-50/50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20 shadow-sm",
        title: "text-brand-600 dark:text-brand-400",
        value: "text-brand-900 dark:text-brand-50"
    },
    emerald: {
        container: "bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 shadow-sm",
        title: "text-emerald-600 dark:text-emerald-400",
        value: "text-emerald-900 dark:text-emerald-50"
    },
    blue: {
        container: "bg-blue-50/50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 shadow-sm",
        title: "text-blue-600 dark:text-blue-400",
        value: "text-blue-900 dark:text-blue-50"
    },
    rose: {
        container: "bg-rose-50/50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 shadow-sm",
        title: "text-rose-600 dark:text-rose-400",
        value: "text-rose-900 dark:text-rose-50"
    },
    amber: {
        container: "bg-amber-50/50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 shadow-sm",
        title: "text-amber-600 dark:text-amber-400",
        value: "text-amber-900 dark:text-amber-50"
    },
    gray: {
        container: "bg-gray-50/50 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20 shadow-sm",
        title: "text-gray-600 dark:text-gray-400",
        value: "text-gray-900 dark:text-gray-50"
    }
};

export function StatsCard({ title, value, color, variant = 'default', className }: StatsCardProps) {
    const theme = variantMap[variant];
    
    return (
        <div className={clsx(
            "rounded-2xl border p-6 transition-all duration-300",
            theme.container,
            className
        )}>
            <p className={clsx("text-sm font-semibold uppercase tracking-wider", theme.title)}>
                {title}
            </p>
            <p className={clsx(
                "text-3xl font-black mt-2",
                color || theme.value
            )}>
                {value}
            </p>
        </div>
    );
}
