import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Brain, Sparkles, BookOpen } from '@/assets/icons';
import { RoleEnum } from '@/types/enum/roles';
import { MetaData } from '@/components/seo/MetaData';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { AICourseDemo } from '@/components/home/AICourseDemo';
import { ExerciseDemoSection } from '@/components/home/ExerciseDemoSection';
import { FAQ } from '@/components/home/FAQ';



export default function Home() {
    const { isAuthenticated, user } = useAuth();
    const { t } = useTranslation();
    if (isAuthenticated) {
    return <Navigate to={user?.role === RoleEnum.ADMIN ? "/admin" : "/dashboard"} replace />;
    } 

    return (
        <>
        <style>{`
            @keyframes fadeUp {
                from { opacity:0; transform:translateY(24px); }
                to   { opacity:1; transform:translateY(0); }
            }
        `}</style>

        <MetaData title={t('home.page_title')} description={t('home.page_description')} keywords={t('home.page_keywords')} robots='index, follow' url='https://skaldly.fr' />
        <SchemaOrg />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col relative">
            <main className="flex-grow flex items-center py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                    <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                        <div style={{ animation: 'fadeUp 0.7s ease both' }}>
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white mb-6">
                                {t('home.hero.title_start')}{t('home.hero.title_highlight')}
                            </h1>
                            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
                                {t('home.hero.description')}
                            </p>

                            <div className="mt-10 sm:flex sm:justify-start">
                                {isAuthenticated ? (
                                    <div className="space-y-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {t('home.hero.logged_in_as')}<span className="text-brand-800 dark:text-brand-400">{user?.username || user?.email}</span>
                                        </p>
                                        <Link
                                            to="/subscription"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg md:px-10 transition-colors shadow-sm"
                                        >
                                            {t('home.hero.continue_learning')}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-start">
                                        <Link to="/register" className="w-full sm:w-auto">
                                            <Button variant="primary" size="lg" fullWidth className="bg-purple-600 hover:bg-purple-700">
                                                {t('home.hero.start_free')}
                                            </Button>
                                        </Link>
                                        <Link to="/login" className="flex items-center justify-center font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors w-full sm:w-auto h-full px-4">
                                            {t('auth.login.title')}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
                                    <Brain className="w-4 h-4" />{t('home.features.scientific.title')}
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                                    <Sparkles className="w-4 h-4" />{t('home.features.ai.title')}
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-800">
                                    <BookOpen className="w-4 h-4" />{t('home.features.variety.title')}
                                </span>
                            </div>
                        </div>

                        <div style={{ animation: 'fadeUp 0.9s ease both' }}>
                            <AICourseDemo />
                        </div>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            
                            <div className="bg-white dark:bg-gray-900/60 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 mb-6">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {t('home.features.scientific.title')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t('home.features.scientific.description')}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-900/60 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 mb-6">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {t('home.features.ai.title')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t('home.features.ai.description')}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-900/60 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-500 mb-6">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {t('home.features.variety.title')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t('home.features.variety.description')}
                                </p>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </main>

            <ExerciseDemoSection />

            <section className="bg-white dark:bg-gray-900/50 py-20 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl shadow-sm inline-block px-4 py-2 border-b-4 border-brand-200">
                            {t('home.science.title')}
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {t('home.science.subtitle')}
                        </p>
                    </div>

                    <div className="space-y-24">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('home.science.spaced_repetition.title')}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {t('home.science.spaced_repetition.description')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300"><strong>{t('home.science.spaced_repetition.stat1')}</strong>{t('home.science.spaced_repetition.stat1_desc')}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-6">{t('home.science.spaced_repetition.chart_title')}</h4>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 font-medium text-gray-700 dark:text-gray-400">
                                            <span>{t('home.science.spaced_repetition.classic')}</span>
                                            <span>22%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                                            <div className="bg-gray-400 dark:bg-gray-600 h-3 rounded-full" style={{ width: '22%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 font-bold text-brand-800 dark:text-emerald-400">
                                            <span>{t('home.science.spaced_repetition.glotrush')}</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="w-full bg-emerald-100 dark:bg-emerald-950/30 rounded-full h-3">
                                            <div className="bg-emerald-500 h-3 rounded-full relative" style={{ width: '85%' }}>
                                                <span className="absolute -right-2 -top-1 w-3 h-5 bg-white border-2 border-emerald-500 rounded-full animate-pulse shadow-md"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 bg-gray-50 dark:bg-gray-900/40 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-6">{t('home.science.dual_coding.chart_title')}</h4>
                                <div className="flex justify-around items-end h-32 px-4 gap-4">
                                    <div className="w-full relative flex flex-col items-center justify-end h-full">
                                        <div className="w-16 bg-gray-300 dark:bg-gray-700 rounded-t-lg text-center text-xs text-gray-700 dark:text-white font-medium py-1" style={{ height: '40%' }}>{t('home.science.dual_coding.text_only')}</div>
                                    </div>
                                    <div className="w-full relative flex flex-col items-center justify-end h-full">
                                        <div className="w-16 bg-brand-500 rounded-t-lg text-center text-xs text-white font-medium py-1 shadow-md" style={{ height: '85%' }}>
                                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-sm text-brand-700 dark:text-white font-bold whitespace-nowrap">+65%</span>
                                            {t('home.science.dual_coding.dual_coding')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('home.science.dual_coding.title')}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {t('home.science.dual_coding.description')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">{t('home.science.dual_coding.stat1')}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300"><strong>{t('home.science.dual_coding.stat2')}</strong>{t('home.science.dual_coding.stat2_desc')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('home.science.testing_effect.title')}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {t('home.science.testing_effect.description')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">{t('home.science.testing_effect.stat1_start')}<strong>{t('home.science.testing_effect.stat1_highlight')}</strong>{t('home.science.testing_effect.stat1_end')}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center">
                                <div className="text-center">
                                    <div className="inline-block p-4 bg-white dark:bg-gray-900/60 rounded-full border border-rose-100 dark:border-rose-900/30 shadow-sm mb-4 relative">
                                        <span className="absolute top-0 right-0 flex h-3 w-3">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                                        </span>
                                        <span className="text-4xl font-extrabold text-rose-600 dark:text-rose-400 inline-block">340%</span>
                                    </div>
                                    <p className="font-semibold text-gray-700 dark:text-gray-300">{t('home.science.testing_effect.chart_title')}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{t('home.science.testing_effect.chart_desc')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center overflow-hidden">
                                <div className="flex space-x-2">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700"></div>
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700"></div>
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700"></div>
                                    <div className="text-gray-500 dark:text-gray-500 text-xl font-bold flex items-center px-2">{"→"}</div>
                                    <div className="w-24 h-10 bg-purple-600 rounded border border-purple-700 shadow-md text-white flex items-center justify-center font-bold text-sm tracking-wider">{t('home.science.chunking.chunk_word')}</div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('home.science.chunking.title')}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {t('home.science.chunking.description')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700 dark:text-gray-300">{t('home.science.chunking.stat1')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-gray-100 dark:bg-gray-950/40 py-10 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider text-xs">
                        {t('home.science.sources.title')}
                    </h2>
                    <ol className="list-decimal pl-5 space-y-2 max-w-4xl">
                        <li><strong>Ebbinghaus, H.</strong> {t('home.science.sources.source1')}</li>
                        <li><strong>Paivio, A.</strong> {t('home.science.sources.source2')}</li>
                        <li><strong>Roediger, H. L., & Karpicke, J. D.</strong> {t('home.science.sources.source3')}</li>
                        <li><strong>Miller, G. A.</strong> {t('home.science.sources.source4')}</li>
                    </ol>
                </div>
            </section>

            <FAQ />

        </div>
        </>
    );
}
