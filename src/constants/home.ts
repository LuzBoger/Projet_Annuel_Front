import { Brain, Sparkles, BookOpen, Warning } from '@/assets/icons';
import { AIDemo, HelpOption, LessonTypeDemo } from '@/types/components/home';

export const AI_DEMO_KEYS: AIDemo[] = [
    {
        word: 'こんにちは',
        fl: 'JP',
        selectedOpt: 1,
        context: 'home.ai_demo.demos.0.context',
        title: 'home.ai_demo.demos.0.title',
        explanation: 'home.ai_demo.demos.0.explanation',
        visualAnchor: 'home.ai_demo.demos.0.visual_anchor',
        examples: null,
    },
    {
        word: 'Manzana',
        fl: 'ES',
        selectedOpt: 3,
        context: 'home.ai_demo.demos.1.context',
        title: 'home.ai_demo.demos.1.title',
        explanation: 'home.ai_demo.demos.1.explanation',
        visualAnchor: null,
        examples: 'home.ai_demo.demos.1.examples',
    },
    {
        word: 'Arigatou',
        fl: 'JP',
        selectedOpt: 0,
        context: 'home.ai_demo.demos.2.context',
        title: 'home.ai_demo.demos.2.title',
        explanation: 'home.ai_demo.demos.2.explanation',
        visualAnchor: null,
        examples: 'home.ai_demo.demos.2.examples',
    },
];

export const OPTION_KEYS: HelpOption[] = [
    {
        label: 'home.ai_demo.help_options.rule',
        Icon: BookOpen,
        style: 'border-blue-200 bg-blue-50/60 dark:bg-blue-950/20 dark:border-blue-800 text-blue-600 dark:text-blue-400',
    },
    {
        label: 'home.ai_demo.help_options.memo',
        Icon: Brain,
        style: 'border-purple-200 bg-purple-50/60 dark:bg-purple-950/20 dark:border-purple-800 text-purple-600 dark:text-purple-400',
    },
    {
        label: 'home.ai_demo.help_options.trap',
        Icon: Warning,
        style: 'border-amber-200 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-800 text-amber-600 dark:text-amber-400',
    },
    {
        label: 'home.ai_demo.help_options.usage',
        Icon: Sparkles,
        style: 'border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/20 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400',
    },
];

export const FLASHCARDS_HOME = [
    { front: 'Hello', back: 'こんにちは', fl: 'EN', bl: 'JP' },
    { front: 'Merci', back: 'Thank you',  fl: 'FR', bl: 'EN' },
    { front: 'Hola',  back: 'Bonjour',   fl: 'ES', bl: 'FR' },
];

export const QCM_CONFIG = {
    question: 'home.qcm_demo.question',
    options: 'home.qcm_demo.options',
    feedback: 'home.qcm_demo.feedback',
    correctIndex: 2,
    wrongIndex: 1
};

export const MATCH_PAIRS = [
    { id: 'a', left: 'Apple', right: 'Manzana' },
    { id: 'b', left: 'Hello', right: 'Bonjour' },
    { id: 'c', left: 'Thank you', right: 'Merci' },
];

export const MATCH_RIGHT_ORDER = ['c', 'a', 'b'];

export const SORT_WORDS = ['Je', 'mange', 'une', 'pomme'];
    
export const LESSON_INTERACTIVE_ANSWER = 'veux';

export const DEMO_TAB_LESSONS: LessonTypeDemo[] = [
    { key: 'flashcard', label: 'home.exercise_section.tabs.flashcard.label', description: 'home.exercise_section.tabs.flashcard.desc'},
    { key: 'qcm', label: 'home.exercise_section.tabs.qcm.label', description: 'home.exercise_section.tabs.qcm.desc'},
    { key: 'matching', label: 'home.exercise_section.tabs.matching.label', description: 'home.exercise_section.tabs.matching.desc'},
    { key: 'sorting', label: 'home.exercise_section.tabs.sorting.label', description: 'home.exercise_section.tabs.sorting.desc'},
    { key: 'interactive', label: 'home.exercise_section.tabs.interactive.label', description: 'home.exercise_section.tabs.interactive.desc' },
];

export const DEFAULT_OG_IMAGE = 'https://skaldly.fr/skaldly.svg'
export const SITE_URL = 'https://skaldly.fr'