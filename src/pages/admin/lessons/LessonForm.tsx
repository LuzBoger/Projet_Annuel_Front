import { useEffect, useState } from "react";
import { languageService } from "@/services/languageService";
import { LanguageResponse } from "@/types/language/language";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { ChevronLeft, Eye, Check, Cross, Sparkles, Warning } from "@/assets/icons";
import { useLesson } from "@/hooks/useLesson";
import { useTopic } from "@/hooks/useTopic";
import { LessonType, LessonRequest, AILessonGenerateRequest, FlashcardRequest, QcmQuestionRequest, MatchingPairRequest, InteractiveQuestion } from "@/types/lesson/lesson";
import * as yup from "yup";
import { lessonSchema, type LessonFormData } from "@/validations/lessons/lessonSchema";
import { aiGenerationSchema } from "@/validations/lessons/aiGenerationSchema";
import { FlashcardForm } from "@/components/admin/lessons/FlashcardForm";
import { QCMForm } from "@/components/admin/lessons/QCMForm";
import { MatchingPairForm } from "@/components/admin/lessons/MatchingPairForm";
import { SortingExerciseForm } from "@/components/admin/lessons/SortingExerciseForm";
import { InteractiveForm } from "@/components/admin/lessons/InteractiveForm";
import { LessonSimulatorModal } from "@/components/admin/lessons/LessonSimulatorModal";
import { MetaData } from "@/components/seo/MetaData";
import { Modal } from "@/components/ui/Modal";

export default function LessonForm() {
    const { topicId, lessonId } = useParams<{ topicId: string, lessonId?: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isEdit = !!lessonId;
    const [languages, setLanguages] = useState<LanguageResponse[]>([]);
    const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
    const [isGeneratingLesson, setIsGeneratingLesson] = useState(false);
    const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);
    const [aiGenerationDescription, setAiGenerationDescription] = useState("");
    const [aiItemCount, setAiItemCount] = useState<number | undefined>(undefined);
    const [aiErrors, setAiErrors] = useState<{
        aiGenerationDescription?: string;
        aiItemCount?: string;
    }>({});
    const [aiTouched, setAiTouched] = useState<{
        aiGenerationDescription?: boolean;
        aiItemCount?: boolean;
    }>({});

    const { loading: lessonLoading, createLesson, updateLesson, fetchLessonById, generateLessonWithAI, modifyLessonWithAI } = useLesson();
    const { topics, fetchAllTopics } = useTopic();
    const currentTopic = topics.find(t => t.id === topicId);

    const topicLanguageOptions = currentTopic ? languages.filter(language => language.id === currentTopic.sourceLanguageId || language.id === currentTopic.targetLanguageId).map(language => ({ code: language.code, name: language.name })): [];

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
        const schema = aiGenerationSchema(t, lessonType as LessonType, isEdit);
        schema.validate({ aiGenerationDescription, aiItemCount }, { abortEarly: false })
            .then(() => {
                setAiErrors({});
            })
            .catch((err: unknown) => {
                if (err instanceof yup.ValidationError) {
                    const newErrors: typeof aiErrors = {};
                    err.inner.forEach((error) => {
                        if (error.path) {
                            newErrors[error.path as keyof typeof aiErrors] = error.message;
                        }
                    });
                    setAiErrors(newErrors);
                }
            });
    }, [aiGenerationDescription, aiItemCount, lessonType, isEdit, t]);

    const isFlashcardOrQcm = lessonType === LessonType.FLASHCARD || lessonType === LessonType.QCM;
    const minItems = isFlashcardOrQcm ? 5 : 3;
    const maxItems = isFlashcardOrQcm ? 20 : 10;

    const flashcardsCount = formData.flashcards?.length;
    const questionsCount = formData.questions?.length;
    const matchingPairsCount = formData.matchingPairs?.length;
    const sortingItemsCount = formData.sortingItems?.length;
    const interactiveQuestionsCount = formData.interactiveQuestions?.length;

    const [prevValues, setPrevValues] = useState({
        lessonType,
        flashcardsCount,
        questionsCount,
        matchingPairsCount,
        sortingItemsCount,
        interactiveQuestionsCount
    });

    if (
        lessonType !== prevValues.lessonType ||
        flashcardsCount !== prevValues.flashcardsCount ||
        questionsCount !== prevValues.questionsCount ||
        matchingPairsCount !== prevValues.matchingPairsCount ||
        sortingItemsCount !== prevValues.sortingItemsCount ||
        interactiveQuestionsCount !== prevValues.interactiveQuestionsCount
    ) {
        setPrevValues({
            lessonType,
            flashcardsCount,
            questionsCount,
            matchingPairsCount,
            sortingItemsCount,
            interactiveQuestionsCount
        });

        let newCount: number | undefined = undefined;
        if (lessonType === LessonType.FLASHCARD) {
            newCount = flashcardsCount || undefined;
        } else if (lessonType === LessonType.QCM) {
            newCount = questionsCount || undefined;
        } else if (lessonType === LessonType.MATCHING_PAIR) {
            newCount = matchingPairsCount || undefined;
        } else if (lessonType === LessonType.SORTING_EXERCISE) {
            newCount = sortingItemsCount || undefined;
        } else if (lessonType === LessonType.INTERACTIVE) {
            newCount = interactiveQuestionsCount || undefined;
        }
        setAiItemCount(newCount);
    }

    const topicsLength = topics.length;

    useEffect(() => {
        if (topicsLength === 0) fetchAllTopics();
        languageService.getAllActiveLanguages().then(setLanguages).catch(() => {});

        if (isEdit && lessonId) {
            const loadLesson = async () => {
                const lesson = await fetchLessonById(lessonId);
                if (lesson) {
                    const initialData: Partial<LessonFormData> = { ...lesson };
                    if (lesson.lessonType === LessonType.SORTING_EXERCISE && lesson.sortingExercise && lesson.sortingExercise.length > 0) {
                        initialData.sortingItems = lesson.sortingExercise[0].items.map((item: string) => ({ value: item }));
                    } else if (lesson.lessonType === LessonType.INTERACTIVE) {
                        initialData.interactiveQuestions = lesson.interactiveQuestions;
                    }
                    reset(initialData);
                }
            };
            loadLesson();
        }
    }, [isEdit, lessonId, reset, fetchLessonById, fetchAllTopics, topicsLength]);

    const lessonTypeOptions = Object.values(LessonType).map(type => ({
        label: t(`admin.lessons.form.types.${type}`),
        value: type,
    }));

    const handleAiGenerationOrModification = async () => {
        if (!topicId) {
            return;
        }

        setAiTouched({ aiGenerationDescription: true, aiItemCount: true });

        const schema = aiGenerationSchema(t, lessonType as LessonType, isEdit);
        try {
            await schema.validate({ aiGenerationDescription, aiItemCount }, { abortEarly: false });
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                const newErrors: typeof aiErrors = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path as keyof typeof aiErrors] = error.message;
                    }
                });
                setAiErrors(newErrors);
            }
            return;
        }

        setIsGeneratingLesson(true);

        try {
            let generatedLessonData;

            if (isEdit && lessonId) {
                const currentLessonRequest: LessonRequest = {
                    topicId,
                    title: formData.title || "",
                    description: formData.description || "",
                    orderIndex: formData.orderIndex || 0,
                    isActive: formData.isActive ?? true,
                    lessonType: lessonType as LessonType,
                };

                if (lessonType === LessonType.FLASHCARD) {
                    currentLessonRequest.flashcards = formData.flashcards as FlashcardRequest[];
                } else if (lessonType === LessonType.QCM) {
                    currentLessonRequest.questions = formData.questions as QcmQuestionRequest[];
                } else if (lessonType === LessonType.MATCHING_PAIR) {
                    currentLessonRequest.matchingPairs = formData.matchingPairs as MatchingPairRequest[];
                } else if (lessonType === LessonType.SORTING_EXERCISE && formData.sortingItems) {
                    currentLessonRequest.sortingExercise = [{
                        items: formData.sortingItems.map((item) => item?.value || ""),
                        correctOrder: formData.sortingItems.map((_, idx) => idx)
                    }];
                } else if (lessonType === LessonType.INTERACTIVE) {
                    currentLessonRequest.interactiveQuestions = formData.interactiveQuestions as InteractiveQuestion[];
                }

                const modificationRequest = {
                    lessonId,
                    prompt: aiGenerationDescription,
                    itemCount: aiItemCount!,
                    lesson: currentLessonRequest
                };

                generatedLessonData = await modifyLessonWithAI(modificationRequest);
            } else {
                const generationRequest: AILessonGenerateRequest = {
                    lessonType: lessonType,
                    topicId: topicId,
                    description: aiGenerationDescription,
                    itemCount: aiItemCount!
                };

                generatedLessonData = await generateLessonWithAI(generationRequest);
            }

            if (generatedLessonData) {
                setValue("title", generatedLessonData.title || "");
                setValue("description", generatedLessonData.description || "");

                if (generatedLessonData.lessonType === LessonType.FLASHCARD) {
                    setValue("flashcards", generatedLessonData.flashcards || []);
                } else if (generatedLessonData.lessonType === LessonType.QCM) {
                    setValue("questions", generatedLessonData.questions || []);
                } else if (generatedLessonData.lessonType === LessonType.MATCHING_PAIR) {
                    setValue("matchingPairs", generatedLessonData.matchingPairs || []);
                } else if (generatedLessonData.lessonType === LessonType.SORTING_EXERCISE && generatedLessonData.sortingExercise && generatedLessonData.sortingExercise.length > 0) {
                    const sortedItems = generatedLessonData.sortingExercise[0].items.map((item: string) => ({ value: item }));
                    setValue("sortingItems", sortedItems);
                } else if (generatedLessonData.lessonType === LessonType.INTERACTIVE) {
                    setValue("interactiveQuestions", generatedLessonData.questions || []);
                }
            }
        } catch (error: unknown) {
            console.error("AI Lesson generation/modification failed", error);
            const axiosError = error as { response?: { status?: number } };
            if (axiosError?.response?.status === 429) {
                setIsQuotaModalOpen(true);
            }
        } finally {
            setIsGeneratingLesson(false);
        }
    };

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
        } else if (data.lessonType === LessonType.INTERACTIVE) {
            request.interactiveQuestions = data.interactiveQuestions as InteractiveQuestion[];
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
                        <div className="bg-linear-to-br from-indigo-500/10 to-brand-500/10 backdrop-blur-xl rounded-3xl shadow-sm border border-indigo-500/20 dark:border-indigo-500/30 p-6 sm:p-8 transition-all duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100/50 dark:border-indigo-500/20 transition-all">
                                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {isEdit ? t('admin.lessons.form.ai_generate.title_modify') : t('admin.lessons.form.ai_generate.title')}
                                    </h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {isEdit ? t('admin.lessons.form.ai_generate.subtitle_modify') : t('admin.lessons.form.ai_generate.subtitle')}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className={`transition-all duration-300 ${isGeneratingLesson ? "pointer-events-none opacity-40" : ""}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-1 space-y-4">
                                            <div>
                                                <Select
                                                    label={t('admin.lessons.form.type')}
                                                    options={lessonTypeOptions}
                                                    value={lessonType}
                                                    onChange={(val) => setValue("lessonType", val as LessonType)}
                                                    placeholder={t('admin.lessons.form.type_placeholder')}
                                                    required
                                                    error={errors.lessonType?.message}
                                                />
                                                <p className="mt-2 text-xs text-brand-600 dark:text-brand-400 font-semibold tracking-wide">
                                                    {t('admin.lessons.form.ai_generate.type_helper')}
                                                </p>
                                            </div>

                                             <div>
                                                  <FormField
                                                      label={t('admin.lessons.form.ai_generate.item_count_label')}
                                                      type="number"
                                                      min={minItems}
                                                      max={maxItems}
                                                      value={aiItemCount ?? ""}
                                                      onChange={(e) => {
                                                          const parsedValue = e.target.value ? parseInt(e.target.value, 10) : undefined;
                                                          setAiItemCount(parsedValue);
                                                          setAiTouched((prev) => ({ ...prev, aiItemCount: true }));
                                                      }}
                                                      onBlur={() => setAiTouched((prev) => ({ ...prev, aiItemCount: true }))}
                                                      placeholder={t('admin.lessons.form.ai_generate.item_count_placeholder') + ` (${minItems}-${maxItems})`}
                                                      className="bg-white/50 dark:bg-gray-900/50"
                                                      error={aiTouched.aiItemCount ? aiErrors.aiItemCount : undefined}
                                                      required
                                                  />
                                              </div>
                                         </div>
                                         <div className="md:col-span-2">
                                             <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                                                 {isEdit ? t('admin.lessons.form.ai_generate.description_label_modify') : t('admin.lessons.form.ai_generate.description_label')}
                                             </label>
                                             <TextArea
                                                 value={aiGenerationDescription}
                                                 onChange={(e) => {
                                                     setAiGenerationDescription(e.target.value);
                                                     setAiTouched((prev) => ({ ...prev, aiGenerationDescription: true }));
                                                 }}
                                                 onBlur={() => setAiTouched((prev) => ({ ...prev, aiGenerationDescription: true }))}
                                                 placeholder={isEdit ? t('admin.lessons.form.ai_generate.description_placeholder_modify') : t('admin.lessons.form.ai_generate.description_placeholder')}
                                                 className="min-h-[160px] bg-white/50 dark:bg-gray-900/50 rounded-2xl"
                                                 disabled={isGeneratingLesson}
                                                 error={aiTouched.aiGenerationDescription ? aiErrors.aiGenerationDescription : undefined}
                                             />
                                             {aiTouched.aiGenerationDescription && aiErrors.aiGenerationDescription && (
                                                 <p className="mt-1 text-sm text-red-600">{aiErrors.aiGenerationDescription}</p>
                                             )}
                                         </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        variant="primary"
                                        isLoading={isGeneratingLesson}
                                        onClick={handleAiGenerationOrModification}
                                        className="shadow-md shadow-brand-500/20"
                                    >
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        {isEdit ? t('admin.lessons.form.ai_generate.trigger_btn_modify') : t('admin.lessons.form.ai_generate.trigger_btn')}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className={`space-y-6 transition-all duration-500 ${isGeneratingLesson ? "pointer-events-none opacity-50" : ""}`}>
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

                                {isEdit && (
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
                                )}

                                <div className="pt-8 border-t border-gray-100 dark:border-gray-700/50">
                                    {lessonType === LessonType.FLASHCARD && (
                                        <FlashcardForm
                                            control={control}
                                            register={register}
                                            errors={errors}
                                            options={topicLanguageOptions.length > 0 ? topicLanguageOptions : undefined}
                                        />
                                    )}
                                    {lessonType === LessonType.QCM && <QCMForm control={control} register={register} errors={errors} />}
                                    {lessonType === LessonType.MATCHING_PAIR && <MatchingPairForm control={control} register={register} errors={errors} />}
                                    {lessonType === LessonType.SORTING_EXERCISE && <SortingExerciseForm control={control} register={register} errors={errors} />}
                                    {lessonType === LessonType.INTERACTIVE && <InteractiveForm control={control} register={register} errors={errors} setValue={setValue} />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`lg:col-span-4 space-y-6 transition-all duration-500 ${isGeneratingLesson ? "pointer-events-none opacity-50" : ""}`}>
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

            <Modal
                isOpen={isGeneratingLesson}
                onClose={() => {}}
                showCloseButton={false}
                closeOnOverlayClick={false}
                size="sm"
                className="overflow-hidden"
            >
                <div className="flex flex-col items-center justify-center text-center p-6 my-4 select-none">
                    <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                        <div className="absolute inset-0 rounded-full border-4 border-t-brand-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin duration-1000" />
                        <div className="absolute inset-2 rounded-full border-4 border-b-violet-500 border-l-pink-500 border-t-transparent border-r-transparent animate-spin duration-700" style={{ animationDirection: "reverse" }} />
                        <div className="absolute inset-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-full flex items-center justify-center shadow-lg border border-indigo-100/50 dark:border-indigo-500/20">
                            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                        {isEdit ? t('admin.lessons.form.ai_generate.generating_title_modify') : t('admin.lessons.form.ai_generate.generating_title')}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
                        {t('admin.lessons.form.ai_generate.generating_subtitle')}
                    </p>
                </div>
            </Modal>

            <Modal
                isOpen={isQuotaModalOpen}
                onClose={() => setIsQuotaModalOpen(false)}
                size="sm"
                className="overflow-hidden"
            >
                <div className="flex flex-col items-center justify-center text-center p-6 my-4 select-none">
                    <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                        <div className="absolute inset-0 rounded-full border-4 border-red-500/20 dark:border-red-500/10" />
                        <div className="absolute inset-2 rounded-full border-4 border-red-500/40 dark:border-red-500/25 animate-pulse" />
                        <div className="absolute inset-4 bg-red-50 dark:bg-red-950/40 rounded-full flex items-center justify-center shadow-lg border border-red-100/50 dark:border-red-500/20">
                            <Warning className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                        {t('admin.lessons.form.ai_generate.quota_exceeded_title')}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mb-8">
                        {t('admin.lessons.form.ai_generate.quota_exceeded_message')}
                    </p>

                    <Button
                        type="button"
                        variant="pill-gray"
                        onClick={() => setIsQuotaModalOpen(false)}
                        className="w-full py-3.5 font-bold"
                    >
                        {t('admin.lessons.form.ai_generate.quota_exceeded_cta')}
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
