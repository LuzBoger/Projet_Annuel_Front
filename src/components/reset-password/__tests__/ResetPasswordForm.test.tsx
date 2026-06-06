import i18n from "@/i18n/i18n";
import { renderWithProviders } from "@/test/renderWithProviders";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";

const t = (key: string) => i18n.t(key);

describe('ResetPasswordForm', () => {
    const mockOnSubmit = vi.fn();
    const defaultProps = {onSubmit: mockOnSubmit, isLoading: false};

    beforeEach(() => {
        mockOnSubmit.mockReset();
    });

        it('should render the form correctly', () => {
        renderWithProviders(<ResetPasswordForm {...defaultProps} />)
        expect(screen.getByLabelText(t('auth.reset_password.new_password'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('auth.reset_password.confirm_password'))).toBeInTheDocument();
        expect(screen.getByRole('button', { name: t('auth.reset_password.submit') })).toBeInTheDocument();
    })

    it('should disable input when loading', () => {
        renderWithProviders(<ResetPasswordForm {...defaultProps} isLoading={true} />)
        expect(screen.getByLabelText(t('auth.reset_password.new_password'))).toBeDisabled();
        expect(screen.getByLabelText(t('auth.reset_password.confirm_password'))).toBeDisabled();
        expect(screen.getByRole('button', { name: t('auth.reset_password.submit') })).toBeDisabled();
    })

    it('should call onSubmit with form data', async () => {
        const user = userEvent.setup();
        mockOnSubmit.mockResolvedValue(undefined);
        renderWithProviders(<ResetPasswordForm {...defaultProps} />)
        await user.type(screen.getByLabelText(t('auth.reset_password.new_password')), 'GojoSatoru123!');
        await user.type(screen.getByLabelText(t('auth.reset_password.confirm_password')), 'GojoSatoru123!');
        await user.click(screen.getByRole('button', { name: t('auth.reset_password.submit') }));
        await waitFor(() => {       
        expect(mockOnSubmit).toHaveBeenCalledWith({ newPassword: 'GojoSatoru123!', confirmPassword: 'GojoSatoru123!' });
        });
    })

    it('should show validation error for empty fields', async () => {
        const user = userEvent.setup();
        renderWithProviders(<ResetPasswordForm {...defaultProps} />)
        await user.type(screen.getByLabelText(t('auth.reset_password.new_password')), '');
        await user.type(screen.getByLabelText(t('auth.reset_password.confirm_password')), '');
        await user.click(screen.getByRole('button', { name: t('auth.reset_password.submit') }));
        await waitFor(() => {
            expect(screen.getByText(t('validation.password.required'))).toBeInTheDocument();
            expect(screen.getByText(t('validation.confirmPassword.required'))).toBeInTheDocument();
        });
    })

    it('should show validation error for password mismatch', async () => {
        const user = userEvent.setup();
        renderWithProviders(<ResetPasswordForm {...defaultProps} />)
        await user.type(screen.getByLabelText(t('auth.reset_password.new_password')), 'GojoSatoru123!');
        await user.type(screen.getByLabelText(t('auth.reset_password.confirm_password')), 'Sukuna123!');
        await user.click(screen.getByRole('button', { name: t('auth.reset_password.submit') }));
        await waitFor(() => {
            expect(screen.getByText(t('validation.confirmPassword.match'))).toBeInTheDocument();
        });
    })
})
