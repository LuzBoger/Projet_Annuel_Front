import { useTranslation } from "react-i18next";
import { CreateTopicRequest, TopicResponse, UpdateTopicRequest, ProficiencyLevel, PROFICIENCY_LEVELS } from "@/types/topic/topic";
import { LanguageResponse } from "@/types/language/language";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Cross } from "@/assets/icons";
import { Switch } from "@/components/ui/Switch";
import { LanguageFlag } from "@/components/languages/LanguageFlag";
import { createTopicSchema, type CreateTopicFormData } from "@/validations/topics/createTopicSchema";
import { updateTopicSchema, type UpdateTopicFormData } from "@/validations/topics/updateTopicSchema";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

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
    const isEditTopic = !!topic;

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<CreateTopicFormData | UpdateTopicFormData>({
        resolver: yupResolver(isEditTopic ? updateTopicSchema(t) : createTopicSchema(t)),
        defaultValues: {
            languageId: "",
            name: "",
            description: "",
            difficulty: "",
            orderIndex: 0,
            isActive: true,
        }
    });

    const languageId = useWatch({ control, name: "languageId" });
    const difficulty = useWatch({ control, name: "difficulty" });
    const isActive = useWatch({ control, name: "isActive" });

    useEffect(() => {
        if (topic) {
            reset({
                languageId: topic.languageId,
                name: topic.name,
                description: topic.description || "",
                difficulty: topic.difficulty,
                orderIndex: topic.orderIndex,
                isActive: topic.isActive,
            });
        } else {
            reset({
                languageId: "",
                name: "",
                description: "",
                difficulty: "",
                orderIndex: 0,
                isActive: true,
            });
        }
    }, [topic, reset]);

    const languageOptions = activeLanguages.map(lang => ({
        label: `${lang.name} (${lang.code.toUpperCase()})`,
        value: lang.id,
    }));

    const difficultyOptions = PROFICIENCY_LEVELS.map(level => ({
        label: t(`admin.topics.form.levels.${level}`),
        value: level,
    }));

    const onFormSubmit = async (data: CreateTopicFormData | UpdateTopicFormData) => {
        await onSubmit({
            languageId: data.languageId,
            name: data.name,
            description: data.description,
            difficulty: data.difficulty as ProficiencyLevel,
            orderIndex: data.orderIndex,
            isActive: data.isActive,
        });
    };

    if (!isOpen) return null;

    const selectedLanguage = activeLanguages.find(l => l.id === languageId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 flex items-center justify-between border-b dark:border-gray-700 p-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                
                <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 space-y-4">
                    <div>
                        <Select
                            label={t('admin.topics.form.language')}
                            options={languageOptions}
                            value={languageId}
                            onChange={(val) => setValue("languageId", val)}
                            placeholder={t('admin.topics.form.language_placeholder')}
                            required
                            error={errors.languageId?.message}
                        />
                    </div>

                    {selectedLanguage && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <LanguageFlag languageCode={selectedLanguage.code} className="w-5 h-5 rounded-sm object-cover shadow-sm" />
                            <span>{selectedLanguage.name}</span>
                        </div>
                    )}
                    
                    <div>
                        <FormField
                            type="text"
                            label={t('admin.topics.form.name')}
                            {...register("name")}
                            required
                            error={errors.name?.message}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('admin.topics.form.description')}
                        </label>
                        <textarea
                            {...register("description")}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-y min-h-[80px] dark:bg-gray-700 dark:text-gray-200"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                    </div>

                    <div>
                        <Select
                            label={t('admin.topics.form.difficulty')}
                            options={difficultyOptions}
                            value={difficulty as string}
                            onChange={(val) => setValue("difficulty", val)}
                            placeholder={t('admin.topics.form.difficulty_placeholder')}
                            required
                            error={errors.difficulty?.message}
                        />
                    </div>
                    
                    <div>
                        <FormField
                            type="number"
                            label={t('admin.topics.form.order')}
                            {...register("orderIndex")}
                            required
                            error={errors.orderIndex?.message}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.topics.form.active')}</span>
                        <Switch
                            checked={isActive}
                            onChange={(val) => setValue("isActive", val)}
                        />
                    </div>

                    <div className="sticky bottom-0 bg-white dark:bg-gray-800 flex justify-end gap-3 pt-4 border-t dark:border-gray-700 mt-4 pb-2">
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
