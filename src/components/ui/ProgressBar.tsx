import { getProgressColors } from "@/lib/utils/progressLearning";

interface ProgressBarProps {
    percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
    const {fill} = getProgressColors(percent);

    return (
        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: fill ?? "transparent" }}></div>
        </div>
    )
}