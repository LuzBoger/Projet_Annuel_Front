import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/test/renderWithProviders'
import i18n from '@/i18n/i18n'
import Login from '@/pages/login/Login'

const t = i18n.t.bind(i18n)

describe('Login', () => {
    it('should render login form', () => {
        renderWithProviders(<Login />)

        expect(screen.getByText(t('auth.login.title'))).toBeInTheDocument()
    })

    it('should display email input field', () => {
        renderWithProviders(<Login />)

        expect(screen.getByLabelText(t('auth.login.email'))).toBeInTheDocument()
    })

    it('should display password input field', () => {
        renderWithProviders(<Login />)

        expect(screen.getByLabelText(t('auth.login.password'))).toBeInTheDocument()
    })

    it('should display submit button', () => {
        renderWithProviders(<Login />)

        expect(screen.getByRole('button', { name: t('auth.login.submit') })).toBeInTheDocument()
    })

    it('should display link to register page', () => {
        renderWithProviders(<Login />)

        expect(screen.getByText(t('auth.login.create_account'))).toBeInTheDocument()
    })

    it('should display link to home page', () => {
        renderWithProviders(<Login />)

        expect(screen.getByText(t('auth.back_home'))).toBeInTheDocument()
    })
})
