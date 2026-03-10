import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Brain, Sparkles, BookOpen } from '@/assets/icons';

export default function Home() {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow flex flex-col justify-center py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    
                    {/* Hero Section */}
                    <div className="text-center md:max-w-3xl md:mx-auto mb-20">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                            Maîtrisez une langue avec <span className="text-indigo-600">l'Intelligence Artificielle</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                            GlotRush s'appuie sur la science cognitive et des algorithmes de pointe pour créer le parcours d'apprentissage absolu. Répétition espacée, leçons sur-mesure et immersion totale.
                        </p>
                        
                        <div className="mt-10 sm:flex sm:justify-center">
                            {isAuthenticated ? (
                                <div className="space-y-4">
                                    <p className="text-sm font-medium text-gray-500">
                                        Connecté en tant que <span className="text-indigo-700">{user?.username || user?.email}</span>
                                    </p>
                                    <Link
                                        to="/subscription"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors shadow-sm"
                                    >
                                        Continuer mon apprentissage
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                                    <Link
                                        to="/register"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors shadow-sm"
                                    >
                                        Commencer gratuitement
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors shadow-sm"
                                    >
                                        Se connecter
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            
                            {/* Feature 1 */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-6">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Apprentissage Scientifique
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Nos leçons sont fondées sur des études cognitives prouvées. La répétition espacée garantit une mémorisation gravée sur le long terme.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-6">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    IA Omniprésente
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Une pédagogie qui s'adapte en temps réel. L'intelligence artificielle évalue vos faiblesses et génère le contenu parfait pour vous faire progresser.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                                <div className="w-12 h-12 inline-flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-6">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Dispositifs Variés
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Une multitude d'exercices interactifs et variés, conçus spécifiquement pour maximiser la rétention linguistique et l'immersion totale.
                                </p>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </main>

            {/* Scientific Proof Section */}
            <section className="bg-white py-20 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl shadow-sm inline-block px-4 py-2 border-b-4 border-indigo-200">
                            Prouvé par la science
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                            L'efficacité de nos dispositifs s'appuie sur des décennies de recherche en sciences cognitives et en linguistique.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {/* Flashcards & Spaced Repetition */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Cartes Mémoire & Effet d'Espacement</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Sans révision, le cerveau oublie naturellement 78% des informations (la courbe de l'oubli d'Ebbinghaus). La répétition espacée force le rappel actif juste avant l'oubli, maximisant la mémorisation grâce à la "potentialisation à long terme".
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700"><strong>+200% à +400%</strong> d'amélioration par rapport au "bachotage".</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Taux de rétention à 1 an</h4>
                                
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 font-medium text-gray-700">
                                            <span>Apprentissage Classique</span>
                                            <span>22%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-gray-400 h-3 rounded-full" style={{ width: '22%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1 font-bold text-indigo-700">
                                            <span>Apprentissage Espacé (GlotRush)</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="w-full bg-indigo-100 rounded-full h-3">
                                            <div className="bg-indigo-600 h-3 rounded-full relative" style={{ width: '85%' }}>
                                                <span className="absolute -right-2 -top-1 w-3 h-5 bg-white border-2 border-indigo-600 rounded-full animate-pulse shadow-md"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Matching Pair & Dual Coding */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Voies de Mémorisation</h4>
                                <div className="flex justify-around items-end h-32 px-4 gap-4">
                                    <div className="w-full relative flex flex-col items-center justify-end h-full">
                                        <div className="w-16 bg-gray-300 rounded-t-md text-center text-xs text-gray-700 font-medium py-1" style={{ height: '40%' }}>Texte Seul</div>
                                    </div>
                                    <div className="w-full relative flex flex-col items-center justify-end h-full">
                                        <div className="w-16 bg-indigo-500 rounded-t-md text-center text-xs text-white font-medium py-1 shadow-md" style={{ height: '85%' }}>
                                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-sm text-indigo-600 font-bold whitespace-nowrap">+65%</span>
                                            Double Codage
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Paires Visuelles & Théorie du Double Codage</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Traiter l'information simultanément par les canaux visuel et verbal (comme dans les jeux d'association de paires) crée de multiples chemins de récupération dans le cerveau.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700">Diminution de la surcharge cognitive.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700"><strong>+65%</strong> de rétention par rapport au texte sans contexte visuel (Paivio, 1971).</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* QCM & Testing Effect */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. QCM & Effet de Test</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    La pratique de récupération (Retrieval Practice) est supérieure à l'étude passive. Les QCM bien calibrés obligent à discriminer l'information, consolidant directement la trace en mémoire, bien au-delà de la simple évaluation.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700">Accès au vocabulaire jusqu'à <strong>340%</strong> plus rapide.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center">
                                <div className="text-center">
                                    <div className="inline-block p-4 bg-white rounded-full border border-indigo-100 shadow-sm mb-4 relative">
                                        <span className="absolute top-0 right-0 flex h-3 w-3">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                                        </span>
                                        <span className="text-4xl font-extrabold text-indigo-600 inline-block">340%</span>
                                    </div>
                                    <p className="font-semibold text-gray-700">Vitesse d'accès mémoriel gagnée</p>
                                    <p className="text-sm text-gray-500">grâce aux quizz récurrents</p>
                                </div>
                            </div>
                        </div>

                        {/* Sorting & Chunking */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                                <div className="flex space-x-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded border border-gray-300"></div>
                                    <div className="w-10 h-10 bg-gray-200 rounded border border-gray-300"></div>
                                    <div className="w-10 h-10 bg-gray-200 rounded border border-gray-300"></div>
                                    <div className="text-gray-400 text-xl font-bold flex items-center px-2">{"→"}</div>
                                    <div className="w-24 h-10 bg-indigo-500 rounded border border-indigo-600 shadow-md text-white flex items-center justify-center font-bold text-sm tracking-wider">CHUNK</div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Tri Conceptuel & Chunking</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    La mémoire de travail naturelle plafonne autour de 7 éléments (Loi de Miller). Les exercices de tri obligent un encodage sémantique fort (par le sens de la catégorie), ce qui permet de grouper les informations (Chunking).
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1 text-xs">✓</span>
                                        <span className="text-gray-700">Transfère l'information de la mémoire courte saturée vers la mémoire sémantique structurée.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Scientific Sources Footer */}
            <section className="bg-gray-100 py-10 border-t border-gray-200 text-sm text-gray-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h5 className="font-bold text-gray-700 mb-4 uppercase tracking-wider text-xs">Sources & Références d'Études :</h5>
                    <ol className="list-decimal pl-5 space-y-2 max-w-4xl opacity-80">
                        <li><strong>Ebbinghaus, H.</strong> (1885). <em>Memory: A Contribution to Experimental Psychology</em>. L'effet d'espacement (Spacing Effect) retient systématiquement l'oubli à des taux de 80%+ contre moins de 25% sans rappels.</li>
                        <li><strong>Paivio, A.</strong> (1971). <em>Imagery and verbal processes</em>. La théorie du double codage. Les preuves démontrent que les paires text-imagery stimulent les chemins mnésiques croisés.</li>
                        <li><strong>Roediger, H. L., & Karpicke, J. D.</strong> (2006). <em>Test-enhanced learning</em>. L'application du QCM ("Testing Effect") produit de meilleures capacités de récupération que le simple temps de relecture.</li>
                        <li><strong>Miller, G. A.</strong> (1956). <em>The magical number seven, plus or minus two</em>, and Semantic Encoding (Craik & Lockhart, 1972). Le chunking modifie la hiérarchie du stockage mental vis-à-vis des apprentissages linguistiques.</li>
                    </ol>
                </div>
            </section>

        </div>
    );
}
