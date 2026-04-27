import { getColor } from "@/lib/utils/color";

interface BadgeProps {
    code: string;
    index: number;
}

export function Badge({ code, index }: BadgeProps) {
    const color = getColor(index);

    return (
            <div className="w-9 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: color.background, color: color.text }}>            
                {code.toUpperCase()}
            </div>
    );
}
