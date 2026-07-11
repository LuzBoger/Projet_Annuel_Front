
import { STATUS_LESSON_SESSION } from '@/constants/lessonSession';
import { calculateAccuracy } from '@/lib/utils/lessonSession';
import { LessonSessionResponse } from '@/types/lessonSession/lessonSession';
import { Modal } from '@/components/ui/Modal';
import { useTranslation } from 'react-i18next';
import { BadgeTag } from '@/components/ui/BadgeTag';
import { Clock } from 'lucide-react';
import { formatDate, formatTotalTime } from '@/lib/utils/date';


interface LessonSessionDetailsProps {
    lessonSession: LessonSessionResponse | null;
    onClose: () => void;
}


export function LessonSessionDetails({ lessonSession, onClose }: LessonSessionDetailsProps) {
    const {t} = useTranslation();

    if(!lessonSession) {
        return null;
    }

    const accuracy = calculateAccuracy(lessonSession.correctAnswers, lessonSession.totalQuestions);
    const errors = lessonSession.wrongAnswers;
    const {label, color} = STATUS_LESSON_SESSION[lessonSession.status];

    return (
        <Modal isOpen={!!lessonSession} onClose={onClose} title={t('lessonSession.details.title')}  size="md">
            <div className="space-y-5">

                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{lessonSession.lessonTitle}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{lessonSession.topicName}</p>
                    </div>
                    <BadgeTag color={color}>{label(t)}</BadgeTag>
                </div>

                <hr className="border-gray-100 dark:border-gray-800" />

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{lessonSession.correctAnswers}</p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1 font-medium">{t('lessonSession.details.correctAnswers')}</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-red-600 dark:text-red-400">{errors}</p>
                        <p className="text-xs text-red-700 dark:text-red-400 mt-1 font-medium">{t('lessonSession.details.errors')}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-gray-700 dark:text-white">{lessonSession.totalQuestions}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{t('lessonSession.details.totalQuestions')}</p>
                    </div>
                    <div className="bg-[#faf7f2] dark:bg-amber-500/10 border border-[#e8dcc8] dark:border-amber-500/20 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-[#c8a97e] dark:text-amber-400">{accuracy}%</p>
                        <p className="text-xs text-[#8a7a60] dark:text-amber-400 mt-1 font-medium">{t('lessonSession.details.accuracy')}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {formatTotalTime(lessonSession.totalTime)}
                    </span>
                    <span>{formatDate(lessonSession.completedAt)}</span>
                </div>

            </div>
        </Modal>
    );
}