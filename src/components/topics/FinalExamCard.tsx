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
        <div className="relative flex flex-col">
            <div 
                onClick={() => isUnlocked ? onTakeExam() : undefined}
                className={`
                    flex-1 sm:p-6 p-4 rounded-3xl border-2 flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[250px]
                    ${isUnlocked 
                        ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 cursor-pointer group' 
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-80'}
                `}
                title={!isUnlocked ? t('topics.exam_locked', "Complétez toutes les leçons d'abord") : ""}
            >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm ${isUnlocked ? 'bg-white text-indigo-600 group-hover:scale-110 transition-transform' : 'bg-gray-200 text-gray-400'}`}>
                    <IconQcm className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-extrabold mb-2 ${isUnlocked ? 'text-indigo-900' : 'text-gray-500'}`}>
                    {t('topics.final_exam_title', 'Examen Final')}
                </h3>
                <p className={`text-sm mb-6 ${isUnlocked ? 'text-indigo-700' : 'text-gray-400'}`}>
                    {t('topics.final_exam_desc', 'Évaluez globalement vos nouvelles connaissances.')}
                </p>
                {isUnlocked ? (
                    <Button 
                        className="w-full mt-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            onTakeExam();
                        }}
                    >
                        {t('topics.take_exam', "Passer l'examen")}
                    </Button>
                ) : (
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-200 px-4 py-2 rounded-xl mt-auto shadow-inner">
                        {t('common.locked', 'Verrouillé')}
                    </div>
                )}
            </div>
        </div>
    );
}
