import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { ChevronLeft, Info, Eye, Check, Cross } from "@/assets/icons";
import { useLesson } from "@/hooks/useLesson";
import { useTopic } from "@/hooks/useTopic";
import { LessonType, LessonRequest } from "@/types/lesson/lesson";
import { lessonSchema, type LessonFormData } from "@/validations/lessons/lessonSchema";
import { FlashcardForm } from "@/components/admin/lessons/FlashcardForm";
import { QCMForm } from "@/components/admin/lessons/QCMForm";
import { MatchingPairForm } from "@/components/admin/lessons/MatchingPairForm";
import { SortingExerciseForm } from "@/components/admin/lessons/SortingExerciseForm";
import { LessonSimulatorModal } from "@/components/admin/lessons/LessonSimulatorModal";
import { MetaData } from "@/components/seo/MetaData";

export default function LessonForm() {
    const { topicId, lessonId } = useParams<{ topicId: string, lessonId?: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = !!lessonId;
    const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

    const { loading: lessonLoading, createLesson, updateLesson, fetchLessonById } = useLesson();
    const { topics, fetchAllTopics } = useTopic();
    const currentTopic = topics.find(t => t.id === topicId);

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<LessonFormData>({
        resolver: yupResolver(lessonSchema(t)) as unknown as import("react-hook-form").Resolver<LessonFormData>,
        defaultValues: {
            title: "",
            description: "",
            orderIndex: 0,
            isActive: true,
            lessonType: LessonType.FLASHCARD,
            flashcards: [],
            questions: [],
            matchingPairs: [],
            sortingItems: [{ value: "" }, { value: "" }]
        }
    });

    const lessonType = useWatch({ control, name: "lessonType" });
    const isActive = useWatch({ control, name: "isActive" });
    const formData = useWatch({ control });

    useEffect(() => {
        if (topics.length === 0) fetchAllTopics();

        if (isEdit && lessonId) {
            const loadLesson = async () => {
                const lesson = await fetchLessonById(lessonId);
                if (lesson) {
                    const initialData: Partial<LessonFormData> = { ...lesson };
                    if (lesson.lessonType === LessonType.SORTING_EXERCISE && lesson.sortingExercise && lesson.sortingExercise.length > 0) {
                        initialData.sortingItems = lesson.sortingExercise[0].items.map((item: string) => ({ value: item }));
                    }
                    reset(initialData);
                }
            };
            loadLesson();
        }
    }, [isEdit, lessonId, reset, fetchLessonById, fetchAllTopics, topics ?? []]);

    const lessonTypeOptions = Object.values(LessonType).map(type => ({
        label: t(`admin.lessons.form.types.${type}`),
        value: type,
    }));

    const onFormSubmit = async (data: LessonFormData) => {
        if (!topicId) return;

        const request: LessonRequest = {
            topicId,
            title: data.title,
            description: data.description,
            orderIndex: data.orderIndex || 0,
            isActive: data.isActive,
            lessonType: data.lessonType as LessonType,
        };

        if (data.lessonType === LessonType.FLASHCARD) request.flashcards = data.flashcards;
        else if (data.lessonType === LessonType.QCM) request.questions = data.questions;
        else if (data.lessonType === LessonType.MATCHING_PAIR) request.matchingPairs = data.matchingPairs;
        else if (data.lessonType === LessonType.SORTING_EXERCISE && data.sortingItems) {
            request.sortingExercise = [{
                items: data.sortingItems.map((i) => i.value),
                correctOrder: data.sortingItems.map((_, idx) => idx)
            }];
        }

        try {
            if (isEdit && lessonId) await updateLesson(lessonId, request);
            else await createLesson(request);
            navigate(`/admin/topics/${topicId}/lessons`);
        } catch (error) {
            console.error("Failed to save lesson", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50 p-4 sm:p-6 lg:p-8">
            <MetaData title={isEdit ? t('admin.lessons.edit') : t('admin.lessons.create')} robots="noindex, nofollow" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="pill-gray"
                            size="sm"
                            onClick={() => navigate(`/admin/topics/${topicId}/lessons`)}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isEdit ? t('admin.lessons.edit') : t('admin.lessons.create')}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t('admin.lessons.form.topic_label')} <span className="font-semibold text-brand-600 dark:text-brand-400">{currentTopic?.name || "..."}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            size="sm"
                            variant="pill-brand"
                            onClick={() => setIsSimulatorOpen(true)}
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            {t('admin.lessons.preview.simulate_btn')}
                        </Button>
                        <Button
                            variant="pill-red"
                            size="sm"
                            onClick={() => navigate(`/admin/topics/${topicId}/lessons`)}
                        >
                            <Cross className="w-4 h-4 mr-2" />
                            {t('common.cancel')}
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-sm border border-white/20 dark:border-gray-700/50 p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('admin.lessons.form.sections.basic_info')}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="md:col-span-2">
                                    <FormField
                                        label={t('admin.lessons.form.title')}
                                        {...register("title")}
                                        error={errors.title?.message}
                                        required
                                        className="bg-white/50 dark:bg-gray-900/50"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                                        {t('admin.lessons.form.description')}
                                    </label>
                                    <TextArea
                                        {...register("description")}
                                        className="min-h-[120px] bg-white/50 dark:bg-gray-900/50 rounded-2xl"
                                        error={errors.description?.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-sm border border-white/20 dark:border-gray-700/50 p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('admin.lessons.form.sections.lesson_content')}</h2>
                            </div>

                            <div className="max-w-md mb-8">
                                <Select
                                    label={t('admin.lessons.form.type')}
                                    options={lessonTypeOptions}
                                    value={lessonType}
                                    onChange={(val) => setValue("lessonType", val as LessonType)}
                                    placeholder={t('admin.lessons.form.type_placeholder')}
                                    required
                                    error={errors.lessonType?.message}
                                />
                            </div>

                            <div className="pt-8 border-t border-gray-100 dark:border-gray-700/50">
                                {lessonType === LessonType.FLASHCARD && <FlashcardForm control={control} register={register} errors={errors} />}
                                {lessonType === LessonType.QCM && <QCMForm control={control} register={register} errors={errors} />}
                                {lessonType === LessonType.MATCHING_PAIR && <MatchingPairForm control={control} register={register} errors={errors} />}
                                {lessonType === LessonType.SORTING_EXERCISE && <SortingExerciseForm control={control} register={register} errors={errors} />}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-sm border border-white/20 dark:border-gray-700/50 p-6 sticky top-8">
                            <h3 className="text-md font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">{t('admin.lessons.form.sections.basic_info')}</h3>

                            <div className="space-y-6">



                                <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-700/50 group transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{t('admin.lessons.form.active')}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{isActive ? t('common.enabled') : t('common.disabled')}</span>
                                    </div>
                                    <Switch checked={isActive} onChange={(val) => setValue("isActive", val)} />
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-700/50">
                                    <Button type="submit" variant="primary" isLoading={lessonLoading} className="w-full py-4 shadow-lg shadow-brand-500/20">
                                        <Check className="w-4 h-4 mr-2" />
                                        {t('common.save')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <LessonSimulatorModal
                isOpen={isSimulatorOpen}
                onClose={() => setIsSimulatorOpen(false)}
                data={formData}
            />
        </div>
    );
}
