
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
import { BarChart2, CheckCircle, Clock, Target, Check, X } from "lucide-react";
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
        { key: 'date', label: t('lessonSession.table.date'), align: 'center' },
        { key: 'accuracy', label: t('lessonSession.table.accuracy'), align: 'center' },
        { key: 'duration', label: t('lessonSession.table.duration'), align: 'center' },
        { key: 'status', label: t('lessonSession.table.status'), align: 'center' },
        { key: 'actions', label: '', align: 'right' },
    ];

    const renderRow = (session: LessonSessionResponse) => {
        const accuracy = calculateAccuracy(session.correctAnswers, session.totalQuestions);

        return (
            <>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white max-w-[200px]">
                    <div className="truncate">{session.lessonTitle}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">{session.topicName}</div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center whitespace-nowrap">
                    {formatDate(session.completedAt)}
                </td>

                <td className="px-4 py-3 text-center whitespace-nowrap">
                    <div className="flex flex-col items-center">
                        <span className={`text-sm font-bold ${
                            accuracy >= 70 ? 'text-green-600 dark:text-green-400' : accuracy >= 40 ? 'text-amber-500 dark:text-amber-400' : 'text-red-500 dark:text-red-400'
                        }`}>
                            {accuracy}%
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            ({session.correctAnswers}/{session.totalQuestions})
                        </span>
                    </div>
                </td>

                <td className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                    {formatTotalTime(session.totalTime)}
                </td>

                <td className="px-4 py-3 text-center">
                    {session.status === 'COMPLETED' ? (
                        <BadgeTag color="green" className="w-6 h-6 mx-auto" title={t('lessonSession.status.completed')}>
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </BadgeTag>
                    ) : (
                        <BadgeTag color="red" className="w-6 h-6 mx-auto" title={t('lessonSession.status.failed')}>
                            <X className="w-3.5 h-3.5" strokeWidth={3} />
                        </BadgeTag>
                    )}
                </td>

                <td className="px-4 py-3 text-right">
                    <Button
                        variant="none"
                        onClick={() => setSelectedSession(session)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all cursor-pointer"
                        title={t('common.view')}
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                </td>
            </>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800/80 px-6 py-5 shadow-sm space-y-5">

            <h2 className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                {t('lessonSession.sessions')}
                <span className="flex-1 h-px bg-gray-200 dark:bg-gray-850" />
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <LessonSessionStats icon={<BarChart2 className="w-4 h-4" />} label={t('lessonSession.sessions')} value={lessonSessions.length} />
                <LessonSessionStats icon={<Target className="w-4 h-4" />} label={t('lessonSession.averageAccuracy')} value={`${averageAccuracy}%`} />
                <LessonSessionStats icon={<CheckCircle className="w-4 h-4" />} label={t('lessonSession.correctAnswers')} value={`${totalCorrect}/${totalQuestions}`} />
                <LessonSessionStats icon={<Clock className="w-4 h-4" />} label={t('lessonSession.totalTime')} value={`${formatTotalTime(totalSeconds)} `} />
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200 dark:border-gray-800 border-t-indigo-600 dark:border-t-indigo-500 animate-spin" />
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
                            <p className="text-sm text-center text-gray-400 dark:text-gray-500 py-8">{t('lessonSession.noSessions')}</p>
                        ) : lessonSessions.map((session) => {
                            const accuracy = calculateAccuracy(session.correctAnswers, session.totalQuestions);
                            return (
                                <div key={session.id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-gray-50/50 dark:bg-gray-900/50 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{session.lessonTitle}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{session.topicName}</p>
                                        </div>
                                        {session.status === 'COMPLETED' ? (
                                            <BadgeTag color="green" className="w-6 h-6" title={t('lessonSession.status.completed')}>
                                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                            </BadgeTag>
                                        ) : (
                                            <BadgeTag color="red" className="w-6 h-6" title={t('lessonSession.status.failed')}>
                                                <X className="w-3.5 h-3.5" strokeWidth={3} />
                                            </BadgeTag>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div>
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">{t('lessonSession.table.accuracy')}</p>
                                            <p className={`text-sm font-bold ${accuracy >= 70 ? 'text-green-600 dark:text-green-400' : accuracy >= 40 ? 'text-amber-500 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}`}>{accuracy}%</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">{t('lessonSession.table.correct')}</p>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-205">
                                                <span className="text-green-600 dark:text-green-400">{session.correctAnswers}</span>
                                                <span className="text-gray-500 dark:text-gray-400">/{session.totalQuestions}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">{t('lessonSession.table.duration')}</p>
                                            <p className="text-sm text-gray-800 dark:text-gray-205">{formatTotalTime(session.totalTime)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1 border-t border-gray-150 dark:border-gray-800/80">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(session.completedAt)}</span>
                                        <Button
                                            variant="none"
                                            onClick={() => setSelectedSession(session)}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
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