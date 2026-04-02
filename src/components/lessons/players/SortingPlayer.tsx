import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SortingExerciseRequest } from "@/types/lesson/lesson";
import { Button } from "@/components/ui/Button";
import { Check, Cross, ChevronRight } from "@/assets/icons";

interface SortingPlayerProps {
    exercises: SortingExerciseRequest[];
    onFinish: (score: number) => void;
}

interface SortableItem {
    id: string;
    text: string;
    originalIndex: number;
}

export function SortingPlayer({ exercises, onFinish }: SortingPlayerProps) {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pool, setPool] = useState<SortableItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SortableItem[]>([]);
    const [isValidated, setIsValidated] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    /* Mélange le pool à chaque changement d'exercice */
    useEffect(() => {
        if (!exercises || exercises.length === 0 || !exercises[currentIndex]) {
            return;
        }

        const currentExercise = exercises[currentIndex];
        
        const initialItems: SortableItem[] = currentExercise.items.map((text, index) => ({
            id: `item-${currentIndex}-${index}`,
            text,
            originalIndex: index
        }));

        for (let currentIndex = initialItems.length - 1; currentIndex > 0; currentIndex--) {
            const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            [initialItems[currentIndex], initialItems[randomIndex]] = [initialItems[randomIndex], initialItems[currentIndex]];
        }

        setPool(initialItems);
        setSelectedItems([]);
        setIsValidated(false);
        setIsCorrect(false);
    }, [exercises, currentIndex]);

    if (!exercises || exercises.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500 font-medium bg-white rounded-2xl shadow-sm">
                {t('common.no_data', 'Aucune donnée.')}
            </div>
        );
    }

    const currentExercise = exercises[currentIndex];

    // Recalcule la solution texte à partir de correctOrder
    const expectedSequenceText = currentExercise.correctOrder
        ? currentExercise.correctOrder.map(idx => currentExercise.items[idx]).join(" ")
        : currentExercise.items.join(" ");

    const handlePoolSelection = (item: SortableItem) => {
        if (isValidated) {
            return;
        }
        
        setPool(previous => previous.filter(poolItem => poolItem.id !== item.id));
        setSelectedItems(previous => [...previous, item]);
    };

    const handleTargetDeselection = (item: SortableItem) => {
        if (isValidated) {
            return;
        }
        
        setSelectedItems(previous => previous.filter(selectedItem => selectedItem.id !== item.id));
        setPool(previous => [...previous, item]);
    };

    /* Validation de l'ordre selon l'index original par rapport à correctOrder */
    const handleValidationAction = () => {
        if (selectedItems.length === 0) {
            return;
        }
        
        setIsValidated(true);

        // Si correctOrder est fourni par le backend, on l'utilise pour valider
        // Sinon par sécurité on fallback sur un ordre simple (0, 1, 2...)
        const expectedOrder = currentExercise.correctOrder || currentExercise.items.map((_, i) => i);
        
        const isOrderCorrect = selectedItems.length === expectedOrder.length && 
                               selectedItems.every((item, index) => item.originalIndex === expectedOrder[index]);
        
        setIsCorrect(isOrderCorrect);
        
        if (isOrderCorrect) {
            setCorrectCount(previous => previous + 1);
        }
    };

    const handleNextAction = () => {
        if (currentIndex < exercises.length - 1) {
            setCurrentIndex(previous => previous + 1);
        } else {
            const finalScore = Math.round((correctCount / exercises.length) * 100);
            onFinish(finalScore);
        }
    };

    const isAllSelected = pool.length === 0;

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto pb-8">
            <div className="w-full mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-3">
                    <span className="uppercase tracking-widest text-[10px] sm:text-xs text-amber-500">
                        {t('lessons.progress', "Progression de l'exercice")}
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        {currentIndex + 1} / {exercises.length}
                    </span>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                    <div 
                        className="bg-amber-500 h-3 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 mb-6 transition-all">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-8 text-center leading-tight">
                    {t('lessons.sorting.instruction', 'Remettez les éléments dans le bon ordre')}
                </h3>

                <div className="space-y-8">
                    <div className="min-h-[140px] w-full border-t-2 border-b-2 border-dashed border-gray-200 py-6 px-4 flex flex-wrap gap-2 items-center justify-center content-start transition-all bg-gray-50/50 rounded-xl">
                        {selectedItems.length === 0 && (
                            <span className="text-gray-400 font-medium select-none text-sm sm:text-base text-center">
                                {t('lessons.sorting.empty_target', 'Sélectionnez les éléments dans le bon ordre')}
                            </span>
                        )}
                        
                        {selectedItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleTargetDeselection(item)}
                                disabled={isValidated}
                                className="px-4 py-2.5 bg-white border-2 border-amber-200 shadow-sm rounded-xl text-amber-900 font-medium text-[15px] sm:text-lg hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all active:scale-95 disabled:hover:scale-100 disabled:opacity-90 disabled:cursor-default"
                            >
                                {item.text}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2.5 justify-center min-h-[100px] content-start">
                        {pool.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handlePoolSelection(item)}
                                disabled={isValidated}
                                className="px-4 py-2.5 bg-white border-2 border-gray-200 shadow-sm rounded-xl text-gray-800 font-medium text-[15px] sm:text-lg hover:border-amber-400 hover:text-amber-800 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {item.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {isValidated && (
                <div className={`w-full p-5 rounded-2xl mb-6 border-2 flex items-start gap-4 animate-[fade-in-up_0.3s_ease-out] ${isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-red-50 border-red-100 text-red-900'}`}>
                    <div className={`mt-0.5 w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'}`}>
                        {isCorrect ? <Check className="w-5 h-5 flex-shrink-0" /> : <Cross className="w-5 h-5 flex-shrink-0" />}
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-1">
                            {isCorrect 
                                ? t('lessons.correct_answer', 'Parfait !') 
                                : t('lessons.incorrect_answer', "Oups, ce n'est pas la bonne réponse.")
                            }
                        </h4>
                        {!isCorrect && (
                            <p className="opacity-90 font-medium text-sm leading-relaxed mt-1">
                                {t('lessons.sorting.correct_order_prefix', 'Solution : ')} 
                                <strong className="font-bold">{expectedSequenceText}</strong>
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className="w-full">
                {!isValidated ? (
                    <Button 
                        onClick={handleValidationAction}
                        disabled={!isAllSelected}
                        fullWidth
                        size="lg"
                        className="py-6 font-medium text-lg shadow-sm rounded-2xl bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 border-none"
                    >
                        {t('common.validate', 'Valider')}
                    </Button>
                ) : (
                    <Button 
                        onClick={handleNextAction}
                        fullWidth
                        size="lg"
                        className="py-6 !bg-gray-900 hover:!bg-gray-800 text-white rounded-2xl font-medium text-lg shadow-sm"
                    >
                        <span>{currentIndex < exercises.length - 1 ? t('common.next', 'Continuer') : t('lessons.finish', 'Terminer')}</span>
                        {currentIndex < exercises.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
                    </Button>
                )}
            </div>
        </div>
    );
}
