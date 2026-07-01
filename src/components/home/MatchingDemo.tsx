import { useState, useEffect } from 'react';
import { MATCH_PAIRS, MATCH_RIGHT_ORDER } from '@/constants/home';
import { MatchingPairTile } from '@/types/components/home';

export function MatchingDemo() {
    const [matched, setMatched] = useState<string[]>([]);
    const [selLeft, setSelLeft]  = useState<string | null>(null);
    const [selRight, setSelRight] = useState<string | null>(null);
    const [matchingPairIndex, setMatchingPairIndex] = useState(0);

    useEffect(() => {
        if (matchingPairIndex >= MATCH_PAIRS.length) {
            const resetTimer = setTimeout(() => { setMatched([]); setMatchingPairIndex(0); }, 2000);
            return () => clearTimeout(resetTimer);
        }
        const pair = MATCH_PAIRS[matchingPairIndex];
        const firstTimer = setTimeout(() => setSelLeft(pair.id),  600);
        const secondTimer = setTimeout(() => setSelRight(pair.id), 1400);
        const thirdTimer = setTimeout(() => {
            setMatched(matchingPair => [...matchingPair, pair.id]);
            setSelLeft(null);
            setSelRight(null);
            setMatchingPairIndex(i => i + 1);
        }, 2100);
        return () => { clearTimeout(firstTimer); clearTimeout(secondTimer); clearTimeout(thirdTimer); };
    }, [matchingPairIndex]);

    const tileStyle = (tile: MatchingPairTile) => {
        const isMatched  = matched.includes(tile.id);
        const isSelected = tile.side === 'left' ? selLeft === tile.id : selRight === tile.id;
         if (isMatched){
            return 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 opacity-50';
        }
        if (isSelected){
            return 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 scale-105';
        }
        return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    };

    const rightSide = MATCH_RIGHT_ORDER.map(id => MATCH_PAIRS.find(matchingPair => matchingPair.id === id)!);

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
                {MATCH_PAIRS.map(matchingPair => (
                    <div key={matchingPair.id} className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium text-center transition-all duration-200 ${tileStyle({ ...matchingPair, side: 'left' })}`}>
                        {matchingPair.left}
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                {rightSide.map(matchingPair => (
                    <div key={matchingPair.id} className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium text-center transition-all duration-200 ${tileStyle({ ...matchingPair, side: 'right' })}`}>
                        {matchingPair.right}
                    </div>
                ))}
            </div>
        </div>
    );
}
