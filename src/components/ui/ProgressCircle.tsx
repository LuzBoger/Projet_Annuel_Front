import { getProgressColors } from "@/lib/utils/progressLearning";

interface ProgressCircleProps {
    percent: number;
    size?: number;
    strokeWidth?: number;
}

export function ProgressCircle({ percent, size = 48, strokeWidth = 3.5 }: ProgressCircleProps) {
    const { color } = getProgressColors(percent);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-gray-100 dark:text-gray-800"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    strokeLinecap="round"
                    stroke={color}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <span className="absolute text-[10px] font-black tracking-tight" style={{ color }}>
                {percent}%
            </span>
        </div>
    );
}
