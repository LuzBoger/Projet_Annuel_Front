import { MILESTONES } from "@/constants/streak";

export function getPrevMilestone(currentStreak: number) : number {
    return [...MILESTONES].reverse().find(milestone => milestone <= currentStreak) ?? 0;
}

export function getNextMilestone(current: number): number {
    return MILESTONES.find(m => m > current) ?? current + 50;
}

