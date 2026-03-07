import {  beforeEach, describe, expect, it, vi } from "vitest";
import i18n from "../../../i18n/i18n";
import { renderWithProviders } from "../../../test/renderWithProviders";
import { RegisterForm } from "../RegisterForm";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const t = (key: string) => i18n.t(key);

describe('RegisterForm', () => {
    const mockOnSubmit = vi.fn();
    const defaultProps = {onSubmit: mockOnSubmit, isLoading: false};

    beforeEach(() => {
        mockOnSubmit.mockReset();
    })

    it('should render the form correctly', () => {
        renderWithProviders(<RegisterForm {...defaultProps} />)
        expect(screen.getByLabelText(t('auth.register.firstName'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('auth.register.lastName'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('auth.register.username'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('auth.register.email'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('auth.register.password'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('auth.register.confirmPassword'))).toBeInTheDocument();
        expect(screen.getByRole('button', { name: t('auth.register.submit') })).toBeInTheDocument();
    })

    it('should disable input when loading', () => {
        renderWithProviders(<RegisterForm {...defaultProps} isLoading={true} />)
        expect(screen.getByLabelText(t('auth.register.firstName'))).toBeDisabled();
        expect(screen.getByLabelText(t('auth.register.lastName'))).toBeDisabled();
        expect(screen.getByLabelText(t('auth.register.username'))).toBeDisabled();
        expect(screen.getByLabelText(t('auth.register.email'))).toBeDisabled();
        expect(screen.getByLabelText(t('auth.register.password'))).toBeDisabled();
        expect(screen.getByLabelText(t('auth.register.confirmPassword'))).toBeDisabled();
        expect(screen.getByRole('button', { name: t('auth.register.submit') })).toBeDisabled();
    })

    it ('should call onSubmit with form data', async () => {
        const user = userEvent.setup();
        mockOnSubmit.mockResolvedValue(undefined);
        renderWithProviders(<RegisterForm {...defaultProps} />)
        const firstNameInput = screen.getByLabelText(t('auth.register.firstName'));
        const lastNameInput = screen.getByLabelText(t('auth.register.lastName'));
        const usernameInput = screen.getByLabelText(t('auth.register.username'));
        const emailInput = screen.getByLabelText(t('auth.register.email'));
        const passwordInput = screen.getByLabelText(t('auth.register.password'));
        const confirmPasswordInput = screen.getByLabelText(t('auth.register.confirmPassword'));
        const submitButton = screen.getByRole('button', { name: t('auth.register.submit') });
        
        await user.type(firstNameInput, 'Satoru');
        await user.type(lastNameInput, 'Gojo');
        await user.type(usernameInput, 'Gojo‑sensei');
        await user.type(emailInput, 'gojoSatoru@gmail.com');
        await user.type(passwordInput, 'Hakaishin91@');
        await user.type(confirmPasswordInput, 'Hakaishin91@');
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                firstName: 'Satoru',
                lastName: 'Gojo',
                username: 'Gojo‑sensei',
                email: 'gojoSatoru@gmail.com',
                password: 'Hakaishin91@'
            })
        })
    })

    it.each([
        { name: 'email required', error: 'validation.email.required' },
        { name: 'firstName required', error: 'validation.firstName.required' },
        { name: 'lastName required', error: 'validation.lastName.required' },
    ])('should show $name error on empty submit', async ({ error }) => {
        const user = userEvent.setup()
        renderWithProviders(<RegisterForm {...defaultProps} />)

        await user.click(screen.getByRole('button', { name: t('auth.register.submit') }))

        await waitFor(() => {
            expect(screen.getByText(t(error))).toBeInTheDocument()
        })
    })

    it.each([
        { name: 'invalid email', field: 'auth.register.email', value: 'test7@', error: 'validation.email.invalid' },
        { name: 'password too short', field: 'auth.register.password', value: 'Short1!', error: 'validation.password.min' },
        { name: 'password pattern', field: 'auth.register.password', value: 'itadorisukuna', error: 'validation.password.pattern' },
        { name: 'username too short', field: 'auth.register.username', value: 'ab', error: 'validation.username.min' },
    ])('should show $name error', async ({ field, value, error }) => {
        const user = userEvent.setup()
        renderWithProviders(<RegisterForm {...defaultProps} />)

        await user.type(screen.getByLabelText(t(field)), value)
        await user.click(screen.getByRole('button', { name: t('auth.register.submit') }))

        await waitFor(() => {
            expect(screen.getByText(t(error))).toBeInTheDocument()
        })
    })

    it('should show passwords do not match error', async () => {
        const user = userEvent.setup()
        renderWithProviders(<RegisterForm {...defaultProps} />)

        await user.type(screen.getByLabelText(t('auth.register.password')), 'MyPassword1!')
        await user.type(screen.getByLabelText(t('auth.register.confirmPassword')), 'DifferentPass1!')
        await user.click(screen.getByRole('button', { name: t('auth.register.submit') }))

        await waitFor(() => {
            expect(screen.getByText(t('validation.confirmPassword.match'))).toBeInTheDocument()
        })
    })
})