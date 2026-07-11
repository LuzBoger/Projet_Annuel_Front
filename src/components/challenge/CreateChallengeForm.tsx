import { ChallengeLessonForm } from "@/components/challenge/ChallengeLessonForm";
import { ParticipantsModal } from "@/components/challenge/ParticipantsModal";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import {CHALLENGE_TYPES, PUBLIC_LESSON_TYPES, AI_CHALLENGE_MIN_ITEMS_DEFAULT, AI_CHALLENGE_MAX_ITEMS_DEFAULT,AI_CHALLENGE_MIN_ITEMS_EXTENDED,AI_CHALLENGE_MAX_ITEMS_EXTENDED} from "@/constants/challenge";
import { useChallenge } from "@/hooks/useChallenge";
import { lessonService } from "@/services/lessonService";
import { topicService } from "@/services/topicService";
import { userLanguageService } from "@/services/userLanguage";
import { ChallengeType, ChallengeUser } from "@/types/challenges/challenge";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { LessonResponse, LessonType } from "@/types/lesson/lesson";
import { TopicResponse } from "@/types/topic/topic";
import { ChallengeFormData, challengeSchema } from "@/validations/challenges/challengeSchema";
import { LessonFormData, lessonSchema } from "@/validations/lessons/lessonSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Globe, Swords, UserRoundPlus, Sparkles, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { Resolver, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { aiGenerationSchema } from "@/validations/lessons/aiGenerationSchema";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getProfileImageUrl } from "@/lib/utils/image";
import { ChallengeOption } from "@/types/components/challengeOption";
import { challengeService } from "@/services/challengeService";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/api/response";

const CHALLENGE_OPTIONS: Record<ChallengeType, ChallengeOption> = {
    PUBLIC: {
        icon: <Globe className="w-4 h-4" />,
        label: 'challenge.type.public.type',
        description: 'challenge.type.public.description',
    },
    DUEL: {
        icon: <Swords className="w-4 h-4" />,
        label: 'challenge.type.duel.type',
        description: 'challenge.type.duel.description',
    },
};

export function CreateChallengeForm() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { createChallenge, loading } = useChallenge();
    const [challengeType, setChallengeType] = useState<ChallengeType>('PUBLIC');
    const [topics, setTopics] = useState<TopicResponse[]>([]);
    const [lessons, setLessons] = useState<LessonResponse[]>([]);
    const [selectedTopicId, setSelectedTopicId] = useState('');
    const [lessonType, setLessonType] = useState<LessonType>('QCM');
    const [selectedParticipant, setSelectedParticipant] = useState<ChallengeUser | null>(null);
    const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [aiItemCount, setAiItemCount] = useState<number | undefined>(5);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);
    const [aiQuotaExceeded, setAiQuotaExceeded] = useState(false);
    const [aiSubmitted, setAiSubmitted] = useState(false);
    const [aiErrors, setAiErrors] = useState<Record<string, string>>({});

    const isQcmOrFlashcard = lessonType === 'QCM' || lessonType === 'FLASHCARD';
    const minItems = isQcmOrFlashcard ? AI_CHALLENGE_MIN_ITEMS_EXTENDED : AI_CHALLENGE_MIN_ITEMS_DEFAULT;
    const maxItems = isQcmOrFlashcard ? AI_CHALLENGE_MAX_ITEMS_EXTENDED : AI_CHALLENGE_MAX_ITEMS_DEFAULT;

    const handleLessonTypeChange = (newType: LessonType) => {
        setLessonType(newType);
        setValue('lessonType', newType);
        const newMaxItems = (newType === 'QCM' || newType === 'FLASHCARD') ? AI_CHALLENGE_MAX_ITEMS_EXTENDED : AI_CHALLENGE_MAX_ITEMS_DEFAULT;
        if (aiItemCount !== undefined && aiItemCount > newMaxItems) {
            setAiItemCount(newMaxItems);
        }
    };
    const [learningLanguages, setLearningLanguages] = useState<UserLanguageResponse[]>([]);
    const [nativeLanguages, setNativeLanguages] = useState<UserLanguageResponse[]>([]);

    const { register, control, handleSubmit, setValue, trigger, formState: { errors } } = useForm<ChallengeFormData>({
        resolver: yupResolver(challengeSchema(t)) as Resolver<ChallengeFormData>,
        defaultValues: {
            title: '',
            challengeType: 'PUBLIC',
            lessonId: '',
            languageId: '',
            sourceLanguageId: '',
            lessonType: 'QCM' as LessonType,
            questionCount: undefined,
            challengedId: '',
        },
    });

    const { register: lessonRegister, control: lessonControl, formState: { errors: lessonErrors }, getValues: getLessonValues, setValue: setLessonValue } = useForm<LessonFormData>({
        resolver: yupResolver(lessonSchema(t)) as Resolver<LessonFormData>,
        defaultValues: {
            title: '',
            description: '',
            isActive: true,
            lessonType: 'QCM',
            questions: [{ question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' }],
            flashcards: [{ front: '', back: '', frontLanguage: 'fr', backLanguage: 'en' }],
            matchingPairs: [{ item1: '', item2: '' }],
            sortingExercises: [],
            interactiveQuestions: [{
                questionText: "",
                imagePaths: [],
                audioPaths: [],
                systemType: "MULTIPLE_CHOICE",
                options: ["", ""],
                correctOptionIndex: 0,
                correctWord: ""
            }],
        },
    });

    const selectedLessonId = useWatch({ control, name: 'lessonId' });
    const selectedLanguageId = topics.find(topic => topic.id === selectedTopicId)?.targetLanguageId ?? '';
    const selectedLanguageIdPublic = useWatch({ control, name: 'languageId' }) ?? '';
    const selectedSourceLanguageId = useWatch({ control, name: 'sourceLanguageId' }) ?? '';

    useEffect(() => {
        topicService.getAllTopicsByActive().then(setTopics);
        userLanguageService.getUserLearningLanguages().then(setLearningLanguages).catch(() => {});
        userLanguageService.getUserNativeLanguages().then(setNativeLanguages).catch(() => {});
    }, []);

    useEffect(() => {
        const fetch = selectedTopicId ? lessonService.getLessonsByTopic(selectedTopicId) : Promise.resolve([]);
        fetch.then(setLessons);
    }, [selectedTopicId]);

    const onSubmit = async (data: ChallengeFormData) => {
        let result;
        if (data.challengeType === 'DUEL') {
            result = await createChallenge({
                title: data.title,
                challengeType: 'DUEL',
                lessonId: data.lessonId,
                challengedId: data.challengedId,
            });
        } else {
            const lessonData = getLessonValues();
            result = await createChallenge({
                title: data.title,
                challengeType: 'PUBLIC',
                languageId: data.languageId,
                sourceLanguageId: data.sourceLanguageId || undefined,
                lessonType,
                questionCount: data.questionCount || undefined,
                qcm: lessonType === 'QCM' ? lessonData.questions : undefined,
                flashcards: lessonType === 'FLASHCARD' ? lessonData.flashcards : undefined,
                matchingPairs: lessonType === 'MATCHING_PAIR' ? lessonData.matchingPairs : undefined,
                sortingExercises: lessonType === 'SORTING_EXERCISE' && lessonData.sortingExercises
                    ? lessonData.sortingExercises.map(ex => {
                        const items = (ex.sentence || "").trim().split(/\s+/);
                        return {
                            items,
                            correctOrder: items.map((_: string, idx: number) => idx)
                        };
                    })
                    : undefined,
            });
        }
        if (result) {
            navigate(`/challenges/${result.id}`);
        }
    };

    const handleSelectParticipant = (participant: ChallengeUser) => {
        setSelectedParticipant(participant);
        setValue('challengedId', participant.id);
    };

    const handleAiGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setAiSubmitted(true);

        const isLanguageValid = await trigger(['sourceLanguageId', 'languageId']);
        const schema = aiGenerationSchema(t, lessonType, false);
        let isAiSchemaValid = false;

        try {
            await schema.validate({ aiGenerationDescription: aiPrompt, aiItemCount }, { abortEarly: false });
            setAiErrors({});
            isAiSchemaValid = true;
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                const newErrors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
                setAiErrors(newErrors);
            }
        }

        if (!isLanguageValid || !isAiSchemaValid) {
            return;
        }

        setAiLoading(true);
        setAiError(null);
        setAiQuotaExceeded(false);

        try {
            const response = await challengeService.generateChallengeContent({
                targetLanguageId: selectedLanguageIdPublic,
                sourceLanguageId: selectedSourceLanguageId,
                lessonType,
                description: aiPrompt,
                itemCount: aiItemCount!,
            });

            setLessonValue('title', aiPrompt);
            setLessonValue('description', t('challenge.ai.generated_desc', { prompt: aiPrompt }) || `Généré par IA : ${aiPrompt}`);
            
            if (lessonType === 'QCM' && response.qcm) {
                setLessonValue('questions', response.qcm);
            } else if (lessonType === 'FLASHCARD' && response.flashcards) {
                const sourceLang = nativeLanguages.find(lang => lang.languageId === selectedSourceLanguageId)?.languageCode ?? 'fr';
                const targetLang = learningLanguages.find(lang => lang.languageId === selectedLanguageIdPublic)?.languageCode ?? 'en';

                const formattedFlashcards = response.flashcards.map(card => ({
                    front: card.front,
                    back: card.back,
                    frontLanguage: targetLang,
                    backLanguage: sourceLang
                }));
                setLessonValue('flashcards', formattedFlashcards);
            } else if (lessonType === 'MATCHING_PAIR' && response.matchingPairs) {
                setLessonValue('matchingPairs', response.matchingPairs);
            } else if (lessonType === 'SORTING_EXERCISE' && response.sortingExercises && response.sortingExercises.length > 0) {
                const formattedSortingExercises = response.sortingExercises.map(ex => ({
                    sentence: ex.items.join(" ")
                }));
                setLessonValue('sortingExercises', formattedSortingExercises);
            }
            
            setAiPrompt("");
            setAiSubmitted(false);
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const status = axiosError.response?.status;
            const message = axiosError.response?.data?.message || "";
            
            const isQuotaLimit = status === 400 || status === 403 || message.toLowerCase().includes("quota") || message.toLowerCase().includes("limite");
            if (isQuotaLimit) {
                setAiQuotaExceeded(true);
            } else {
                setAiError(message || t("error.unknown"));
            }
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div className={"bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700/60 p-6"}>
                <FormField
                    label={t('challenge.form.title')}
                    error={errors.title?.message}
                    {...register('title')}
                    placeholder={t('challenge.form.placeholder')}
                />

                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700/50">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{t('challenge.form.mode')}</p>
                    <div className="grid grid-cols-2 gap-3">
                        {(Object.values(CHALLENGE_TYPES) as ChallengeType[]).map(type => {
                            const isSelected = challengeType === type;
                            const optionsTypes = CHALLENGE_OPTIONS[type];
                            return (
                                <Button
                                    key={type}
                                    variant="none"
                                    type="button"
                                    onClick={() => { setChallengeType(type); setValue('challengeType', type); }}
                                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer
                                        ${isSelected 
                                            ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/15' 
                                            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/20 hover:border-gray-350 dark:hover:border-gray-700 hover:bg-gray-50/30 dark:hover:bg-gray-850/10'}`}
                                >
                                    <span className={`mt-0.5 p-2 rounded-lg shrink-0 transition-colors duration-150
                                        ${isSelected 
                                            ? 'bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' 
                                            : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500'}`}>
                                        {optionsTypes.icon}
                                    </span>
                                    <div>
                                        <p className={`text-sm font-semibold transition-colors duration-150 
                                            ${isSelected ? 'text-indigo-950 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                            {t(optionsTypes.label)}
                                        </p>
                                        <p className={`text-xs mt-0.5 leading-relaxed transition-colors duration-150
                                            ${isSelected ? 'text-indigo-800/70 dark:text-indigo-300/60' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {t(optionsTypes.description)}
                                        </p>
                                    </div>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {challengeType === 'DUEL' && (
                <div className={"bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700/60 p-6"}>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">{t('challenge.form.topic')}</p>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select
                                label={t('challenge.form.topic')}
                                value={selectedTopicId}
                                options={topics.map(topic => ({ value: topic.id, label: topic.name }))}
                                onChange={(value) => { setSelectedTopicId(value); setValue('lessonId', ''); }}
                                placeholder={t('challenge.form.topic_placeholder')}
                            />
                            {selectedTopicId ? (
                                <Select
                                    label={t('challenge.form.lesson')}
                                    value={selectedLessonId ?? ''}
                                    options={lessons.filter(lesson => lesson.lessonType === 'QCM' || lesson.lessonType === 'FLASHCARD').map(less => ({ value: less.id, label: less.title }))}
                                    onChange={(value) => setValue('lessonId', value)}
                                    error={errors.lessonId?.message}
                                    placeholder={t('challenge.form.lesson_placeholder')}
                                />
                            ) : errors.lessonId && (
                                <p className="text-sm text-red-600 self-end pb-1">{errors.lessonId.message}</p>
                            )}
                        </div>

                        <FormField
                            label={t('challenge.form.question_count')}
                            error={errors.questionCount?.message}
                            {...register('questionCount', { valueAsNumber: true })}
                            type="number"
                            min={1}
                            max={50}
                            placeholder={t('challenge.form.question_count_placeholder')}
                        />

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 space-y-2">
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">{t('challenge.form.opponent.label')}</label>
                            {selectedParticipant ? (
                                <div className="flex items-center gap-3 p-3 rounded-xl border border-brand-200 dark:border-brand-700/40 bg-brand-50/50 dark:bg-brand-900/10">
                                    <Avatar imageUrl={selectedParticipant.photoUrl ? getProfileImageUrl(selectedParticipant.photoUrl) : undefined} size="w-10 h-10"/>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{selectedParticipant.username}</p>
                                        <p className="text-xs text-brand-600 dark:text-brand-400">{t('challenge.form.opponent.label')}</p>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" onClick={() => setIsParticipantModalOpen(true)}>
                                        {t('challenge.form.opponent.change')}
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    variant="none"
                                    onClick={() => setIsParticipantModalOpen(true)}
                                    disabled={!selectedLanguageId}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-500 dark:hover:text-brand-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <UserRoundPlus className="w-4 h-4" />
                                    {t('challenge.form.opponent.select')}
                                </Button>
                            )}
                            {errors.challengedId && (
                                <p className="text-sm text-red-600">{errors.challengedId.message}</p>
                            )}
                            {isParticipantModalOpen && selectedLanguageId && (
                                <ParticipantsModal
                                    languageId={selectedLanguageId}
                                    onSelect={handleSelectParticipant}
                                    onClose={() => setIsParticipantModalOpen(false)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {challengeType === 'PUBLIC' && (
                <>
                    <div className="bg-brand-50/30 dark:bg-brand-950/10 border border-brand-200 dark:border-gray-800 rounded-2xl p-6 mb-5 space-y-4 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-500" />
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                                    {t("challenge.ai.title")}
                                </h3>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                    {t("challenge.ai.required_fields")}
                                </p>
                            </div>
                        </div>

                        {aiQuotaExceeded ? (
                            <div className="text-center py-4 space-y-4">
                                <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        {t("challenge.ai.quota_exceeded_title")}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                        {t("challenge.ai.quota_exceeded_desc")}
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={() => navigate("/plans")}
                                    className="cursor-pointer text-xs py-2 px-4 mx-auto block"
                                >
                                    {t("challenge.ai.upgrade")}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {aiError && (
                                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-650 dark:text-red-400 text-xs">
                                        {aiError}
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Select
                                        label={t("challenge.form.lesson_type")}
                                        value={lessonType}
                                        options={PUBLIC_LESSON_TYPES.map(type => ({
                                            value: type,
                                            label: t(`challenge.type.${type.toLowerCase()}.type`) || type
                                        }))}
                                        onChange={(val) => handleLessonTypeChange(val as LessonType)}
                                    />
                                    <FormField
                                        label={t("challenge.ai.items_count")}
                                        type="number"
                                        min={minItems}
                                        max={maxItems}
                                        value={aiItemCount ?? ""}
                                        onChange={(e) => {
                                            const parsedValue = e.target.value ? parseInt(e.target.value, 10) : undefined;
                                            setAiItemCount(parsedValue);
                                        }}
                                        placeholder={t('admin.lessons.form.ai_generate.item_count_placeholder') + ` (${minItems}-${maxItems})`}
                                        className="bg-white/50 dark:bg-gray-900/50"
                                        error={aiSubmitted ? aiErrors.aiItemCount : undefined}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t("challenge.ai.prompt_label")} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <textarea
                                                value={aiPrompt}
                                                onChange={(e) => setAiPrompt(e.target.value)}
                                                rows={2}
                                                placeholder={t("challenge.ai.prompt_placeholder")}
                                                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
                                                    ${aiSubmitted && aiErrors.aiGenerationDescription ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-gray-800'}`}
                                            />
                                            {aiSubmitted && aiErrors.aiGenerationDescription && (
                                                <p className="text-xs text-red-500 mt-1">{aiErrors.aiGenerationDescription}</p>
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={handleAiGenerate}
                                            isLoading={aiLoading}
                                            disabled={aiLoading}
                                            className="px-6 h-[58px] cursor-pointer"
                                        >
                                            {t("challenge.ai.generate")}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={"bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700/60 p-6"}>
                        <div className="flex justify-between items-center gap-4 mb-6">
                            <span className="text-sm font-medium text-gray-650 dark:text-gray-400">
                                {t('challenge.create.public_details')}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <Select
                                label={t('challenge.create.source_language')}
                                value={selectedSourceLanguageId}
                                options={nativeLanguages.map(language => ({ value: language.languageId, label: language.languageName }))}
                                onChange={(value) => setValue('sourceLanguageId', value)}
                                placeholder={t('challenge.create.select_language')}
                                error={errors.sourceLanguageId?.message}
                            />
                            <Select
                                label={t('challenge.create.target_language')}
                                value={selectedLanguageIdPublic}
                                options={learningLanguages.map(language => ({ value: language.languageId, label: language.languageName }))}
                                onChange={(value) => setValue('languageId', value)}
                                placeholder={t('challenge.create.select_language')}
                                error={errors.languageId?.message}
                            />
                        </div>
                        <div className="pt-5 border-t border-gray-100 dark:border-gray-700/50">
                            <ChallengeLessonForm
                                lessonType={lessonType}
                                control={lessonControl}
                                register={lessonRegister}
                                errors={lessonErrors}
                                availableTypes={PUBLIC_LESSON_TYPES}
                                onLessonTypeChange={handleLessonTypeChange}
                                languageOptions={[
                                    ...nativeLanguages.filter(language => language.languageId === selectedSourceLanguageId).map(lang => ({ code: lang.languageCode, name: lang.languageName })),
                                    ...learningLanguages.filter(language => language.languageId === selectedLanguageIdPublic).map(lang => ({ code: lang.languageCode, name: lang.languageName })),
                                ]}
                                setValue={setLessonValue}
                            />
                        </div>
                    </div>
                </>
            )}

            <Button type="submit" variant="primary" disabled={loading} className="w-full py-3">
                {loading ? t('common.loading') : t('challenge.form.submit')}
            </Button>

        </form>
    );
}