import { useTranslation } from "react-i18next";
import { MatchingPairRequest } from "@/types/lesson/lesson";

interface MatchingPlayerProps {
    pairs: MatchingPairRequest[];
    onFinish: (score: number) => void;
}

export function MatchingPlayer({ pairs, onFinish }: MatchingPlayerProps) {
    const { t } = useTranslation();
    
    if (!pairs || pairs.length === 0) return <div>{t('common.no_data', 'Aucune donnée.')}</div>;

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto pb-8">
            <div className="text-center p-10 bg-white shadow-xl rounded-2xl border border-pink-100 max-w-lg w-full">
                <h3 className="text-2xl font-bold mb-4 text-pink-900">Module MATCHING</h3>
                <p className="text-gray-500 mb-6 font-medium">Ce joueur (drag and drop) est en cours de création. Voulez-vous simuler l'envoi du score au LessonPlayer parent ?</p>
                <button onClick={() => onFinish(100)} className="px-6 py-3 bg-pink-600 text-white rounded-xl font-bold shadow-md hover:bg-pink-700 w-full transition">Terminer avec 100%</button>
            </div>
        </div>
    );
}
