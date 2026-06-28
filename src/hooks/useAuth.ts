import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import type { AdminLoginRequest, LoginRequest } from "@/types/auth/login";
import type { RegisterRequest } from "@/types/auth/register";
import type { Enable2FARequest, Enable2FAResponse, Verify2FASetupRequest } from "@/types/auth/twoFactor";

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { setState, fetchUser, ...state } = context;

    const login = useCallback(async (data: LoginRequest) => {
        const response = await authService.login(data);

        if (response.requires2FA) {
            setState(prev => ({
                ...prev,
                required2FA: true,
                tempUserId: response.tempUserId ?? null,
            }));
            return { required2FA: true };
        }

        await fetchUser();
        return { required2FA: false };
    }, [setState, fetchUser]);

    const adminLogin = useCallback(async (data: AdminLoginRequest) => {
        await authService.adminLogin(data);
        await fetchUser();
    }, [fetchUser]);
    
    const register = useCallback(async (data: RegisterRequest) => {
        const response = await authService.register(data);
        return response;
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        sessionStorage.removeItem("dailyModalShown");
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            required2FA: false,
            tempUserId: null,
        });
    }, [setState]);

    const verify2FA = useCallback(async (code: string) => {
        if (!state.tempUserId) {
            throw new Error("No temporary user ID available. Please log in again.");
        }
        await authService.verify2FA({ tempUserId: state.tempUserId, code });
        setState(prev => ({ ...prev, required2FA: false, tempUserId: null }));
        await fetchUser();
    }, [state.tempUserId, setState, fetchUser]);

    const enable2FA = useCallback(async (data: Enable2FARequest): Promise<Enable2FAResponse> => {
        const response = await authService.enable2FA(data);
        return response;
    }, []);

    const verify2FASetup = useCallback(async (data: Verify2FASetupRequest) => {
        await authService.verify2FASetup(data);
        await fetchUser();
    }, [fetchUser]);

    const disable2FA = useCallback(async (code: string) => {
        await authService.disable2FA({ code });
        await fetchUser();
    }, [fetchUser]);

    return { ...state, login, adminLogin, register, logout, verify2FA, enable2FA, verify2FASetup, disable2FA, fetchUser };
}
