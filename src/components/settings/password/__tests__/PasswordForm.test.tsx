import i18n from "@/i18n/i18n";
import { renderWithProviders } from "@/test/renderWithProviders";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordForm } from "@/components/settings/password/PasswordForm";


vi.mock('@/services/profileService', () => ({
    profileService: {
        changePassword: vi.fn(),
    },
}));

const t = (key: string) => i18n.t(key);

describe('PasswordForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the form correctly', () => {
        renderWithProviders(<PasswordForm  />)
        expect(screen.getByLabelText(t('profile.password.current'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('profile.password.new'))).toBeInTheDocument();
        expect(screen.getByLabelText(t('profile.password.confirm'))).toBeInTheDocument();
        expect(screen.getByRole('button', { name: t('profile.password.change') })).toBeInTheDocument();
    });

    it('should show success message after successful password change', async () => {
        const {profileService} = await import('@/services/profileService');
        (profileService.changePassword as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
        const user = userEvent.setup();
        renderWithProviders(<PasswordForm  />)
        await user.type(screen.getByLabelText(t('profile.password.current')), 'SatoruGojo123!');
        await user.type(screen.getByLabelText(t('profile.password.new')), 'SukunaKing12!');
        await user.type(screen.getByLabelText(t('profile.password.confirm')), 'SukunaKing12!');
        await user.click(screen.getByRole('button', { name: t('profile.password.change') }));
        await waitFor(() => {
            expect(screen.getByText(t('profile.password.successMessage'))).toBeInTheDocument();
        });
    });

    it('should show error message after failed password change', async () => {
        const {profileService} = await import('@/services/profileService');
        const axiosError = { isAxiosError: true, response: { status: 500 } };

        (profileService.changePassword as ReturnType<typeof vi.fn>).mockRejectedValue(axiosError);
        const user = userEvent.setup();
        renderWithProviders(<PasswordForm  />)
        await user.type(screen.getByLabelText(t('profile.password.current')), 'SatoruGojo123!');
        await user.type(screen.getByLabelText(t('profile.password.new')), 'SukunaKing12!');
        await user.type(screen.getByLabelText(t('profile.password.confirm')), 'SukunaKing12!');
        await user.click(screen.getByRole('button', { name: t('profile.password.change') }));
        await waitFor(() => {
            expect(screen.getByText(t('profile.password.error.generic'))).toBeInTheDocument();
        });
    });

});