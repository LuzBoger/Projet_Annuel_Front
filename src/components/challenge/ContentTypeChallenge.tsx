import { Challenge } from "@/types/challenges/challenge";
import React from "react";
import { useTranslation } from "react-i18next";
import { ChallengeCard } from "@/components/ui/card/ChallengeCard";
import { Pagination } from "@/components/ui/Pagination";

interface ContentTypeChallengeProps {
    loading: boolean;
    challenges: Challenge[];
    allTypeChallenges: Challenge[];
    icon: React.ReactNode;
    message: string;
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    onClick: (id: string) => void;
}

export function ContentTypeChallenge({ loading, challenges, allTypeChallenges, icon, message, currentPage, totalPages, onPrev, onNext, onClick }: ContentTypeChallengeProps) {
    const {t} = useTranslation();
    if (loading) {
        return (
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 py-8 justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-600 dark:border-indigo-500" />
            <p>{t('common.loading')}</p>
        </div>
        );
    }

    if (challenges.length === 0) {
        return (
        <div className="text-center py-12">
            <div className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3">
            {icon}
            </div>
            <p className="text-gray-400 dark:text-gray-500">{message}</p>
        </div>
        );
    }

    return (
        <>
        <div className="space-y-3">
            {allTypeChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} onClick={() => onClick(challenge.id)} />
            ))}
        </div>
        {totalPages > 1 && (
            <div className="mt-4">
            <Pagination
                currentPage={currentPage}
                hasMore={currentPage < totalPages}
                onPrev={onPrev}
                onNext={onNext}
            />
            </div>
        )}
        </>
    );
}