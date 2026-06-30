import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MemorizationHelpModal } from "./MemorizationHelpModal";
import { LessonType } from "@/types/lesson/lesson";

interface MemorizationHelpButtonProps {
    lessonId: string;
    exerciseId?: string;
    exerciseType: LessonType;
    className?: string;
}

export function MemorizationHelpButton({ lessonId, exerciseId, exerciseType, className }: MemorizationHelpButtonProps) {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                type="button"
                variant="ghost"
                onClick={handleOpenModal}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold border border-brand-100 dark:border-brand-900/30 bg-white/40 dark:bg-gray-900/30 backdrop-blur-md text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:bg-brand-50/50 dark:hover:bg-brand-900/20 shadow-sm hover:shadow transition-all duration-300 group overflow-hidden ${className || ""}`}
                title={t("lessons.help.trigger_button")}
            >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Sparkles className="w-4 h-4 text-brand-500 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-300 flex-shrink-0" />
                <span className="relative z-10">{t("lessons.help.trigger_button")}</span>
            </Button>

            <MemorizationHelpModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                lessonId={lessonId}
                exerciseId={exerciseId}
                exerciseType={exerciseType}
            />
        </>
    );
}
