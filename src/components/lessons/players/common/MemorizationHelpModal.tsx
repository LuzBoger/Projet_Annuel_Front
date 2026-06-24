import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Brain, Sparkles, BookOpen, AlertTriangle, HelpCircle, X, ArrowLeft, Lock } from "lucide-react";
import { useMemorizationHelp } from "@/hooks/useMemorizationHelp";
import { LessonType, HelpType, AIMemorizationHelpResponse } from "@/types/lesson/lesson";
import { Button } from "@/components/ui/Button";

interface MemorizationHelpModalProps {
    isOpen: boolean;
    onClose: () => void;
    lessonId: string;
    exerciseId?: string;
    exerciseType: LessonType;
}

export function MemorizationHelpModal({ isOpen, onClose, lessonId, exerciseId, exerciseType }: MemorizationHelpModalProps) {
    const { t } = useTranslation();
    const { getMemorizationHelp, isLoading, errorMessage, setErrorMessage } = useMemorizationHelp();
    
    const [selectedHelpType, setSelectedHelpType] = useState<HelpType | null>(null);
    const [helpResponse, setHelpResponse] = useState<AIMemorizationHelpResponse | null>(null);

    if (!isOpen) return null;

    const handleSelectHelpOption = async (helpType: HelpType) => {
        setSelectedHelpType(helpType);
        setHelpResponse(null);
        setErrorMessage(null);

        const result = await getMemorizationHelp({
            lessonId,
            exerciseId,
            exerciseType,
            helpType
        });

        if (result) {
            setHelpResponse(result);
        }
    };

    const handleResetOption = () => {
        setSelectedHelpType(null);
        setHelpResponse(null);
        setErrorMessage(null);
    };

    const helpOptions = [
        {
            type: "STRUCTURE_AND_RULE" as HelpType,
            title: t("lessons.help.option_structure_and_rule"),
            description: "Comprendre les règles et la grammaire fondamentale.",
            icon: BookOpen,
            color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50 hover:bg-blue-100/50 dark:hover:bg-blue-900/70"
        },
        {
            type: "ASSOCIATION_AND_MNEMONIC" as HelpType,
            title: t("lessons.help.option_association_and_mnemonic"),
            description: "Associer des idées ou utiliser des astuces de mémorisation.",
            icon: Brain,
            color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/70"
        },
        {
            type: "TRAP_WARNING" as HelpType,
            title: t("lessons.help.option_trap_warning"),
            description: "Identifier les erreurs fréquentes et faux amis.",
            icon: AlertTriangle,
            color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50 hover:bg-amber-100/50 dark:hover:bg-amber-900/70"
        },
        {
            type: "USAGE_CONTEXT" as HelpType,
            title: t("lessons.help.option_usage_context"),
            description: "Visualiser des exemples pratiques en contexte réel.",
            icon: Sparkles,
            color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/70"
        }
    ];

    const formatExamples = (text: string) => {
        if (!text.includes("___")) {
            return <span>{text}</span>;
        }

        const segments = text.split("___");
        
        return (
            <span>
                {segments.map((segment, index) => (
                    <span key={index}>
                        {segment}
                        {index < segments.length - 1 && (
                            <strong className="mx-1 px-2 py-0.5 rounded font-bold bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-400 border border-brand-200 dark:border-brand-900/40">
                                ___
                            </strong>
                        )}
                    </span>
                ))}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 dark:bg-gray-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
                className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-3">
                        {selectedHelpType && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleResetOption}
                                className="p-2 h-9 w-9 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        )}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
                                {t("lessons.help.modal_title")}
                            </h2>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="p-2 h-9 w-9 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </header>

                <div className="flex-1 overflow-y-auto p-6 min-h-0">
                    {errorMessage === "QUOTA_EXCEEDED" ? (
                        <div className="py-8 text-center max-w-md mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/30 rounded-full flex items-center justify-center mx-auto text-amber-500 border border-amber-200/50 dark:border-amber-900/50 shadow-inner">
                                <Lock className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                                    {t("lessons.help.quota_exceeded_title")}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {t("lessons.help.quota_exceeded_message")}
                                </p>
                            </div>
                            <Button 
                                onClick={() => window.open("/subscription", "_blank")}
                                className="w-full py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-500 to-brand-600 text-white"
                            >
                                {t("lessons.help.quota_exceeded_cta")}
                            </Button>
                        </div>
                    ) : isLoading ? (
                        <div className="space-y-6 py-6 animate-pulse">
                            <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/3"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-5/6"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-4/6"></div>
                            </div>
                            <div className="p-5 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl space-y-3">
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4"></div>
                            </div>
                            <div className="flex justify-center pt-4">
                                <span className="text-sm text-gray-400 font-medium animate-bounce">{t("lessons.help.loading")}</span>
                            </div>
                        </div>
                    ) : selectedHelpType && helpResponse ? (
                        <div className="space-y-6 py-2 animate-in fade-in duration-300">
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                    {helpResponse.title}
                                </h3>
                                <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                    {helpResponse.explanation}
                                </p>
                            </div>

                            {helpResponse.visualAnchor && (
                                <div className="p-5 bg-gradient-to-br from-brand-50/50 to-white dark:from-brand-950/20 dark:to-gray-900 rounded-2xl border border-brand-100/50 dark:border-brand-900/30">
                                    <h4 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4" />
                                        {t("lessons.help.section_visual_anchor")}
                                    </h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                        {helpResponse.visualAnchor}
                                    </p>
                                </div>
                            )}

                            {helpResponse.examples && helpResponse.examples.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                        {t("lessons.help.section_examples")}
                                    </h4>
                                    <div className="space-y-3">
                                        {helpResponse.examples.map((example, index) => (
                                            <div key={index} className="text-sm text-gray-700 dark:text-gray-300 bg-brand-50/10 dark:bg-brand-950/10 p-3.5 rounded-r-xl border-l-4 border-brand-500 leading-relaxed shadow-sm">
                                                {formatExamples(example)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {helpResponse.warning && (
                                <div className="p-5 bg-amber-50/80 dark:bg-amber-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 flex gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1">
                                            {t("lessons.help.section_warning")}
                                        </h4>
                                        <p className="text-sm text-amber-700 dark:text-amber-300/90 leading-relaxed">
                                            {helpResponse.warning}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : errorMessage ? (
                        <div className="py-8 text-center max-w-sm mx-auto space-y-4">
                            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-100 dark:border-red-900/30">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                                {t("lessons.help.error_generic")}
                            </p>
                            <Button 
                                onClick={handleResetOption}
                                variant="secondary" 
                                className="px-6 rounded-xl"
                            >
                                {t("common.back")}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6 py-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t("lessons.help.modal_subtitle")}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {helpOptions.map((option) => {
                                    const IconComponent = option.icon;
                                    return (
                                        <button
                                            key={option.type}
                                            onClick={() => handleSelectHelpOption(option.type)}
                                            className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 group shadow-sm hover:shadow-md hover:-translate-y-0.5 ${option.color}`}
                                        >
                                            <div className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm transition-transform group-hover:scale-110">
                                                <IconComponent className="w-5 h-5 flex-shrink-0" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-gray-900 dark:text-white transition-colors">
                                                    {option.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                                    {option.description}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
