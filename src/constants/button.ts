import { ButtonSize, ButtonVariant } from "@/components/ui/Button";

export const variants: Record<ButtonVariant, string> = {
  primary: 'bg-linear-to-b from-brand-600 to-brand-700 dark:from-indigo-600 dark:to-indigo-700 text-white border border-brand-400/50 dark:border-indigo-400/50 shadow-[0_0_15px_rgba(79,70,229,0.3)] dark:shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:from-brand-500 hover:to-brand-600 dark:hover:from-indigo-500 dark:hover:to-indigo-600 focus:ring-brand-500',
  secondary: 'bg-linear-to-b from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white border border-gray-500/50 dark:border-gray-600/50 shadow-lg shadow-gray-500/10 hover:from-gray-500 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-700 focus:ring-gray-500',
  danger: 'bg-linear-to-b from-red-600 to-red-700 dark:from-red-600 dark:to-red-700 text-white border border-red-400/50 dark:border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] dark:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:from-red-500 hover:to-red-600 dark:hover:from-red-500 dark:hover:to-red-600 focus:ring-red-500',
  outline: 'border-2 border-brand-100 dark:border-brand-900/50 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 focus:ring-brand-500',
  ghost: 'bg-transparent text-gray-700 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 focus:ring-brand-500',
  none: '',
};

export const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};
