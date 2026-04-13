import { LanguageFlag } from "@/components/languages/LanguageFlag";
import { LESSON_TYPE } from "@/constants/lesson";
import { LastLessonResponse } from "@/types/progress/progress";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

interface ResumeLessonCardProps {
    lesson: LastLessonResponse | null;
}

export function ResumeLessonCard({ lesson }: ResumeLessonCardProps) {
    const {t} = useTranslation();
    const navigate = useNavigate();

    if (!lesson) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">{t("lesson.resume")}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("lesson.start_first_lesson")}</p>
            </div>
        );
    }

    return (
           <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t("lesson.resume")}</p>

            <div className="flex items-center gap-2 mb-2">
                <LanguageFlag languageCode={lesson.languageCode} className="w-6 h-4 object-cover rounded-sm" />
                <span className="text-xs text-gray-400 dark:text-gray-500 uppercase">{lesson.topicName}</span>
            </div>

            <p className="font-semibold text-gray-900 dark:text-white text-base mb-1">{lesson.lessonName}</p>

            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                {lesson.completionCount}/{lesson.totalLessonsInTopic} {t("lesson.completed")}
            </p>

            <Button
                onClick={() => navigate(`/lessons/${lesson.lessonId}/play`)}
                variant="none"
                className="w-full bg-gray-900 dark:bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors mb-2"
            >
                {LESSON_TYPE[lesson.lessonType] ?? lesson.lessonType} · +{lesson.xpReward} XP
            </Button>
        </div>
    )
}
