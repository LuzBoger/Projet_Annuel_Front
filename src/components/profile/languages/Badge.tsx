import { FLAG_BADGE_COLORS } from "@/constants/colors";

interface BadgeProps {
    code: string;
    index: number;
}

export function Badge({ code, index }: BadgeProps) {
    const color = FLAG_BADGE_COLORS[index % Object.keys(FLAG_BADGE_COLORS).length];

    return (
            <div className="w-9 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: color.background, color: color.text }}>            
                {code.toUpperCase()}
            </div>
    );
}