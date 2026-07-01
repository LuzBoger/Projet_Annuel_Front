import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SORT_WORDS } from '@/constants/home';

export function SortingDemo() {
    const { t } = useTranslation();
    const [placed, setPlaced] = useState<number[]>([]);

    useEffect(() => {
        if (placed.length >= SORT_WORDS.length) {
            const timer = setTimeout(() => setPlaced([]), 2200);
            return () => clearTimeout(timer);
        }
        const timer = setTimeout(() => setPlaced(place => [...place, place.length]), placed.length === 0 ? 900 : 680);
        return () => clearTimeout(timer);
    }, [placed]);

    return (
        <div className="space-y-4">
            <div className="min-h-12 bg-white/60 dark:bg-gray-900/40 rounded-xl border-2 border-dashed border-indigo-200 dark:border-indigo-700 p-3 flex flex-wrap gap-2 items-center">
                {placed.length === 0 ? <span className="text-xs text-gray-400 italic">{t('home.sorting_demo.placeholder')}</span> : placed.map(index => (
                        <span key={index} className="px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-semibold" style={{ animation: 'fadeUp 0.3s ease' }}>
                            {SORT_WORDS[index]}
                        </span>
                    ))
                }
                {placed.length === SORT_WORDS.length && (
                    <span className="ml-auto text-emerald-500 text-sm font-bold">{t('home.sorting_demo.correct')}</span>
                )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
                {SORT_WORDS.map((word, index) => (
                    <span
                        key={index}
                        className={`px-3 py-1.5 rounded-lg border-2 text-sm font-semibold transition-all duration-300 ${
                            placed.includes(index) ? 'opacity-0 pointer-events-none' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
}
