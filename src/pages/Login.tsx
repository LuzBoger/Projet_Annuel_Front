import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log('Login attempt:', { emailAddress, password })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center">
                    Connexion
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Adresse email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={emailAddress}
                            onChange={(event) => setEmailAddress(event.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Se connecter
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Pas encore de compte ?{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                            Créer un compte
                        </Link>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    )
}
