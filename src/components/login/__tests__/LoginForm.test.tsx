import {  beforeEach, describe, expect, it, vi } from "vitest";
import i18n from "@/i18n/i18n";
import { renderWithProviders } from "@/test/renderWithProviders";
import { LoginForm } from "@/components/login/LoginForm";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const t = (key: string) => i18n.t(key);

describe('LoginForm', () => {
    const mockOnSubmit = vi.fn();
    const defaultProps = {onSubmit: mockOnSubmit, isLoading: false};

    beforeEach(() => {
        mockOnSubmit.mockReset();
    })

    it('should render the form correctly', () => {
        renderWithProviders(<LoginForm {...defaultProps} />)
        expect(screen.getByLabelText(t('auth.login.email'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('auth.login.password'))).toBeInTheDocument();
        const linkRendered = screen.getByText(t('auth.login.forgot_password'));
        expect(linkRendered).toBeInTheDocument();
        expect(linkRendered).toHaveAttribute('href', '/forgot-password');       
        expect(screen.getByRole('button', { name: t('auth.login.submit') })).toBeInTheDocument();
    })

    it('should disable input when loading', () => {
        renderWithProviders(<LoginForm {...defaultProps} isLoading={true} />)
        expect(screen.getByLabelText(t('auth.login.email'))).toBeDisabled();
        expect(screen.getByLabelText(t('auth.login.password'))).toBeDisabled();
        expect(screen.getByRole('button', { name: t('auth.login.submit') })).toBeDisabled();
    })

    it ('should call onSubmit with form data', async () => {
        const user = userEvent.setup();
        mockOnSubmit.mockResolvedValue(undefined);
        renderWithProviders(<LoginForm {...defaultProps} />)
        const emailInput = screen.getByLabelText(t('auth.login.email'));
        const passwordInput = screen.getByLabelText(t('auth.login.password'));
        const submitButton = screen.getByRole('button', { name: t('auth.login.submit') });

        await user.type(emailInput, 'gojoSatoru@gmail.com');
        await user.type(passwordInput, 'Hakaishin91@');
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                email: 'gojoSatoru@gmail.com',
                password: 'Hakaishin91@'
            },
            expect.anything())
        })
    })

    it('should show validation errors', async () => {
        const user = userEvent.setup();
        renderWithProviders(<LoginForm {...defaultProps} />)
        const submitButton = screen.getByRole('button', { name: t('auth.login.submit') });
        await user.click(submitButton); 
        await waitFor(() => {
            expect(screen.getByText(t('validation.email.required'))).toBeInTheDocument();
            expect(screen.getByText(t('validation.password.required'))).toBeInTheDocument();
        })
    
    })



    
})