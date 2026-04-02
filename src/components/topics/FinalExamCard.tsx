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
                    flex-1 sm:p-8 p-6 rounded-[2.5rem] border-2 flex flex-col justify-center items-center text-center transition-all duration-500 min-h-[300px]
                    ${isUnlocked 
                        ? 'bg-white border-indigo-100 hover:border-indigo-400 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] cursor-pointer' 
                        : 'bg-gray-50 border-gray-100 cursor-not-allowed grayscale'}
                `}
                title={!isUnlocked ? t('topics.exam_locked') : ""}
            >
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-sm transition-all duration-500 ${isUnlocked ? 'bg-indigo-50 text-indigo-600 group-hover:scale-110 group-hover:rotate-3' : 'bg-gray-100 text-gray-400'}`}>
                    <IconQcm className="w-10 h-10" />
                </div>
                
                <div className="space-y-3 mb-8">
                    <h3 className={`text-2xl font-bold tracking-tight ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                        {t('topics.final_exam_title')}
                    </h3>
                    <p className={`text-[15px] leading-relaxed max-w-[200px] mx-auto ${isUnlocked ? 'text-gray-500' : 'text-gray-400'}`}>
                        {t('topics.final_exam_desc')}
                    </p>
                </div>

                <div className="w-full">
                    {isUnlocked ? (
                        <Button 
                            className="w-full py-4 rounded-2xl font-bold shadow-indigo-200 shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                onTakeExam();
                            }}
                        >
                            {t('topics.take_exam')}
                        </Button>
                    ) : (
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-100/50 backdrop-blur-sm border border-gray-200/50 px-6 py-2.5 rounded-full inline-block">
                            {t('common.locked')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
