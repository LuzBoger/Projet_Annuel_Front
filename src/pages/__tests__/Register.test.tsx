import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test/renderWithProviders'
import i18n from '../../i18n/i18n'
import Register from '../register/Register'

const t = i18n.t.bind(i18n)

describe('Register', () => {
    it('should render register form', () => {
        renderWithProviders(<Register />)

        expect(screen.getByText(t('auth.register.title'))).toBeInTheDocument()
    })

    it('should display first name and last name fields', () => {
        renderWithProviders(<Register />)

        expect(screen.getByLabelText(t('auth.register.firstName'))).toBeInTheDocument()
        expect(screen.getByLabelText(t('auth.register.lastName'))).toBeInTheDocument()
    })

    it('should display username field', () => {
        renderWithProviders(<Register />)

        expect(screen.getByLabelText(t('auth.register.username'))).toBeInTheDocument()
    })

    it('should display email input field', () => {
        renderWithProviders(<Register />)

        expect(screen.getByLabelText(t('auth.register.email'))).toBeInTheDocument()
    })

    it('should display password input fields', () => {
        renderWithProviders(<Register />)

        expect(screen.getByLabelText(t('auth.register.password'))).toBeInTheDocument()
        expect(screen.getByLabelText(t('auth.register.confirmPassword'))).toBeInTheDocument()
    })

    it('should display submit button', () => {
        renderWithProviders(<Register />)

        expect(screen.getByRole('button', { name: t('auth.register.submit') })).toBeInTheDocument()
    })

    it('should display link to login page', () => {
        renderWithProviders(<Register />)

        expect(screen.getByText(t('auth.register.login'))).toBeInTheDocument()
    })

    it('should display link to home page', () => {
        renderWithProviders(<Register />)

        expect(screen.getByText(t('auth.back_home'))).toBeInTheDocument()
    })
})
