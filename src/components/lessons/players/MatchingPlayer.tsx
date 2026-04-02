import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MatchingPairRequest } from "@/types/lesson/lesson";
import { Check, ChevronRight } from "@/assets/icons";
import { Button } from "@/components/ui/Button";

interface MatchingPlayerProps {
    pairs: MatchingPairRequest[];
    onFinish: (score: number) => void;
}

interface Tile {
    id: string;
    text: string;
    matchId: string;
}

const PENALTY_PER_ERROR = 10;
const ERROR_DISPLAY_DURATION_MS = 800;

export function MatchingPlayer({ pairs, onFinish }: MatchingPlayerProps) {
    const { t } = useTranslation();
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [matchedMatchIds, setMatchedMatchIds] = useState<string[]>([]);
    const [errorIds, setErrorIds] = useState<string[]>([]);
    const [errorCount, setErrorCount] = useState(0);

    /* Initialise et mélange le tableau des tuiles à la création */
    useEffect(() => {
        if (!pairs || pairs.length === 0) {
            return;
        }

        const newTiles: Tile[] = [];

        pairs.forEach((pair, index) => {
            const matchId = `pair-${index}`;
            newTiles.push({ id: `item1-${index}`, text: pair.item1, matchId });
            newTiles.push({ id: `item2-${index}`, text: pair.item2, matchId });
        });

        for (let currentIndex = newTiles.length - 1; currentIndex > 0; currentIndex--) {
            const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            [newTiles[currentIndex], newTiles[randomIndex]] = [newTiles[randomIndex], newTiles[currentIndex]];
        }

        setTiles(newTiles);
        setMatchedMatchIds([]);
        setSelectedIds([]);
        setErrorIds([]);
        setErrorCount(0);
    }, [pairs]);

    if (!pairs || pairs.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500 font-medium bg-white rounded-2xl shadow-sm">
                {t('common.no_data', 'Aucune donnée.')}
            </div>
        );
    }

    const handleTileSelection = (tileId: string) => {
        if (errorIds.length > 0) {
            return;
        }

        const currentTile = tiles.find(tile => tile.id === tileId);

        if (!currentTile || matchedMatchIds.includes(currentTile.matchId)) {
            return;
        }

        if (selectedIds.includes(tileId)) {
            setSelectedIds(selectedIds.filter(id => id !== tileId));
            return;
        }

        const newSelectedIds = [...selectedIds, tileId];
        setSelectedIds(newSelectedIds);

        if (newSelectedIds.length === 2) {
            checkSelectedPair(newSelectedIds);
        }
    };

    /* Vérifie si les deux tuiles sélectionnées constituent une paire valide */
    const checkSelectedPair = (currentSelectedIds: string[]) => {
        const firstTile = tiles.find(tile => tile.id === currentSelectedIds[0]);
        const secondTile = tiles.find(tile => tile.id === currentSelectedIds[1]);

        if (firstTile && secondTile && firstTile.matchId === secondTile.matchId) {
            setMatchedMatchIds(previous => [...previous, firstTile.matchId]);
            setSelectedIds([]);
        } else {
            setErrorIds(currentSelectedIds);
            setErrorCount(previous => previous + 1);

            setTimeout(() => {
                setErrorIds([]);
                setSelectedIds([]);
            }, ERROR_DISPLAY_DURATION_MS);
        }
    };

    const isFinished = matchedMatchIds.length === pairs.length;

    const handleFinishClick = () => {
        const finalScore = Math.max(0, 100 - (errorCount * PENALTY_PER_ERROR));
        onFinish(finalScore);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto pb-8">
            <div className="w-full mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-3">
                    <span className="uppercase tracking-widest text-[10px] sm:text-xs text-indigo-500">
                        {t('lessons.progress', "Progression de l'exercice")}
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        {matchedMatchIds.length} / {pairs.length}
                    </span>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                    <div 
                        className="bg-indigo-500 h-3 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${(matchedMatchIds.length / pairs.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 mb-6 transition-all">
                <h3 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-8 text-center leading-tight">
                    {t('lessons.matching.instruction', 'Associez les paires correspondantes')}
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-3 sm:gap-4">
                    {tiles.map(tile => {
                        const isSelected = selectedIds.includes(tile.id);
                        const isMatched = matchedMatchIds.includes(tile.matchId);
                        const isError = errorIds.includes(tile.id);

                        let buttonClass = "w-full min-h-[80px] p-4 rounded-xl border-2 transition-all duration-200 font-medium text-[15px] sm:text-lg flex items-center justify-center text-center select-none ";

                        if (isMatched) {
                            buttonClass += "border-emerald-200 bg-emerald-50 text-emerald-400 opacity-50 cursor-default scale-95";
                        } else if (isError) {
                            buttonClass += "border-red-400 bg-red-50 text-red-700";
                        } else if (isSelected) {
                            buttonClass += "border-indigo-500 bg-indigo-50 text-indigo-700 scale-105 shadow-md ring-2 ring-indigo-100";
                        } else {
                            buttonClass += "border-gray-200 bg-white text-gray-700 hover:border-indigo-200 hover:bg-gray-50 active:scale-95 shadow-sm hover:shadow-md";
                        }

                        return (
                            <button
                                key={tile.id}
                                onClick={() => handleTileSelection(tile.id)}
                                disabled={isMatched || errorIds.length > 0}
                                className={buttonClass}
                            >
                                {tile.text}
                            </button>
                        );
                    })}
                </div>
            </div>

            {isFinished && (
                <div className="w-full p-5 rounded-2xl mb-6 border-2 flex items-start gap-4 animate-[fade-in-up_0.3s_ease-out] bg-emerald-50 border-emerald-100 text-emerald-900">
                    <div className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-200 text-emerald-800">
                        <Check className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-1">
                            {t('lessons.matching.completed', 'Excellent !')}
                        </h4>
                        <p className="opacity-90 font-medium text-sm leading-relaxed mt-1">
                            {errorCount === 0 
                                ? t('lessons.matching.flawless', 'Vous avez tout trouvé du premier coup !')
                                : t('lessons.matching.with_errors', 'Toutes les paires ont été trouvées.')}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full">
                {isFinished && (
                    <Button 
                        onClick={handleFinishClick}
                        fullWidth
                        size="lg"
                        className="py-6 !bg-gray-900 hover:!bg-gray-800 text-white rounded-2xl font-medium text-lg shadow-sm"
                    >
                        {t('lessons.finish', 'Terminer')}
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
}
