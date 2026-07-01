import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from '@/assets/icons';
import { AI_DEMO_KEYS, OPTION_KEYS } from '@/constants/home';
import { Button } from '@/components/ui/Button';
import { Phase } from '@/types/components/home';


export function AICourseDemo() {
    const { t } = useTranslation();
    const [demoIdx, setDemoIdx] = useState(0);
    const [phase, setPhase] = useState<Phase>('card');
    const [btnActive, setBtnActive] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<number | null>(null);

    const demo = AI_DEMO_KEYS[demoIdx % AI_DEMO_KEYS.length];
    const selectedOpt = demo.selectedOpt;

    useEffect(() => {
        if (phase === 'card') {
            const firstTimer = setTimeout(() => setBtnActive(true), 2000);
            const secondTimer = setTimeout(() => { setBtnActive(false); setPhase('options'); }, 2400);
            return () => { clearTimeout(firstTimer); clearTimeout(secondTimer); };
        }
        if (phase === 'options') {
            const firstTimer = setTimeout(() => setHoveredOption(selectedOpt), 900);
            const secondTimer = setTimeout(() => { setHoveredOption(null); setPhase('loading'); }, 1700);
            return () => { clearTimeout(firstTimer); clearTimeout(secondTimer); };
        }
        if (phase === 'loading') {
            const timer = setTimeout(() => setPhase('response'), 2000);
            return () => clearTimeout(timer);
        }
        if (phase === 'response') {
            const timer = setTimeout(() => {
                setDemoIdx(i => i + 1);
                setPhase('card');
            }, 4500);
            return () => clearTimeout(timer);
        }
    }, [phase, selectedOpt]);

    const examples = demo.examples ? t(demo.examples, { returnObjects: true }) as string[]: null;

    return (
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl border border-indigo-200/60 dark:border-indigo-500/30 p-6 w-full max-w-md mx-auto shadow-lg min-h-[380px] flex flex-col">

            <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100/50 dark:border-indigo-500/20">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{t('home.ai_demo.assistant_label')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('home.ai_demo.assistant_subtitle')}</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">

                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">{demo.fl}</span>
                        <span className="text-[10px] text-gray-400">{t(demo.context)}</span>
                    </div>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{demo.word}</p>
                </div>

                {phase === 'card' && (
                    <Button variant="none" className={`p-3.5 rounded-2xl border text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2.5 group shadow-sm ${
                        btnActive ? 'bg-indigo-600 text-white border-indigo-600 scale-95' : 'border-indigo-100 dark:border-indigo-900/30 bg-white/40 dark:bg-gray-900/30 backdrop-blur-md text-indigo-600 dark:text-indigo-400 shadow-sm'
                    }`}>
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Sparkles className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-300" />
                        <span className="relative z-10">{t('home.ai_demo.help_btn')}</span>
                    </Button>
                )}

                {phase === 'options' && (
                    <div className="grid grid-cols-2 gap-2.5">
                        {OPTION_KEYS.map((option, index) => (
                            <Button variant="none" key={index} className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-2.5 group shadow-sm ${option.style} ${hoveredOption === index ? 'shadow-md -translate-y-0.5 scale-[1.02]' : ''}`}>
                                <div className="p-1.5 rounded-xl bg-white dark:bg-gray-800 shadow-sm transition-transform group-hover:scale-110 flex-shrink-0">
                                    <option.Icon className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-bold text-xs text-gray-900 dark:text-white leading-tight mt-0.5">{t(option.label)}</span>
                            </Button>
                        ))}
                    </div>
                )}

                {phase === 'loading' && (
                    <div className="space-y-3 animate-pulse flex-1">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/5" />
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6" />
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/6" />
                        </div>
                        <div className="p-3.5 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3" />
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
                        </div>
                        <div className="flex justify-center pt-1">
                            <span className="text-xs text-gray-400 font-medium animate-bounce">{t('home.ai_demo.loading_text')}</span>
                        </div>
                    </div>
                )}

                {phase === 'response' && (
                    <div className="space-y-3 flex-1">
                        <h3 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">
                            {t(demo.title)}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t(demo.explanation)}
                        </p>
                        {demo.visualAnchor && (
                            <div className="p-3.5 bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-gray-900 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30">
                                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                    {t(demo.visualAnchor)}
                                </p>
                            </div>
                        )}
                        {examples && (
                            <div className="space-y-1.5">
                                {examples.map((exemple, index) => (
                                    <div key={index} className="text-xs text-gray-700 dark:text-gray-300 p-2.5 rounded-r-xl border-l-4 border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10 leading-relaxed">
                                        {exemple}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
