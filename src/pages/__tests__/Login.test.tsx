import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../login/Login'

describe('Login', () => {
    it('should render login form', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )

        expect(screen.getByText('Connexion')).toBeInTheDocument()
    })

    it('should display email input field', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )

        expect(screen.getByLabelText('Adresse email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument()
    })

    it('should display password input field', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )

        expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    })

    it('should display submit button', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )

        expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument()
    })

    it('should display link to register page', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )

        expect(screen.getByText('Créer un compte')).toBeInTheDocument()
    })

    it('should display link to home page', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )

        expect(screen.getByText("Retour à l'accueil")).toBeInTheDocument()
    })
})
