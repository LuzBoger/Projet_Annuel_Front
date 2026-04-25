export type StatsCardVariant = 'default' | 'brand' | 'emerald' | 'blue' | 'rose' | 'amber' | 'gray';

export interface StatsCardProps {
    title: string;
    value: number | string;
    color?: string;
    variant?: StatsCardVariant;
    className?: string;
}
