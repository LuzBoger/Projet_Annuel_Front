import { FC, SVGProps } from "react";

export type Phase = 'card' | 'options' | 'loading' | 'response';
export type LessonTypeHome = 'flashcard' | 'qcm' | 'matching' | 'sorting' | 'interactive';
export type LessonInteractivePhase = 'typing' | 'correct' | 'clearing';
export type MatchingPairSide = 'left' | 'right';
export type LessonQCMPhase = 'idle' | 'wrong' | 'right';
export type IconType = FC<SVGProps<SVGSVGElement>>;

export interface LessonTypeDemo {
    key: LessonTypeHome;
    label: string;
    description: string;
}

export interface MatchingPairTile {
    id: string;
    side: MatchingPairSide;
}

export interface AIDemo {
    word: string;
    fl: string;
    selectedOpt: number;
    context: string;
    title: string;
    explanation: string;
    visualAnchor: string | null;
    examples: string | null;
};

export interface HelpOption {
    label: string;
    Icon: IconType;
    style: string;
};