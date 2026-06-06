import i18n from "@/i18n/i18n";
import { renderWithProviders } from "@/test/renderWithProviders";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";
import userEvent from "@testing-library/user-event";



const t = (key: string) => i18n.t(key);

describe('ForgotPasswordForm', () => {
    const mockOnSubmit = vi.fn();
    const defaultProps = {onSubmit: mockOnSubmit, isLoading: false};

    beforeEach(() => {
        mockOnSubmit.mockReset();
    })

    it('should render the form correctly', () => {
        renderWithProviders(<ForgotPasswordForm {...defaultProps} />)
        expect(screen.getByLabelText(t('auth.forgot_password.email'))).toBeInTheDocument();
        expect(screen.getByRole('button', { name: t('auth.forgot_password.submit') })).toBeInTheDocument();
    })

    it('should disable input when loading', () => {
        renderWithProviders(<ForgotPasswordForm {...defaultProps} isLoading={true} />)
        expect(screen.getByLabelText(t('auth.forgot_password.email'))).toBeDisabled();
        expect(screen.getByRole('button', { name: t('auth.forgot_password.submit') })).toBeDisabled();
    })

    it('should call onSubmit with form data', async () => {
        const user = userEvent.setup();
        mockOnSubmit.mockResolvedValue(undefined);
        renderWithProviders(<ForgotPasswordForm {...defaultProps} />)
        const emailInput = screen.getByLabelText(t('auth.forgot_password.email'));
        await user.type(emailInput, 'hakai@gmail.com');
        const submitButton = screen.getByRole('button', { name: t('auth.forgot_password.submit') });
        await user.click(submitButton);
        expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({ email: 'hakai@gmail.com' }), expect.anything());
    })
    
    it('should show validation error for empty', async () => {
        const user = userEvent.setup();
        renderWithProviders(<ForgotPasswordForm {...defaultProps} />)
        const submitButton = screen.getByRole('button', { name: t('auth.forgot_password.submit') });
        await user.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(t('validation.email.required'))).toBeInTheDocument();
        });
    })

    it('should show validation error for invalid email', async () => {
        const user = userEvent.setup();
        renderWithProviders(<ForgotPasswordForm {...defaultProps} />)
        const emailInput = screen.getByLabelText(t('auth.forgot_password.email'));
        await user.type(emailInput, 'invalid-email');
        const form = screen.getByRole('button', { name: t('auth.forgot_password.submit') }).closest('form')!;
        fireEvent.submit(form);
        await waitFor(() => {
            expect(screen.getByText(t('validation.email.invalid'))).toBeInTheDocument();
        });
    })
    
})

