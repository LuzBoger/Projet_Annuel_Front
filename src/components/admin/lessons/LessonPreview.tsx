import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LessonType } from "@/types/lesson/lesson";

interface LessonPreviewProps {
    data: any;
}

function FlashcardCard({ fc, index, t }: { fc: any, index: number, t: any }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            key={index}
            className="group perspective-1000 mb-6 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full min-h-[220px] transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
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

                {/* Back */}
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

export function LessonPreview({ data }: LessonPreviewProps) {
    const { t } = useTranslation();
    const { lessonType, title, description } = data;

    if (!title && !lessonType) {
        return (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-400">
                <p>{t('admin.lessons.preview.no_data')}</p>
            </div>
        );
    }

    const renderCard = (content: React.ReactNode, index: number) => (
        <div key={index} className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6 overflow-hidden transition-all hover:shadow-md">

            {content}
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600 border border-blue-100">
                {index + 1}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Perspective & 3D CSS Helpers */}
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>

            <div className="px-2">
                <h3 className="text-xl font-extrabold text-gray-900 mb-1">{title || t('admin.lessons.form.untitled')}</h3>
                <p className="text-sm text-gray-500">{description || t('admin.lessons.form.no_description')}</p>
            </div>

            <div className="max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                {lessonType === LessonType.FLASHCARD && (data.flashcards?.length > 0 ? data.flashcards : [{ front: "Aperçu", back: "Prévisualisation" }]).map((fc: any, i: number) =>
                    <FlashcardCard key={i} fc={fc} index={i} t={t} />
                )}

                {lessonType === LessonType.QCM && (data.questions?.length > 0 ? data.questions : [{ question: "Exemple de question ?", options: ["Option A", "Option B"] }]).map((q: any, i: number) =>
                    renderCard(
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-gray-900 leading-snug">
                                {q.question}
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                                {q.options?.map((opt: string, optIdx: number) => (
                                    <div key={optIdx} className="flex items-center p-4 rounded-xl border-2 border-gray-50 bg-gray-50/30 text-sm font-medium text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-3 text-[10px] text-gray-400">
                                            {String.fromCharCode(65 + optIdx)}
                                        </div>
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        </div>,
                        i
                    )
                )}

                {lessonType === LessonType.MATCHING_PAIR && renderCard(
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600/60 uppercase">
                            {t('admin.lessons.preview.matching_label', 'Paires de mots')}
                        </span>
                        <div className="space-y-3">
                            {(data.matchingPairs?.length > 0 ? data.matchingPairs : [
                                { item1: "Item 1", item2: "Correspondance 1" },
                                { item1: "Item 2", item2: "Correspondance 2" }
                            ]).map((p: any, i: number) => (
                                <div key={i} className="flex items-center justify-between gap-4 py-2">
                                    <div className="flex-1 p-3 bg-blue-50 rounded-xl border border-blue-100 text-center font-bold text-blue-700 text-sm">
                                        {p.item1}
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-3 bg-white rounded-xl border border-gray-100 text-center font-bold text-gray-700 text-sm">
                                        {p.item2}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>,
                    0
                )}

                {lessonType === LessonType.SORTING_EXERCISE && renderCard(
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600/60 uppercase">
                            {t('admin.lessons.preview.sorting_label')}
                        </span>
                        <div className="space-y-2">
                            {(data.sortingItems?.length > 0 ? data.sortingItems.map((item: any) => item.value) : ["Item A", "Item B", "Item C"]).map((item: string, i: number) => (
                                <div key={i} className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                    <div className="mr-4 text-gray-300">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{item ? item.trim() : `Élément ${i + 1}`}</span>
                                </div>
                            ))}
                        </div>
                    </div>,
                    0
                )}
            </div>

            <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center pt-4 border-t border-gray-100 font-bold">
                {t('admin.lessons.preview.visual_confirm')}
            </p>
        </div>
    );
}
