import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FLASHCARDS_HOME } from '@/constants/home';
import { Button } from '@/components/ui/Button';

export function FlashcardDemo() {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const firstTimer = setTimeout(() => setFlipped(true),  1500);
        const secondTimer = setTimeout(() => setFlipped(false), 3200);
        const thirdTimer = setTimeout(() => { setIndex(i => (i + 1) % FLASHCARDS_HOME.length); }, 3800);
        return () => { clearTimeout(firstTimer); clearTimeout(secondTimer); clearTimeout(thirdTimer); };
    }, [index]);

    const flashCard = FLASHCARDS_HOME[index];

    return (
        <div className="flex flex-col items-center gap-5">
            <div style={{ perspective: '800px' }} className="w-full">
                <div
                    className="relative h-36 w-full"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                    }}
                >
                    <div className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center shadow-md" style={{ backfaceVisibility: 'hidden' }}>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase mb-1">{flashCard.fl}</span>
                        <span className="text-3xl font-black text-gray-900 dark:text-white">{flashCard.front}</span>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-indigo-600 flex flex-col items-center justify-center shadow-md" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-white/60 uppercase mb-1">{flashCard.bl}</span>
                        <span className="text-2xl font-medium italic text-white">{flashCard.back}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 w-full">
                <Button variant='none' className="flex-1 py-2 rounded-xl text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">{t('home.flashcard_demo.hard')}</Button>
                <Button variant='none' className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">{t('home.flashcard_demo.medium')}</Button>
                <Button variant='none' className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">{t('home.flashcard_demo.easy')}</Button>
            </div>
        </div>
    );
}
