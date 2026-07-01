import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlashcardDemo } from './FlashcardDemo';
import { QCMDemo } from '@/components/home/QCMDemo';
import { MatchingDemo } from '@/components/home/MatchingDemo';
import { SortingDemo } from '@/components/home/SortingDemo';
import { InteractiveDemo } from '@/components/home/InteractiveDemo';
import { LessonTypeHome } from '@/types/components/home';
import { DEMO_TAB_LESSONS } from '@/constants/home';
import { Button } from '../ui/Button';

export function ExerciseDemoSection() {
    const { t } = useTranslation();
    const [active, setActive] = useState<LessonTypeHome>('flashcard');

    return (
        <section id="lessons" className="bg-gray-50/80 dark:bg-gray-950/60 py-20 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-3">
                        {t('home.exercise_section.title_start')}<span className="text-brand-600">{t('home.exercise_section.title_highlight')}</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {t('home.exercise_section.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-[1fr_480px] gap-10 items-start">
                    <div className="space-y-3">
                        {DEMO_TAB_LESSONS.map(tab => (
                            <Button
                                variant='none'
                                key={tab.key}
                                onClick={() => setActive(tab.key)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                                    active === tab.key ? 'border-brand-500 bg-white dark:bg-gray-900/70 shadow-md' : 'border-transparent bg-white/60 dark:bg-gray-900/30 hover:border-gray-200 dark:hover:border-gray-700'
                                }`}
                            >
                                <div className={`w-1.5 self-stretch rounded-full flex-shrink-0 ${active === tab.key ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                                <div>
                                    <p className={`font-bold text-sm ${active === tab.key ? 'text-brand-700 dark:text-brand-400' : 'text-gray-900 dark:text-white'}`}>
                                        {t(tab.label)}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t(tab.description)}</p>
                                </div>
                            </Button>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl border border-indigo-200/60 dark:border-indigo-500/30 p-6 shadow-lg min-h-56 flex items-center sticky top-8">
                        <div className="w-full">
                            {active === 'flashcard' && <FlashcardDemo />}
                            {active === 'qcm' && <QCMDemo />}
                            {active === 'matching' && <MatchingDemo />}
                            {active === 'sorting' && <SortingDemo />}
                            {active === 'interactive' && <InteractiveDemo />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
