import { useTranslation } from "react-i18next";
import { IconQcm } from "@/assets/icons";
import { Button } from "@/components/ui/Button";

interface FinalExamCardProps {
    isUnlocked: boolean;
    onTakeExam: () => void;
}

export function FinalExamCard({ isUnlocked, onTakeExam }: FinalExamCardProps) {
    const { t } = useTranslation();

    return (
        <div className="relative flex flex-col h-full group">
            <div 
                onClick={() => isUnlocked ? onTakeExam() : undefined}
                className={`
                    flex-1 p-6 rounded-2xl border-2 flex flex-col justify-center items-center text-center transition-all duration-500 min-h-[260px]
                    ${isUnlocked 
                        ? 'bg-white dark:bg-gray-800 border-brand-100 dark:border-brand-900/30 hover:border-brand-400 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] cursor-pointer'
                        : 'bg-gray-50 dark:bg-gray-950 border-gray-100 dark:border-gray-800 cursor-not-allowed grayscale'}
                `}
                title={!isUnlocked ? t('topics.exam_locked') : ""}
            >
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-4 shadow-sm transition-all duration-500 ${isUnlocked ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:rotate-3' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'}`}>
                    <IconQcm className="w-10 h-10" />
                </div>
                
                <div className="space-y-2 mb-6">
                    <h3 className={`text-xl font-bold tracking-tight ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                        {t('topics.final_exam_title')}
                    </h3>
                    <p className={`text-sm leading-relaxed max-w-[200px] mx-auto ${isUnlocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
                        {t('topics.final_exam_desc')}
                    </p>
                </div>

                <div className="w-full">
                    {isUnlocked ? (
                        <Button 
                            className="w-full py-3 rounded-2xl font-bold shadow-brand-200 shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                onTakeExam();
                            }}
                        >
                            {t('topics.take_exam')}
                        </Button>
                    ) : (
                        <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 px-6 py-2.5 rounded-full inline-block">
                            {t('common.locked')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
