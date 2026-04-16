import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MatchingPairRequest } from "@/types/lesson/lesson";
import { ChevronRight } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { PlayerLayout } from "@/components/lessons/players/common/PlayerLayout";
import { PlayerHeader } from "@/components/lessons/players/common/PlayerHeader";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";
import { PlayerFeedback } from "@/components/lessons/players/common/PlayerFeedback";
import { PlayerFooter } from "@/components/lessons/players/common/PlayerFooter";
import { ERROR_DISPLAY_DURATION_MS, PENALTY_PER_ERROR } from "@/constants/lesson";
import { initTiles } from "@/lib/utils/matchingPair";

interface MatchingPlayerProps {
    pairs: MatchingPairRequest[];
    onFinish: (score: number) => void;
}

export function MatchingPlayer({ pairs, onFinish }: MatchingPlayerProps) {
    const { t } = useTranslation();
    
    const [prevPairs, setPrevPairs] = useState(pairs);
    const [tiles, setTiles] = useState(() => initTiles(pairs));
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [matchedMatchIds, setMatchedMatchIds] = useState<string[]>([]);
    const [errorIds, setErrorIds] = useState<string[]>([]);
    const [errorCount, setErrorCount] = useState(0);

    if (pairs !== prevPairs) {
        setPrevPairs(pairs);
        setTiles(initTiles(pairs));
        setSelectedIds([]);
        setMatchedMatchIds([]);
        setErrorIds([]);
        setErrorCount(0);
    }

    if (!pairs || pairs.length === 0) {
        return (
            <PlayerLayout maxWidth="max-w-3xl">
                <div className="text-center p-8 text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-gray-800 rounded-2xl shadow-sm w-full">
                    {t('common.noData')}
                </div>
            </PlayerLayout>
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

    // Compute statuses for the header
    const statuses = pairs.map((_, idx) => {
        if (idx < matchedMatchIds.length) return 'correct';
        if (idx === matchedMatchIds.length) return 'current';
        return 'pending';
    });

    return (
        <PlayerLayout maxWidth="max-w-3xl">
            <PlayerHeader 
                current={Math.min(matchedMatchIds.length + 1, pairs.length)} 
                total={pairs.length} 
                statuses={statuses as any}
            />

            <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
                <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 my-auto">
                    <div className="space-y-6">
                        <PlayerCard 
                            instruction={<p className="text-gray-500 dark:text-gray-400 font-medium mb-1">{t('lessons.matching.instruction')}</p>}
                        >
                            <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-3 sm:gap-4">
                                {tiles.map(tile => {
                                    const isSelected = selectedIds.includes(tile.id);
                                    const isMatched = matchedMatchIds.includes(tile.matchId);
                                    const isError = errorIds.includes(tile.id);

                                    let buttonClass = "w-full min-h-[80px] p-4 rounded-xl border-2 transition-all duration-200 font-medium text-[15px] sm:text-lg flex items-center justify-center text-center select-none ";

                                    if (isMatched) {
                                        buttonClass += "border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 opacity-80 cursor-default scale-95";
                                    } else if (isError) {
                                        buttonClass += "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                                    } else if (isSelected) {
                                        buttonClass += "border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-white scale-105 shadow-md ring-2 ring-brand-100 dark:ring-brand-900";
                                    } else {
                                        buttonClass += "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-brand-200 dark:hover:border-brand-700 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 shadow-sm hover:shadow-md";
                                    }

                                    return (
                                        <Button
                                            key={tile.id}
                                            variant="none"
                                            onClick={() => handleTileSelection(tile.id)}
                                            disabled={isMatched || errorIds.length > 0}
                                            className={buttonClass}
                                        >
                                            {tile.text}
                                        </Button>
                                    );
                                })}
                            </div>
                        </PlayerCard>

                        <PlayerFeedback 
                            isVisible={isFinished}
                            isCorrect={true}
                            title={t('lessons.matching.completed')}
                            description={errorCount === 0 ? t('lessons.matching.flawless') : t('lessons.matching.with_errors')}
                        />
                    </div>
                </div>
            </div>

            <PlayerFooter>
                {isFinished && (
                    <Button 
                        onClick={handleFinishClick}
                        fullWidth
                        size="lg"
                        className="py-6 !bg-gray-900 dark:!bg-gray-700 hover:!bg-gray-800 dark:hover:!bg-gray-600 text-white rounded-2xl font-medium text-lg shadow-sm"
                    >
                        {t('lessons.finish')}
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                )}
            </PlayerFooter>
        </PlayerLayout>
    );
}
