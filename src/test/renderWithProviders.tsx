import { render, type RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import type { AuthContextType } from '../types/auth/context'
import type { ReactElement } from 'react'

const defaultAuthContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    required2FA: false,
    tempUserId: null,
    fetchUser: async () => {},
    setState: () => {},
}

export function renderWithProviders(
    ui: ReactElement,
    {
        authContext = defaultAuthContext,
        ...renderOptions
    }: RenderOptions & { authContext?: Partial<AuthContextType> } = {}
) {
    const mergedAuth = { ...defaultAuthContext, ...authContext }

    return render(
        <AuthContext.Provider value={mergedAuth}>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </AuthContext.Provider>,
        renderOptions
    )
}
