import type { Account } from "../account";

export interface AuthState {
    user: Account | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    required2FA: boolean;
    tempUserId: string | null;
}

export interface AuthContextType extends AuthState {
    fetchUser: () => Promise<void>;
    setState: React.Dispatch<React.SetStateAction<AuthState>>;
}
