import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { QCM_CONFIG } from '@/constants/home';
import { LessonQCMPhase } from '@/types/components/home';
import { Check, Cross } from '@/assets/icons';


export function QCMDemo() {
    const { t } = useTranslation();
    const [phase,setPhase] = useState<LessonQCMPhase>('idle');
    const [selected, setSelected] = useState<number | null>(null);

    const { correctIndex, wrongIndex } = QCM_CONFIG;

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (phase === 'idle') {
            timer = setTimeout(() => { setSelected(wrongIndex); setPhase('wrong'); }, 800);
        } else if (phase === 'wrong') {
            timer = setTimeout(() => { setSelected(correctIndex); setPhase('right'); }, 2000);
        } else if (phase === 'right') {
            timer = setTimeout(() => { setSelected(null); setPhase('idle'); }, 3200);
        }
        return () => clearTimeout(timer);
    }, [phase, correctIndex, wrongIndex]);

    const options = t(QCM_CONFIG.options, { returnObjects: true }) as string[];

    const getStyle = (index: number) => {
        if (selected !== index){
            return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200';
        }
        if (phase === 'wrong' && index === wrongIndex){
            return 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
        }
        if (phase === 'right' && index === correctIndex){
            return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300';
        }
        return 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300';
    };

    return (
        <div className="space-y-2.5">
            <p className="font-semibold text-gray-900 dark:text-white text-sm mb-3">{t(QCM_CONFIG.question)}</p>
            {options.map((option, index) => (
                <div key={index} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${getStyle(index)}`}>
                    <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {phase === 'right' && index === correctIndex && <span className="text-emerald-500"><Check /></span>}
                    {phase === 'wrong' && index === wrongIndex && <span className="text-red-500"><Cross /></span>}
                </div>
            ))}
            {phase === 'right' && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    {t(QCM_CONFIG.feedback)}
                </p>
            )}
        </div>
    );
}
