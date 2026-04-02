import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MatchingPairResponse } from "@/types/topic/topic";
import { Cross } from "@/assets/icons";

export interface UserPairAnswer {
    id: string;
    item1: string;
    item2: string;
    tileAId?: string;
    tileBId?: string;
}

interface Tile {
    id: string;
    text: string;
    originalPairId: string;
}

interface ExamMatchingQuestionProps {
    pairs: MatchingPairResponse[];
    userPairs: UserPairAnswer[];
    onChange: (answers: UserPairAnswer[]) => void;
}

export function ExamMatchingQuestion({ pairs, userPairs, onChange }: ExamMatchingQuestionProps) {
    const { t } = useTranslation();
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    useEffect(() => {
        if (!pairs || pairs.length === 0) return;

        const answeredTileIds = new Set(userPairs.flatMap(p => [p.tileAId, p.tileBId].filter(Boolean)));
        const newTiles: Tile[] = [];
        
        pairs.forEach((pair, index) => {
            const tile1Id = `t1-${index}-${pair.id}`;
            const tile2Id = `t2-${index}-${pair.id}`;
            
            if (!answeredTileIds.has(tile1Id)) {
                newTiles.push({ id: tile1Id, text: pair.item1, originalPairId: pair.id });
            }
            if (!answeredTileIds.has(tile2Id)) {
                newTiles.push({ id: tile2Id, text: pair.item2, originalPairId: pair.id });
            }
        });

        for (let i = newTiles.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [newTiles[i], newTiles[randomIndex]] = [newTiles[randomIndex], newTiles[i]];
        }

        setTiles(newTiles);
        setSelectedIds([]);
    }, [pairs, userPairs]);

    const handleTileSelection = (tileId: string) => {
        if (selectedIds.includes(tileId)) {
            setSelectedIds(selectedIds.filter(id => id !== tileId));
            return;
        }

        const newSelected = [...selectedIds, tileId];
        
        if (newSelected.length === 2) {
            const tA = tiles.find(t => t.id === newSelected[0])!;
            const tB = tiles.find(t => t.id === newSelected[1])!;
            
            const newPair: UserPairAnswer = {
                id: tA.originalPairId,
                item1: tA.text,
                item2: tB.text,
                tileAId: tA.id,
                tileBId: tB.id
            };

            onChange([...userPairs, newPair]);
            setSelectedIds([]);
        } else {
            setSelectedIds(newSelected);
        }
    };

    const handleUndoPair = (pairToRemove: UserPairAnswer) => {
        onChange(userPairs.filter(p => p !== pairToRemove));
    };

    const isAllMatched = tiles.length === 0;

    return (
        <div className="w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 mb-6 transition-all">
             <div className="flex justify-center mb-10">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold tracking-wide uppercase">
                    {t('lessons.matching.instruction')}
                </span>
            </div>

            {isAllMatched ? (
                 <div className="text-center p-10 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-emerald-800 font-medium animate-pulse">
                    {t('topics.exam_matching_finished')}
                 </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                    {tiles.map(tile => {
                        const isSelected = selectedIds.includes(tile.id);
                        
                        let buttonClass = "w-full min-h-[90px] p-4 rounded-2xl border-2 transition-all duration-300 font-medium text-[15px] sm:text-lg flex items-center justify-center text-center select-none ";

                        if (isSelected) {
                            buttonClass += "border-indigo-500 bg-indigo-50 text-indigo-700 scale-[1.03] shadow-lg ring-4 ring-indigo-100/50";
                        } else {
                            buttonClass += "border-gray-100 bg-white text-gray-700 hover:border-indigo-200 hover:bg-indigo-50/20 active:scale-95 shadow-sm hover:shadow-md";
                        }

                        return (
                            <button
                                key={tile.id}
                                onClick={() => handleTileSelection(tile.id)}
                                className={buttonClass}
                            >
                                {tile.text}
                            </button>
                        );
                    })}
                </div>
            )}

            {userPairs.length > 0 && (
                <div className="mt-10 border-t border-gray-50 pt-8">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                        {t('topics.exam_matching_answers')}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {userPairs.map((pair, idx) => (
                            <div key={idx} className="group flex items-center bg-white border border-gray-100 hover:border-indigo-100 rounded-xl px-4 py-2.5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all">
                                <span className="font-medium text-gray-700 text-sm sm:text-base">{pair.item1}</span>
                                <span className="mx-3 text-indigo-300/70 font-bold">↔</span>
                                <span className="font-medium text-gray-700 text-sm sm:text-base">{pair.item2}</span>
                                <button 
                                    onClick={() => handleUndoPair(pair)}
                                    className="ml-4 p-1 rounded-full bg-gray-50 group-hover:bg-red-50 text-gray-300 group-hover:text-red-400 transition-all hover:rotate-90"
                                    title={t('common.undo')}
                                >
                                    <Cross className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
