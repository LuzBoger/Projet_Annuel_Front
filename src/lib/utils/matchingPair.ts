import { Tile } from "@/types/components/matching";
import { MatchingPairRequest } from "@/types/lesson/lesson";

export const initTiles = (pairs: MatchingPairRequest[]): Tile[] => {
    if (!pairs || pairs.length === 0) return [];
    
    const newTiles: Tile[] = [];
    pairs.forEach((pair, index) => {
        const matchId = `pair-${index}`;
        newTiles.push({ id: `item1-${index}`, text: pair.item1, matchId });
        newTiles.push({ id: `item2-${index}`, text: pair.item2, matchId });
    });

    for (let i = newTiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
    }
    return newTiles;
};