import { useTranslation } from "react-i18next";
import { CreateTopicRequest, TopicResponse, UpdateTopicRequest, ProficiencyLevel, PROFICIENCY_LEVELS } from "@/types/topic/topic";
import { LanguageResponse } from "@/types/language/language";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";

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

    const selectedLanguage = activeLanguages.find(l => l.id === languageId);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            title={topic ? t('admin.topics.edit') : t('admin.topics.create')}
            size="md"
        >
            <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                <div className="space-y-1">
                    <Select
                        label={t('admin.topics.form.language')}
                        options={languageOptions}
                        value={languageId}
                        onChange={(val) => setValue("languageId", val)}
                        placeholder={t('admin.topics.form.language_placeholder')}
                        required
                        error={errors.languageId?.message}
                    />
                    {selectedLanguage && (
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 pl-1">
                            <LanguageFlag languageCode={selectedLanguage.code} className="w-4 h-4 rounded-sm object-cover shadow-sm" />
                            <span>{selectedLanguage.name}</span>
                        </div>
                    )}
                </div>

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

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t('admin.topics.form.description')}
                    </label>
                    <TextArea
                        {...register("description")}
                        className="min-h-[70px] resize-y"
                        error={errors.description?.message}
                    />
                </div>
                
                <div className="md:col-span-2 flex items-center justify-between py-2 border-t dark:border-gray-800 mt-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('admin.topics.form.active')}</span>
                    <Switch
                        checked={isActive}
                        onChange={(val) => setValue("isActive", val)}
                    />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t dark:border-gray-700 mt-4 pb-2">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        {t('common.cancel')}
                    </Button>
                    <Button type="submit" variant="primary" isLoading={isLoading} className="w-40">
                        {t('common.save')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
