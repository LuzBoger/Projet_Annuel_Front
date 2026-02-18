import { useCallback, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/authService";
import type { LoginRequest } from "../types/auth/login";
import type { RegisterRequest } from "../types/auth/register";

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

    const register = useCallback(async (data: RegisterRequest) => {
        const response = await authService.register(data);
        return response;
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            required2FA: false,
            tempUserId: null,
        });
    }, [setState]);

    const verify2FA = useCallback(async (code: string) => {
        if (!state.tempUserId) return;
        await authService.verify2FA({ tempUserId: state.tempUserId, code });
        setState(prev => ({ ...prev, required2FA: false, tempUserId: null }));
        await fetchUser();
    }, [state.tempUserId, setState, fetchUser]);

    return { ...state, login, register, logout, verify2FA, fetchUser };
}
