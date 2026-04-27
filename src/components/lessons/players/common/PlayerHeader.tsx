import { useTranslation } from "react-i18next";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { Button } from "@/components/ui/Button";
import { SegmentStatus } from "@/types/components/player";
import { getSegmentColor } from "@/lib/utils/player";

interface PlayerHeaderProps {
    current: number;
    total: number;
    label?: string;
    statuses?: SegmentStatus[];
}

export function PlayerHeader({ current, total, label, statuses }: PlayerHeaderProps) {
    const { t } = useTranslation();
    const { isMuted, toggleMute } = useSoundEffects();


    const items = statuses || Array.from({ length: total }, (_, i) =>
        i < current - 1 ? 'correct' : i === current - 1 ? 'current' : 'pending'
    );

    return (
        <div className="w-full border-b border-gray-100 dark:border-gray-800/50 bg-white/30 dark:bg-gray-900/10 backdrop-blur-md">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-4">
                <div className="flex justify-between items-end text-sm font-medium mb-4">
                    <div className="flex flex-col gap-1">
                        <span className="uppercase tracking-widest text-[10px] sm:text-xs text-brand-500 font-bold">
                            {label || t('lessons.progress')}
                        </span>
                        <span className="text-gray-400 text-[10px] font-normal">
                            {current} {t('common.on')} {total}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMute}
                            className="p-2 h-9 w-9 rounded-xl text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20"
                            title={isMuted ? t('common.unmute') : t('common.mute')}
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all">
                            <span className="text-gray-600 dark:text-gray-300 font-bold tabular-nums">
                                {Math.round((items.filter(s => s === 'correct').length / total) * 100)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-1.5 sm:gap-2 h-2.5 sm:h-3">
                    {items.map((status, idx) => (
                        <div
                            key={idx}
                            className={`flex-1 rounded-full transition-all duration-300 ease-out ${getSegmentColor(status as SegmentStatus)}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
