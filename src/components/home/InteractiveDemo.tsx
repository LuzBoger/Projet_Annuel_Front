import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LESSON_INTERACTIVE_ANSWER } from '@/constants/home';
import { LessonInteractivePhase } from '@/types/components/home';
import { Check } from '@/assets/icons';

export function InteractiveDemo() {
    const { t } = useTranslation();
    const [typed, setTyped] = useState('');
    const [phase, setPhase] = useState<LessonInteractivePhase>('typing');

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (phase === 'typing') {
            if (typed.length < LESSON_INTERACTIVE_ANSWER.length) {
                timer = setTimeout(
                    () => setTyped(LESSON_INTERACTIVE_ANSWER.slice(0, typed.length + 1)),
                    typed.length === 0 ? 1000 : 200
                );
            } else {
                timer = setTimeout(() => setPhase('correct'), 700);
            }
        } else if (phase === 'correct') {
            timer = setTimeout(() => setPhase('clearing'), 2800);
        } else if (phase === 'clearing') {
            if (typed.length > 0) {
                timer = setTimeout(() => setTyped(p => p.slice(0, -1)), 80);
            } else {
                setTimeout(() => setPhase('typing'), 0);
            }
        }
        return () => clearTimeout(timer);
    }, [phase, typed]);

    return (
        <div className="space-y-4">
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{t('home.interactive_demo.instruction')}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                « {t('home.interactive_demo.sentence_before')} <span className="font-bold text-indigo-600 dark:text-indigo-400 not-italic">___</span> {t('home.interactive_demo.sentence_after')} »
            </p>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                phase === 'correct' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-indigo-200 dark:border-indigo-700 bg-white/50 dark:bg-gray-900/50'
            }`}>
                <span className="text-sm font-medium text-gray-900 dark:text-white flex-1 min-h-[1rem]">
                    {typed}
                </span>
                {phase !== 'correct' && (
                    <span className="inline-block w-0.5 h-4 bg-indigo-500 animate-pulse flex-shrink-0" />
                )}
                {phase === 'correct' && <span className="text-emerald-500 font-bold flex-shrink-0"><Check /></span>}
            </div>
            {phase === 'correct' && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    {t('home.interactive_demo.success')}
                </p>
            )}
        </div>
    );
}
