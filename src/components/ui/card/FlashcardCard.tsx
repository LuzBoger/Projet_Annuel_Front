import { clsx } from "clsx";
import { useState } from "react";

export function FlashcardCard({ fc, index, t }: { fc: { front?: string; back?: string; frontLanguage?: string; backLanguage?: string }, index: number, t: (key: string) => string }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            key={index}
            className="group perspective-1000 mb-6 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={clsx('relative w-full min-h-[220px] transition-transform duration-700 preserve-3d', isFlipped && 'rotate-y-180')}>
                <div className="absolute inset-0 backface-hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center space-y-4">
                    <div className="absolute"></div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600/60 uppercase">
                        {fc.frontLanguage || t('admin.lessons.preview.flashcard_label')}
                    </span>
                    <h4 className="text-3xl font-black text-gray-900 text-center leading-tight">
                        {fc.front}
                    </h4>
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600 border border-blue-100">
                        {index + 1}
                    </div>
                </div>

                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-600 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center space-y-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                        {t('admin.lessons.flashcards.back')}
                    </span>
                    <p className="text-2xl text-white font-medium italic text-center leading-relaxed">
                        {fc.back}
                    </p>
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white border border-white/20">
                        {index + 1}
                    </div>
                </div>
            </div>
        </div>
    );
}
