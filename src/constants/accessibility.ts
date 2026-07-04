import React from 'react';
import { Eye, ZapOff, UnderlineIcon, BookOpen } from 'lucide-react';
import { AccessibilitySettings, FontSizeOption, ToggleAccessibility } from '@/types/components/accessibility';


export const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  reducedMotion: false,
  underlineLinks: false,
  dyslexia: false,
};

export const STORAGE_KEY = 'glotrush-accessibility';

export const FONT_SIZES: FontSizeOption[] = [
  { value: 'normal', label: 'font_normal', sample: 'A' },
  { value: 'large',  label: 'font_large',  sample: 'A+' },
  { value: 'xlarge', label: 'font_xlarge', sample: 'A++' },
];

export const OPTION_CARDS: {
  key: ToggleAccessibility;
  labelKey: string;
  descKey: string;
  Icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  activeBorder: string;
  activeBg: string;
}[] = [
  {
    key: 'highContrast',
    labelKey: 'high_contrast_label',
    descKey: 'high_contrast_desc',
    Icon: Eye,
    iconColor: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    activeBorder: 'border-violet-400 dark:border-violet-500',
    activeBg: 'bg-violet-50 dark:bg-violet-900/20',
  },
  {
    key: 'reducedMotion',
    labelKey: 'reduced_motion_label',
    descKey: 'reduced_motion_desc',
    Icon: ZapOff,
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    activeBorder: 'border-amber-400 dark:border-amber-500',
    activeBg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    key: 'underlineLinks',
    labelKey: 'underline_links_label',
    descKey: 'underline_links_desc',
    Icon: UnderlineIcon,
    iconColor: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-100 dark:bg-sky-900/30',
    activeBorder: 'border-sky-400 dark:border-sky-500',
    activeBg: 'bg-sky-50 dark:bg-sky-900/20',
  },
  {
    key: 'dyslexia',
    labelKey: 'dyslexia_label',
    descKey: 'dyslexia_desc',
    Icon: BookOpen,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    activeBorder: 'border-emerald-400 dark:border-emerald-500',
    activeBg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
];
