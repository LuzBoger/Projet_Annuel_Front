export interface UserPairAnswer {
    id: string;
    item1: string;
    item2: string;
    tileAId?: string;
    tileBId?: string;
}

export interface Tile {
    id: string;
    text: string;
    originalPairId: string;
}
