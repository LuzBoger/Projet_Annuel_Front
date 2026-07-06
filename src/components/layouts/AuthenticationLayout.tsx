import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Sparkles, BookOpen } from '@/assets/icons';
import { MetaData } from '@/components/seo/MetaData';

interface AuthenticationLayoutProps {
  children: ReactNode;
  title: string;
  illustrationTitle?: ReactNode;
  illustrationDescription?: ReactNode;
}

export function AuthenticationLayout({ children, title, illustrationTitle, illustrationDescription }: AuthenticationLayoutProps) {
  const { t } = useTranslation();

  const defaultTitle = (
    <>{t('auth.illustrations.default.title_start')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-brand-300">{t('auth.illustrations.default.title_highlight')}</span></>
  );
  const defaultDesc = t('auth.illustrations.default.description');

  return (
    <>
    <MetaData title={title} robots="noindex, nofollow"  />
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 mx-auto">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-xl lg:shadow-none lg:bg-transparent dark:lg:bg-transparent rounded-2xl p-8 lg:p-0">
            {children}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-indigo-950 via-brand-900 to-purple-900 dark:from-gray-900 dark:via-gray-950 dark:to-black items-center justify-center overflow-hidden border-l border-white/5 dark:border-white/5">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-500 dark:bg-purple-800 blur-3xl opacity-20 dark:opacity-30"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-500 dark:bg-indigo-900 blur-3xl opacity-20 dark:opacity-30"></div>
        
        <div className="relative z-10 p-16 max-w-2xl text-center">
            
            <div className="flex justify-center space-x-8 mb-12">
                <div className="w-16 h-16 bg-white/10 dark:bg-brand-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 dark:border-brand-500/20 shadow-2xl transform -rotate-6 transition-transform hover:rotate-0">
                    <Brain className="w-8 h-8 text-indigo-300 dark:text-brand-400" />
                </div>
                <div className="w-20 h-20 bg-white/10 dark:bg-purple-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 dark:border-purple-500/20 shadow-2xl transform translate-y-4 transition-transform hover:translate-y-0">
                    <Sparkles className="w-10 h-10 text-purple-300 dark:text-purple-400" />
                </div>
                <div className="w-16 h-16 bg-white/10 dark:bg-brand-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 dark:border-brand-500/20 shadow-2xl transform rotate-6 transition-transform hover:rotate-0">
                    <BookOpen className="w-8 h-8 text-indigo-300 dark:text-brand-400" />
                </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                {illustrationTitle || defaultTitle}
            </h1>
            <p className="text-lg lg:text-xl text-white/70 font-medium leading-relaxed">
                {illustrationDescription || defaultDesc}
            </p>
        </div>
      </div>
    </div>
    </>
  );
}
