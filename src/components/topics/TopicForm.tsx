import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CreateTopicRequest, TopicResponse, UpdateTopicRequest, ProficiencyLevel, PROFICIENCY_LEVELS } from "@/types/topic/topic";
import { LanguageResponse } from "@/types/language/language";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Cross } from "@/assets/icons";
import { Switch } from "@/components/ui/Switch";
import { LanguageFlag } from "@/components/languages/LanguageFlag";

interface TopicFormProps {
    isOpen: boolean;
    isLoading: boolean;
    topic: TopicResponse | null;
    activeLanguages: LanguageResponse[];
    onCancel: () => void;
    onSubmit: (data: CreateTopicRequest | UpdateTopicRequest) => Promise<void>;
}

export function TopicForm({ isOpen, isLoading, topic, activeLanguages, onCancel, onSubmit }: TopicFormProps) {
    const { t } = useTranslation();
    
    // State form
    const [languageId, setLanguageId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState<ProficiencyLevel | "">("");
    const [orderIndex, setOrderIndex] = useState<number>(0);
    const [isActive, setIsActive] = useState(true);

    const languageOptions = activeLanguages.map(lang => ({
        label: `${lang.name} (${lang.code.toUpperCase()})`,
        value: lang.id,
    }));

    const difficultyOptions = PROFICIENCY_LEVELS.map(level => ({
        label: t(`admin.topics.form.levels.${level}`),
        value: level,
    }));

    useEffect(() => {
        if (topic) {
            setLanguageId(topic.languageId);
            setName(topic.name);
            setDescription(topic.description || "");
            setDifficulty(topic.difficulty);
            setOrderIndex(topic.orderIndex);
            setIsActive(topic.isActive);
        } else {
            setLanguageId("");
            setName("");
            setDescription("");
            setDifficulty("");
            setOrderIndex(0);
            setIsActive(true);
        }
    }, [topic, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!difficulty) return;
        await onSubmit({
            languageId,
            name,
            description,
            difficulty: difficulty as ProficiencyLevel,
            orderIndex,
            isActive
        });
    };

    if (!isOpen) return null;

    const selectedLanguage = activeLanguages.find(l => l.id === languageId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between border-b p-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {topic ? t('admin.topics.edit') : t('admin.topics.create')}
                    </h3>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                        className="ml-auto border-transparent bg-transparent hover:bg-gray-100 px-2 shadow-none text-gray-500"
                    >
                        <span className="sr-only">{t('common.close')}</span>
                        <Cross className="h-5 w-5" />
                    </Button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <Select
                            label={t('admin.topics.form.language')}
                            options={languageOptions}
                            value={languageId}
                            onChange={(val) => setLanguageId(val)}
                            placeholder={t('admin.topics.form.language_placeholder')}
                            required
                        />
                    </div>

                    {selectedLanguage && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <LanguageFlag languageCode={selectedLanguage.code} className="w-5 h-5 rounded-sm object-cover shadow-sm" />
                            <span>{selectedLanguage.name}</span>
                        </div>
                    )}
                    
                    <div>
                        <FormField
                            type="text"
                            label={t('admin.topics.form.name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('admin.topics.form.description')}
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-y min-h-[80px]"
                        />
                    </div>

                    <div>
                        <Select
                            label={t('admin.topics.form.difficulty')}
                            options={difficultyOptions}
                            value={difficulty as string}
                            onChange={(val) => setDifficulty(val as ProficiencyLevel)}
                            placeholder={t('admin.topics.form.difficulty_placeholder')}
                            required
                        />
                    </div>
                    
                    <div>
                        <FormField
                            type="number"
                            label={t('admin.topics.form.order')}
                            value={orderIndex}
                            onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                            required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-gray-700">{t('admin.topics.form.active')}</span>
                        <Switch
                            checked={isActive}
                            onChange={setIsActive}
                        />
                    </div>

                    <div className="sticky bottom-0 bg-white flex justify-end gap-3 pt-4 border-t mt-4 pb-2">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isLoading}>
                            {t('common.save')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
