import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { ChevronLeft, Info } from "@/assets/icons";
import { useLesson } from "@/hooks/useLesson";
import { useTopic } from "@/hooks/useTopic";
import { LessonType, LessonRequest } from "@/types/lesson/lesson";
import { lessonSchema, type LessonFormData } from "@/validations/lessons/lessonSchema";
import { FlashcardForm } from "@/components/admin/lessons/FlashcardForm";
import { QCMForm } from "@/components/admin/lessons/QCMForm";
import { MatchingPairForm } from "@/components/admin/lessons/MatchingPairForm";
import { SortingExerciseForm } from "@/components/admin/lessons/SortingExerciseForm";
import { LessonPreview } from "@/components/admin/lessons/LessonPreview";
import { MetaData } from "@/components/seo/MetaData";

export default function LessonForm() {
    const { topicId, lessonId } = useParams<{ topicId: string, lessonId?: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = !!lessonId;

    const { loading: lessonLoading, createLesson, updateLesson, fetchLessonById } = useLesson();
    const { topics, fetchAllTopics } = useTopic();
    const currentTopic = topics.find(t => t.id === topicId);

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<LessonFormData>({
        resolver: yupResolver(lessonSchema(t)) as unknown as import("react-hook-form").Resolver<LessonFormData>,
        defaultValues: {
            title: "",
            description: "",
            orderIndex: 0,
            xpReward: 50,
            minLevelRequired: 1,
            durationMinutes: 5,
            passScorePercentage: 80,
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
                    // Adapt data for the form
                    const initialData: Partial<LessonFormData> = {
                        ...lesson,
                    };

                    if (lesson.lessonType === LessonType.SORTING_EXERCISE && lesson.sortingExercise && lesson.sortingExercise.length > 0) {
                        initialData.sortingItems = lesson.sortingExercise[0].items.map((item: string) => ({ value: item }));
                    }

                    reset(initialData);
                }
            };
            loadLesson();
        }
    }, [isEdit, lessonId, reset, fetchLessonById, fetchAllTopics, topics.length]);

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
            orderIndex: data.orderIndex,
            xpReward: data.xpReward,
            minLevelRequired: data.minLevelRequired,
            durationMinutes: data.durationMinutes,
            passScorePercentage: data.passScorePercentage,
            isActive: data.isActive,
            lessonType: data.lessonType as LessonType,
        };

        // Add polymorphic data
        if (data.lessonType === LessonType.FLASHCARD) {
            request.flashcards = data.flashcards;
        } else if (data.lessonType === LessonType.QCM) {
            request.questions = data.questions;
        } else if (data.lessonType === LessonType.MATCHING_PAIR) {
            request.matchingPairs = data.matchingPairs;
        } else if (data.lessonType === LessonType.SORTING_EXERCISE && data.sortingItems) {
            request.sortingExercise = [{
                items: data.sortingItems.map((i) => i.value),
                correctOrder: data.sortingItems.map((_, idx) => idx)
            }];
        }

        try {
            if (isEdit && lessonId) {
                await updateLesson(lessonId, request);
            } else {
                await createLesson(request);
            }
            navigate(`/admin/topics/${topicId}/lessons`);
        } catch (error) {
            console.error("Failed to save lesson", error);
        }
    };

    return (
        <>
            <MetaData title={isEdit ? t('admin.lessons.edit') : t('admin.lessons.create')} robots="noindex, nofollow"  />
            <div className="p-6">
                <div className="flex items-center space-x-4 mb-8">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/admin/topics/${topicId}/lessons`)}
                        className="p-2"
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <form onSubmit={handleSubmit(onFormSubmit)} className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-6">
                            <div className="flex items-center gap-2 mb-4 text-brand-600 dark:text-brand-400">
                                <Info className="w-5 h-5" />
                                <h2 className="text-lg font-bold">{t('admin.lessons.form.sections.basic_info')}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <FormField
                                        label={t('admin.lessons.form.title')}
                                        {...register("title")}
                                        error={errors.title?.message}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {t('admin.lessons.form.description')}
                                    </label>
                                    <textarea
                                        {...register("description")}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none min-h-[100px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                                </div>

                                <FormField
                                    type="number"
                                    label={t('admin.lessons.form.order')}
                                    {...register("orderIndex")}
                                    error={errors.orderIndex?.message}
                                    required
                                />
                                <FormField
                                    type="number"
                                    label={t('admin.lessons.form.xp')}
                                    {...register("xpReward")}
                                    error={errors.xpReward?.message}
                                    required
                                />
                                <FormField
                                    type="number"
                                    label={t('admin.lessons.form.minLevel')}
                                    {...register("minLevelRequired")}
                                    error={errors.minLevelRequired?.message}
                                    required
                                />
                                <FormField
                                    type="number"
                                    label={t('admin.lessons.form.duration')}
                                    {...register("durationMinutes")}
                                    error={errors.durationMinutes?.message}
                                    required
                                />
                                <FormField
                                    type="number"
                                    label={t('admin.lessons.form.passScore')}
                                    {...register("passScorePercentage")}
                                    error={errors.passScorePercentage?.message}
                                    required
                                />

                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t('admin.lessons.form.active')}</span>
                                    <Switch
                                        checked={isActive}
                                        onChange={(val) => setValue("isActive", val)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-8">
                            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                                <Info className="w-5 h-5" />
                                <h2 className="text-lg font-bold">{t('admin.lessons.form.sections.lesson_content')}</h2>
                            </div>

                            <div className="max-w-xs">
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

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                {lessonType === LessonType.FLASHCARD && (
                                    <FlashcardForm control={control} register={register} errors={errors} />
                                )}
                                {lessonType === LessonType.QCM && (
                                    <QCMForm control={control} register={register} errors={errors} />
                                )}
                                {lessonType === LessonType.MATCHING_PAIR && (
                                    <MatchingPairForm control={control} register={register} errors={errors} />
                                )}
                                {lessonType === LessonType.SORTING_EXERCISE && (
                                    <SortingExerciseForm control={control} register={register} errors={errors} />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate(`/admin/topics/${topicId}/lessons`)}>
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit" variant="primary" isLoading={lessonLoading}>
                                {t('common.save')}
                            </Button>
                        </div>
                    </form>

                    <div className="lg:sticky lg:top-8 self-start space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                {t('admin.lessons.preview.title')}
                            </h2>
                            <LessonPreview data={formData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
