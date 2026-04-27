import { ProgressColors } from "@/types/components/progressColors"

export function getProgressColors(progress: number): ProgressColors {
    if (progress === 0) {
        return {
            fill: null,
            color: "#9ca3af",
            border:"#e5e7eb"
        }
    } else if(progress <= 35) {
        return {
            fill: "#ef4444",
            color: "#ef4444",
            border:"#fca5a5"
        }
    } else if(progress <= 70) {
        return {
            fill: "#f59e0b",
            color: "#d97706",
            border:"#fcd34d"
        }
    } else {
        return {
            fill: "#22c455",
            color: "#16a34a",
            border:"#86efac"
        }
    }
}


export function calculateProgressLesson(total: number, completed: number): number {
    if(total <= 0) {
        return 0;
    }

    return Math.round((completed / total) * 100);
}
