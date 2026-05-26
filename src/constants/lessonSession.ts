import { LessonSessionStatus, LessonSessionStatusStats } from "@/types/lessonSession/lessonSession";

export const STATUS_LESSON_SESSION: Record<LessonSessionStatus, LessonSessionStatusStats> = {
    COMPLETED: {
        label: (t) => t('lessonSession.status.completed'),
        color: 'green'
    },
    FAILED: {
        label: (t) => t('lessonSession.status.failed'),
        color: 'red'
    }
};