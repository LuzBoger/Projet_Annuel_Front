import { useCallback, useEffect, useMemo, useState } from "react";
import type { AuthContextType, AuthState } from "@/types/auth/context";
import { authService } from "@/services/authService";
import { AuthContext } from "@/contexts/AuthContext";

const initialAuthState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    required2FA: false,
    tempUserId: null,
};

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [state, setState] = useState<AuthState>(initialAuthState);

    const fetchUser = useCallback(async () => {
        try {
            const userInfo = await authService.getCurrentUser();
            setState({
                user: userInfo,
                isAuthenticated: true,
                isLoading: false,
                required2FA: false,
                tempUserId: null,
            });
        } catch {
            setState({ ...initialAuthState, isLoading: false });
        }
    }, []);

    useEffect(() => {
        let ignore = false;
        authService.getCurrentUser().then((userInfo) => {
            if (!ignore) {
                setState({
                    user: userInfo,
                    isAuthenticated: true,
                    isLoading: false,
                    required2FA: false,
                    tempUserId: null,
                });
            }
        }).catch(() => {
            if (!ignore) {
                setState({ ...initialAuthState, isLoading: false });
            }
        });
        return () => { ignore = true; };
    }, []);

    const value = useMemo<AuthContextType>(() => ({
        ...state,
        fetchUser,
        setState,
    }), [state, fetchUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}