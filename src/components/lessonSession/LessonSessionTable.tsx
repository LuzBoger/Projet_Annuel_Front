import { STATUS_LESSON_SESSION } from "@/constants/lessonSession";
import { useLessonSession } from "@/hooks/useLessonSession";
import { formatDate, formatTotalTime } from "@/lib/utils/date";
import { calculateAccuracy } from "@/lib/utils/lessonSession";
import { TableColumn } from "@/types/components/tableColumn";
import { LessonSessionResponse } from "@/types/lessonSession/lessonSession";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { BadgeTag } from "@/components/ui/BadgeTag";
import { Eye } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { LessonSessionStats } from "@/components/ui/LessonSessionStats";
import { BarChart2, CheckCircle, Clock, Target } from "lucide-react";
import { Table } from "@/components/ui/Table";
import { LessonSessionDetails } from "@/components/lessonSession/LessonSessionDetails";

interface LessonSessionTableProps {
    userId?: string;
}

export function LessonSessionTable({ userId }: LessonSessionTableProps) {
    const {t} = useTranslation();
    const {lessonSessions, loading, fetchAllUserLessonSessions, fetchUserLessonSessionsByUserId} = useLessonSession();
    const [selectedSession, setSelectedSession] = useState<LessonSessionResponse | null>(null);

    useEffect(() => {
        if (userId) {
            fetchUserLessonSessionsByUserId(userId);
        } else {
            fetchAllUserLessonSessions();
        }
    }, [userId, fetchAllUserLessonSessions, fetchUserLessonSessionsByUserId]);
    
    const completedSessions = lessonSessions.filter(lessonSession => lessonSession.status === 'COMPLETED');
    const averageAccuracy = completedSessions.length > 0 ? Math.round(completedSessions.reduce((acc, session) => acc + calculateAccuracy(session.correctAnswers, session.totalQuestions), 0) / completedSessions.length) : 0;    

    const totalSeconds   = lessonSessions.reduce((acc, s) => acc + s.totalTime, 0);
    const totalCorrect   = lessonSessions.reduce((acc, s) => acc + s.correctAnswers, 0);
    const totalQuestions = lessonSessions.reduce((acc, s) => acc + s.totalQuestions, 0);

    const column: TableColumn[] = [
        { key: 'lesson', label: t('lessonSession.table.lesson') },
        { key: 'topic', label: t('lessonSession.table.topic') },
        { key: 'date', label: t('lessonSession.table.date'), align: 'center' },
        { key: 'correct', label: t('lessonSession.table.correct'), align: 'center' },
        { key: 'errors', label: t('lessonSession.table.errors'), align: 'center' },
        { key: 'total', label: t('lessonSession.table.total'), align: 'center' },
        { key: 'accuracy', label: t('lessonSession.table.accuracy'), align: 'center' },
        { key: 'duration', label: t('lessonSession.table.duration'), align: 'center' },
        { key: 'status', label: t('lessonSession.table.status'), align: 'center' },
        { key: 'actions', label: '', align: 'right' },
    ];

    const renderRow = (session: LessonSessionResponse) => {
        const accuracy = calculateAccuracy(session.correctAnswers, session.totalQuestions);
        const { label, color } = STATUS_LESSON_SESSION[session.status];
        return (
            <>
                <td className="px-6 py-4 text-sm font-medium text-[#3a2e1e] dark:text-white max-w-[180px] truncate">
                    {session.lessonTitle}
                </td>
                <td className="px-6 py-4 text-sm text-[#8a7a60] dark:text-gray-400">
                    {session.topicName}
                </td>
                <td className="px-6 py-4 text-sm text-[#8a7a60] dark:text-gray-400 text-center whitespace-nowrap">
                    {formatDate(session.completedAt)}
                </td>
                <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {session.correctAnswers}
                    </span>
                </td>
                <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold text-red-500 dark:text-red-400">
                        {session.wrongAnswers}
                    </span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-[#8a7a60] dark:text-gray-400">
                    {session.totalQuestions}
                </td>
                <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-bold ${
                        accuracy >= 70 ? 'text-green-600 dark:text-green-400' : accuracy >= 40 ? 'text-amber-500 dark:text-amber-400' : 'text-red-500 dark:text-red-400'
                    }`}>
                        {accuracy}%
                    </span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-[#8a7a60] dark:text-gray-400">
                    {formatTotalTime(session.totalTime)}
                </td>
                <td className="px-6 py-4 text-center">
                    <BadgeTag color={color}>{label(t)}</BadgeTag>
                </td>
                <td className="px-6 py-4 text-right">
                    <Button
                        variant="none"
                        onClick={() => setSelectedSession(session)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#c8a97e] dark:text-amber-400 hover:text-[#a0824a] dark:hover:text-amber-300 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        {t('common.view')}
                    </Button>
                </td>
            </>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-[#e8dcc8] dark:border-gray-700 px-6 py-5 space-y-5">

            <h2 className="text-[10px] font-medium text-[#8a7a60] dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                {t('lessonSession.sessions')}
                <span className="flex-1 h-px bg-[#e8dcc8] dark:bg-gray-700" />
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <LessonSessionStats icon={<BarChart2 className="w-4 h-4" />} label={t('lessonSession.sessions')} value={lessonSessions.length} />
                <LessonSessionStats icon={<Target className="w-4 h-4" />} label={t('lessonSession.averageAccuracy')} value={`${averageAccuracy}%`} />
                <LessonSessionStats icon={<CheckCircle className="w-4 h-4" />} label={t('lessonSession.correctAnswers')} value={`${totalCorrect}/${totalQuestions}`} />
                <LessonSessionStats icon={<Clock className="w-4 h-4" />} label={t('lessonSession.totalTime')} value={`${formatTotalTime(totalSeconds)} `} />
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="w-6 h-6 rounded-full border-2 border-[#e8dcc8] border-t-[#c8a97e] animate-spin" />
                </div>
            ) : (
                <>
                    <div className="hidden md:block">
                        <Table<LessonSessionResponse>
                            data={lessonSessions}
                            columns={column}
                            renderRow={renderRow}
                            keyExtractor={(s) => s.id}
                            emptyMessage={t('lessonSession.noSessions')}
                            itemLabel={t('lessonSession.sessions', {s: lessonSessions.length > 1 ? 's' : ''})}
                            initialItemsPerPage={10}
                        />
                    </div>

                    
                    <div className="flex flex-col gap-3 md:hidden">
                        {lessonSessions.length === 0 ? (
                            <p className="text-sm text-center text-[#8a7a60] dark:text-gray-400 py-8">{t('lessonSession.noSessions')}</p>
                        ) : lessonSessions.map((session) => {
                            const accuracy = calculateAccuracy(session.correctAnswers, session.totalQuestions);
                            const { label, color } = STATUS_LESSON_SESSION[session.status];
                            return (
                                <div key={session.id} className="border border-[#e8dcc8] dark:border-gray-700 rounded-xl p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-[#3a2e1e] dark:text-white truncate">{session.lessonTitle}</p>
                                            <p className="text-xs text-[#8a7a60] dark:text-gray-400 mt-0.5">{session.topicName}</p>
                                        </div>
                                        <BadgeTag color={color}>{label(t)}</BadgeTag>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div>
                                            <p className="text-[10px] text-[#8a7a60] dark:text-gray-400 uppercase tracking-wide">{t('lessonSession.table.accuracy')}</p>
                                            <p className={`text-sm font-bold ${accuracy >= 70 ? 'text-green-600 dark:text-green-400' : accuracy >= 40 ? 'text-amber-500 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}`}>{accuracy}%</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#8a7a60] dark:text-gray-400 uppercase tracking-wide">{t('lessonSession.table.correct')}</p>
                                            <p className="text-sm font-semibold text-[#3a2e1e] dark:text-gray-200">
                                                <span className="text-green-600 dark:text-green-400">{session.correctAnswers}</span>
                                                <span className="text-[#8a7a60] dark:text-gray-400">/{session.totalQuestions}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-[#8a7a60] dark:text-gray-400 uppercase tracking-wide">{t('lessonSession.table.duration')}</p>
                                            <p className="text-sm text-[#3a2e1e] dark:text-gray-200">{formatTotalTime(session.totalTime)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1 border-t border-[#f0e8d8] dark:border-gray-700">
                                        <span className="text-xs text-[#8a7a60] dark:text-gray-400">{formatDate(session.completedAt)}</span>
                                        <Button
                                            variant="none"
                                            onClick={() => setSelectedSession(session)}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#c8a97e] dark:text-amber-400 hover:text-[#a0824a] dark:hover:text-amber-300 transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                            {t('common.view')}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            <LessonSessionDetails lessonSession={selectedSession} onClose={() => setSelectedSession(null)} />
        </div>
    );
}