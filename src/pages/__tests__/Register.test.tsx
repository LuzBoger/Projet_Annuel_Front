import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Register from '../Register'

describe('Register', () => {
    it('should render register form', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        )

        expect(screen.getByText('Créer un compte')).toBeInTheDocument()
    })

    it('should display full name input field', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        )

        expect(screen.getByLabelText('Nom complet')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Jean Dupont')).toBeInTheDocument()
    })

    it('should display email input field', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        )

        expect(screen.getByLabelText('Adresse email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument()
    })

    it('should display password input fields', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        )

        expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
        expect(screen.getByLabelText('Confirmer le mot de passe')).toBeInTheDocument()
    })

    it('should display submit button', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        )

        expect(screen.getByRole('button', { name: 'Créer mon compte' })).toBeInTheDocument()
    })

    it('should display link to login page', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        )

        expect(screen.getByText('Se connecter')).toBeInTheDocument()
    })

    it('should display link to home page', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        )

        expect(screen.getByText("Retour à l'accueil")).toBeInTheDocument()
    })
})
