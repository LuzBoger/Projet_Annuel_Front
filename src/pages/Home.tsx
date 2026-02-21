import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-indigo-900 mb-4">
                        Bienvenue sur GloTrush
                    </h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        La plateforme moderne pour gérer vos projets de manière efficace et collaborative
                    </p>
                </header>

                <section className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="text-indigo-600 text-4xl mb-4">🚀</div>
                        <h3 className="text-xl font-semibold mb-2">Rapide et Efficace</h3>
                        <p className="text-gray-600">
                            Démarrez vos projets en quelques minutes avec notre interface intuitive
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="text-indigo-600 text-4xl mb-4">🔒</div>
                        <h3 className="text-xl font-semibold mb-2">Sécurisé</h3>
                        <p className="text-gray-600">
                            Vos données sont protégées avec les dernières technologies de sécurité
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="text-indigo-600 text-4xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold mb-2">Collaboratif</h3>
                        <p className="text-gray-600">
                            Travaillez en équipe et partagez vos projets facilement
                        </p>
                    </div>
                </section>

                <div className="text-center">
                    {isAuthenticated ? (
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700">
                                Connecté en tant que <span className="font-semibold text-indigo-900">{user?.email}</span>
                            </p>
                            <button
                                onClick={handleLogout}
                                className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                            >
                                Se déconnecter
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link
                                to="/register"
                                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                Créer un compte
                            </Link>
                            <Link
                                to="/login"
                                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
                            >
                                Se connecter
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
