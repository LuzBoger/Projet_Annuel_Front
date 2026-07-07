import { ButtonSize, ButtonVariant } from "@/types/components/button";

export const variants: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white focus:ring-indigo-500',
  secondary: 'bg-linear-to-b from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white border border-gray-500/50 dark:border-gray-600/50 shadow-lg shadow-gray-500/10 hover:from-gray-500 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-700 focus:ring-gray-500',
  danger: 'bg-linear-to-b from-red-600 to-red-700 dark:from-red-600 dark:to-red-700 text-white border border-red-400/50 dark:border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] dark:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:from-red-500 hover:to-red-600 dark:hover:from-red-500 dark:hover:to-red-600 focus:ring-red-500',
  outline: 'border-2 border-brand-100 dark:border-brand-900/50 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 focus:ring-brand-500',
  ghost: 'bg-transparent text-gray-700 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 focus:ring-brand-500',
  none: '',
  'pill-brand': 'bg-brand-50/80 dark:bg-brand-500/20 border border-brand-300/50 dark:border-brand-500/40 text-brand-700 dark:text-brand-400 hover:text-brand-800 hover:bg-brand-100 dark:hover:text-brand-300 dark:hover:bg-brand-500/30 rounded-xl shadow-sm transition-all',
  'pill-blue': 'bg-blue-50/80 dark:bg-blue-500/20 border border-blue-300/50 dark:border-blue-500/40 text-blue-700 dark:text-blue-400 hover:text-blue-800 hover:bg-blue-100 dark:hover:text-blue-300 dark:hover:bg-blue-500/30 rounded-xl shadow-sm transition-all',
  'pill-red': 'bg-red-50/80 dark:bg-red-500/20 border border-red-300/50 dark:border-red-500/40 text-red-700 dark:text-red-500 hover:text-red-800 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-500/30 rounded-xl shadow-sm transition-all',
  'pill-green': 'bg-green-50/80 dark:bg-green-500/20 border border-green-300/50 dark:border-green-500/40 text-green-700 dark:text-green-400 hover:text-green-800 hover:bg-green-100 dark:hover:text-green-300 dark:hover:bg-green-500/30 rounded-xl shadow-sm transition-all',
  'pill-yellow': 'bg-yellow-50/80 dark:bg-yellow-500/20 border border-yellow-300/50 dark:border-yellow-500/40 text-yellow-700 dark:text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 dark:hover:text-yellow-500 dark:hover:bg-yellow-500/30 rounded-xl shadow-sm transition-all',
  'pill-purple': 'bg-purple-50/80 dark:bg-purple-500/20 border border-purple-300/50 dark:border-purple-500/40 text-purple-700 dark:text-purple-400 hover:text-purple-800 hover:bg-purple-100 dark:hover:text-purple-300 dark:hover:bg-purple-500/30 rounded-xl shadow-sm transition-all',
  'pill-gray': 'bg-gray-100/80 dark:bg-gray-800/20 border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-400 hover:text-gray-900 shadow-sm transition-all dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/40 rounded-xl',
};

export const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};
