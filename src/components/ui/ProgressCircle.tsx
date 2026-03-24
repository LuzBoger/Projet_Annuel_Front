import { getProgressColors } from "@/lib/utils/progressLearning";

interface ProgressCircleProps {
    percent: number;
}

export function ProgressCircle({ percent }: ProgressCircleProps) {
    const {color, border} = getProgressColors(percent);

    return (
        <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ color, borderColor: border }}>
            {percent}%
        </div>
    )
}