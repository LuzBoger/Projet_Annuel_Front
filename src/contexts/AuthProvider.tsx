import { useCallback, useEffect, useMemo, useState } from "react";
import type { AuthContextType, AuthState } from "@/types/auth/context";
import { authService } from "@/services/authService";
import { AuthContext } from "@/contexts/AuthContext";
import { userLanguageService } from "@/services/userLanguage";
import i18n from "@/i18n/i18n";

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
            if (userInfo && userInfo.id) {
                setState({
                    user: userInfo,
                    isAuthenticated: true,
                    isLoading: false,
                    required2FA: false,
                    tempUserId: null,
                });

                if (!localStorage.getItem("language")) {
                    userLanguageService.getUserNativeLanguages()
                        .then((nativeLanguages) => {
                            if (nativeLanguages && nativeLanguages.length > 0) {
                                const firstNativeLanguage = nativeLanguages[0];
                                i18n.changeLanguage(firstNativeLanguage.languageCode);
                                localStorage.setItem("language", firstNativeLanguage.languageCode);
                                localStorage.setItem("locale", firstNativeLanguage.languageCode);
                            }
                        })
                        .catch(() => {});
                }
            } else {
                setState({ ...initialAuthState, isLoading: false });
            }
        } catch {
            setState({ ...initialAuthState, isLoading: false });
        }
    }, []);

    useEffect(() => {
        let ignore = false;
        authService.getCurrentUser().then((userInfo) => {
            if (!ignore) {
                if (userInfo && userInfo.id) {
                    setState({
                        user: userInfo,
                        isAuthenticated: true,
                        isLoading: false,
                        required2FA: false,
                        tempUserId: null,
                    });

                    if (!localStorage.getItem("language")) {
                        userLanguageService.getUserNativeLanguages()
                            .then((nativeLanguages) => {
                                if (nativeLanguages && nativeLanguages.length > 0) {
                                    const firstNativeLanguage = nativeLanguages[0];
                                    i18n.changeLanguage(firstNativeLanguage.languageCode);
                                    localStorage.setItem("language", firstNativeLanguage.languageCode);
                                    localStorage.setItem("locale", firstNativeLanguage.languageCode);
                                }
                            })
                            .catch(() => {});
                    }
                } else {
                    setState({ ...initialAuthState, isLoading: false });
                }
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
