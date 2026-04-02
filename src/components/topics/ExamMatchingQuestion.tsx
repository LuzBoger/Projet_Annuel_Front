import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MatchingPairResponse } from "@/types/topic/topic";

export interface UserPairAnswer {
    id: string;
    item1: string;
    item2: string;
    tileAId?: string;
    tileBId?: string;
}

interface ExamMatchingQuestionProps {
    pairs: MatchingPairResponse[];
    userPairs: UserPairAnswer[];
    onChange: (answers: UserPairAnswer[]) => void;
}

interface Tile {
    id: string;
    text: string;
    originalPairId: string;
}

export function ExamMatchingQuestion({ pairs, userPairs, onChange }: ExamMatchingQuestionProps) {
    const { t } = useTranslation();
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    // Initialisation des tuiles
    useEffect(() => {
        if (!pairs || pairs.length === 0) return;

        // On se base sur les identifiants uniques des tuiles sélectionnées, et non sur leur texte,
        // car plusieurs tuiles peuvent avoir le même texte ("a" = "un", "one" = "un")
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

        // Mélanger les tuiles restantes
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
            // Former la paire
            const tA = tiles.find(t => t.id === newSelected[0])!;
            const tB = tiles.find(t => t.id === newSelected[1])!;
            
            // On soumet la paire
            const newPair: UserPairAnswer = {
                id: tA.originalPairId, // On reprend l'ID original de l'élément A au cas où l'API l'exige
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
             <div className="flex justify-center mb-8">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold tracking-wide uppercase">
                    {t('lessons.matching.instruction', 'Associez les paires correspondantes')}
                </span>
            </div>

            {isAllMatched ? (
                 <div className="text-center p-8 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 font-medium">
                    {t('topics.exam_matching_finished', 'Toutes les paires ont été associées. Vous pouvez continuer ou annuler une paire.')}
                 </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                    {tiles.map(tile => {
                        const isSelected = selectedIds.includes(tile.id);
                        
                        let buttonClass = "w-full min-h-[80px] p-4 rounded-xl border-2 transition-all duration-200 font-medium text-[15px] sm:text-lg flex items-center justify-center text-center select-none ";

                        if (isSelected) {
                            buttonClass += "border-indigo-500 bg-indigo-50 text-indigo-700 scale-105 shadow-md ring-2 ring-indigo-100";
                        } else {
                            buttonClass += "border-gray-200 bg-white text-gray-700 hover:border-indigo-200 hover:bg-gray-50 active:scale-95 shadow-sm hover:shadow-md";
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
                <div className="mt-8 border-t border-gray-100 pt-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                        {t('topics.exam_matching_answers', 'Paires formées')}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {userPairs.map((pair, idx) => (
                            <div key={idx} className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                                <span className="font-medium text-gray-800">{pair.item1}</span>
                                <span className="mx-2 text-indigo-400">↔</span>
                                <span className="font-medium text-gray-800">{pair.item2}</span>
                                <button 
                                    onClick={() => handleUndoPair(pair)}
                                    className="ml-4 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                                    title={t('common.undo', 'Annuler')}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
