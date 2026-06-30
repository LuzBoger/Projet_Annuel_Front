import { useChallenge } from "@/hooks/useChallenge";
import { friendsService } from "@/services/friendsService";
import { ChallengeTabType, ChallengeUser } from "@/types/challenges/challenge";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { Avatar } from "@/components/ui/Avatar";
import { getProfileImageUrl } from "@/lib/utils/image";
import { PARTICIPANTS_PAGE_SIZE } from "@/constants/challenge";

interface ParticipantsModalProps {
    languageId: string;
    onSelect: (participant: ChallengeUser) => void;
    onClose: () => void;
}

export function ParticipantsModal({ languageId, onSelect, onClose }: ParticipantsModalProps) {
    const { t } = useTranslation();
    const { getOthersParticipants } = useChallenge();
    const [tab, setTab] = useState<ChallengeTabType>('all');
    const [friends, setFriends] = useState<ChallengeUser[]>([]);
    const [allUsers, setAllUsers] = useState<ChallengeUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        Promise.all([
            friendsService.getFriends(),
            getOthersParticipants(languageId),
        ]).then(([friendsData, allData]) => {
            setFriends(friendsData.map(f => ({ id: f.accountId, username: f.username, photoUrl: f.photoUrl ?? null })));
            setAllUsers(allData);
        }).finally(() => setLoading(false));
    }, [languageId, getOthersParticipants]);

    const handleTabChange = (tab: ChallengeTabType) => {
        setTab(tab);
        setPage(0);
    };

    const participants = tab === 'friends' ? friends : allUsers;
    const totalPages = Math.ceil(participants.length / PARTICIPANTS_PAGE_SIZE);
    const paginated = participants.slice(page * PARTICIPANTS_PAGE_SIZE, (page + 1) * PARTICIPANTS_PAGE_SIZE);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('challenge.form.opponent.select')}</h2>
                    <Button variant="none" onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">✕</Button>
                </div>

                <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                    <Button
                        variant="none"
                        onClick={() => handleTabChange('friends')}
                        className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors ${tab === 'friends' ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        {t('challenge.form.opponent.friends')}
                    </Button>
                    <Button
                        variant="none"
                        onClick={() => handleTabChange('all')}
                        className={`pb-2 px-3 text-sm font-medium border-b-2 transition-colors ${tab === 'all' ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        {t('challenge.form.opponent.all')}
                    </Button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400 dark:text-gray-500 py-4">{t('common.loading')}</p>
                ) : participants.length === 0 ? (
                    <p className="text-center text-gray-400 dark:text-gray-500 py-4">{t('challenge.form.opponent.empty')}</p>
                ) : (
                    <>
                        <ul className="space-y-2 min-h-[200px]">
                            {paginated.map(participant => (
                                <li key={participant.id}>
                                    <Button
                                        type="button"
                                        variant="none"
                                        onClick={() => { onSelect(participant); onClose(); }}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                                    >
                                        <Avatar imageUrl={participant.photoUrl ? getProfileImageUrl(participant.photoUrl) : undefined} size="w-10 h-10" />
                                        <span className="font-medium text-gray-900 dark:text-white">{participant.username}</span>
                                    </Button>
                                </li>
                            ))}
                        </ul>

                        {totalPages > 1 && (
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                <Pagination
                                    currentPage={page + 1}
                                    hasMore={page < totalPages - 1}
                                    onNext={() => setPage(p => p + 1)}
                                    onPrev={() => setPage(p => p - 1)}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
