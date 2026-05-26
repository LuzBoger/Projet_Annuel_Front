import { useChallenge } from "@/hooks/useChallenge";
import { ChallengeUser } from "@/types/challenges/challenge";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { getProfileImageUrl } from "@/lib/utils/image";

interface ParticipantsModalProps {
    languageId: string;
    onSelect: (participant: ChallengeUser) => void;
    onClose: () => void;
}

export function ParticipantsModal({ languageId, onSelect, onClose }: ParticipantsModalProps) {
    const {t} = useTranslation();
    const { getOthersParticipants } = useChallenge();
    const [participants, setParticipants] = useState<ChallengeUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOthersParticipants(languageId).then(data => {
            setParticipants(data);
            setLoading(false);
        });
    }, [languageId, getOthersParticipants]);

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('challenge.form.opponent.select')}</h2>
                        <Button variant="none" onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">✕</Button>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-400 dark:text-gray-500 py-4">{t('common.loading')}</p>
                    ) : participants.length === 0 ? (
                        <p className="text-center text-gray-400 dark:text-gray-500 py-4">{t('challenge.form.opponent.empty')}</p>
                    ) : (
                        <ul className="space-y-2 max-h-72 overflow-y-auto">
                            {participants.map(participant => (
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
                    )}
                </div>
            </div>
        );
}