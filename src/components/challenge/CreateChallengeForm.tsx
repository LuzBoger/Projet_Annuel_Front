import { ChallengeLessonForm } from "@/components/challenge/ChallengeLessonForm";
import { ParticipantsModal } from "@/components/challenge/ParticipantsModal";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { CHALLENGE_TYPES, PUBLIC_LESSON_TYPES } from "@/constants/challenge";
import { useChallenge } from "@/hooks/useChallenge";
import { languageService } from "@/services/languageService";
import { lessonService } from "@/services/lessonService";
import { topicService } from "@/services/topicService";
import { ChallengeType, ChallengeUser } from "@/types/challenges/challenge";
import { LanguageResponse } from "@/types/language/language";
import { LessonResponse, LessonType } from "@/types/lesson/lesson";
import { TopicResponse } from "@/types/topic/topic";
import { ChallengeFormData, challengeSchema } from "@/validations/challenges/challengeSchema";
import { LessonFormData, lessonSchema } from "@/validations/lessons/lessonSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Globe, Swords, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Resolver, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getProfileImageUrl } from "@/lib/utils/image";
import { ChallengeOption } from "@/types/components/challengeOption";

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
    const [languages, setLanguages] = useState<LanguageResponse[]>([]);
    const [selectedTopicId, setSelectedTopicId] = useState('');
    const [lessonType, setLessonType] = useState<LessonType>('QCM');
    const [selectedParticipant, setSelectedParticipant] = useState<ChallengeUser | null>(null);
    const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<ChallengeFormData>({
        resolver: yupResolver(challengeSchema(t)) as Resolver<ChallengeFormData>,
        defaultValues: {
            title: '',
            challengeType: 'PUBLIC',
            lessonId: '',
            languageId: '',
            lessonType: 'QCM' as LessonType,
            questionCount: undefined,
            challengedId: '',
        },
    });

    const { register: lessonRegister, control: lessonControl, formState: { errors: lessonErrors }, getValues: getLessonValues } = useForm<LessonFormData>({
        resolver: yupResolver(lessonSchema(t)) as Resolver<LessonFormData>,
        defaultValues: {
            title: '',
            description: '',
            isActive: true,
            lessonType: 'QCM',
            questions: [{ question: '', options: ['', '', '', ''], correctOptionIndex: 0, explanation: '' }],
            flashcards: [{ front: '', back: '', frontLanguage: 'fr', backLanguage: 'en' }],
            matchingPairs: [{ item1: '', item2: '' }],
            sortingItems: [{ value: '' }, { value: '' }],
        },
    });

    const selectedLessonId = useWatch({ control, name: 'lessonId' });
    const selectedLanguageId = topics.find(topic => topic.id === selectedTopicId)?.targetLanguageId ?? '';
    const selectedLanguageIdPublic = useWatch({ control, name: 'languageId' }) ?? '';

    useEffect(() => {
        topicService.getAllTopicsByActive().then(setTopics);
        languageService.getAllActiveLanguages().then(setLanguages);
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
                lessonType,
                questionCount: data.questionCount || undefined,
                qcm: lessonType === 'QCM' ? lessonData.questions : undefined,
                flashcards: lessonType === 'FLASHCARD' ? lessonData.flashcards : undefined,
                matchingPairs: lessonType === 'MATCHING_PAIR' ? lessonData.matchingPairs : undefined,
                sortingExercises: lessonType === 'SORTING_EXERCISE' && lessonData.sortingItems 
                    ? [{ items: lessonData.sortingItems.map(i => i.value), correctOrder: lessonData.sortingItems.map((_, idx) => idx) }]
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
                                    className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150
                                        ${isSelected ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                >
                                    <span className={`mt-0.5 p-2 rounded-lg shrink-0 ${isSelected ? 'bg-brand-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                        {optionsTypes.icon}
                                    </span>
                                    <div>
                                        <p className={`text-sm font-semibold ${isSelected ? 'text-brand-700 dark:text-brand-300' : 'text-gray-800 dark:text-gray-200'}`}>
                                            {t(optionsTypes.label)}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
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
                                    options={lessons.map(lesson => ({ value: lesson.id, label: lesson.title }))}
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
                <div className={"bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700/60 p-6"}>
                    <div className="max-w-xs mb-6">
                        <Select
                            label={t('challenge.form.language')}
                            value={selectedLanguageIdPublic}
                            options={languages.map(language => ({ value: language.id, label: language.name }))}
                            onChange={(value) => setValue('languageId', value)}
                            placeholder={t('challenge.form.language_placeholder')}
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
                            onLessonTypeChange={(type) => { setLessonType(type); setValue('lessonType', type); }}
                        />
                    </div>
                </div>
            )}

            <Button type="submit" variant="primary" disabled={loading} className="w-full py-3">
                {loading ? t('common.loading') : t('challenge.form.submit')}
            </Button>

        </form>
    );
}