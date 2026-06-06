import i18n from "@/i18n/i18n";
import { renderWithProviders } from "@/test/renderWithProviders";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UpdateProfileForm } from "@/components/settings/profile/UpdateProfileForm";
import { randomUUID } from "crypto";

vi.mock('@/services/profileService', () => ({
    profileService: {
        updateProfile: vi.fn(),
    },
}));

vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        fetchUser: vi.fn().mockResolvedValue(undefined),
    }),
}));

const t = (key: string) => i18n.t(key);

const mockUserData = {
    id: randomUUID(),
    accountId: randomUUID(),
    email: 'satoru@gmail.com',
    username: 'satoru_gojo',
    bio: 'I am the strongest exorcist.',
    countryCode: 'JP',
    timezone: 'Asia/Tokyo',
    isPublic: true,
    hasCompletedOnboarding: true,
    isAccountPrivate: false,
};


describe('UpdateProfileForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockOnSuccess = vi.fn();

    it('should render the form with user data', () => {
        renderWithProviders(<UpdateProfileForm data={mockUserData} onSuccess={mockOnSuccess} />)
        expect(screen.getByLabelText(t('profile.username'))).toHaveValue(mockUserData.username);
        expect(screen.getByLabelText(t('profile.countryCode'))).toHaveValue(mockUserData.countryCode);
        expect(screen.getByLabelText(t('profile.timezone'))).toHaveValue(mockUserData.timezone);
        expect(screen.getByRole('button', { name: t('profile.updateButton') })).toBeInTheDocument();
    });


    it('should call onSuccess after successful profile update', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UpdateProfileForm data={mockUserData} onSuccess={mockOnSuccess} />)
        await user.click(screen.getByRole('button', { name: t('profile.updateButton') }));
        await waitFor(() => {
            expect(mockOnSuccess).toHaveBeenCalled();
        });
    });

    it('should show validation error when username is empty', async () => {
        const user = userEvent.setup();
        renderWithProviders(<UpdateProfileForm data={{ ...mockUserData, username: '' }} onSuccess={mockOnSuccess} />);

        await user.click(screen.getByRole('button', { name: t('profile.updateButton') }));

        await waitFor(() => {
            expect(screen.getByText(t('settings.profile.usernameTooShort'))).toBeInTheDocument();
        });
    });

    
});

