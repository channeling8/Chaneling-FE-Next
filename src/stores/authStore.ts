import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
    user: User | null
    isAuth: boolean
    hasHydrated: boolean
    setUser: (user: User) => void
    clearUser: () => void
    setHasHydrated: (hasHydrated: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuth: false,
            hasHydrated: false,
            setUser: (user) => set({ user, isAuth: true }),
            clearUser: () => set({ user: null, isAuth: false }),
            setHasHydrated: (hasHydrated) => set({ hasHydrated }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuth: state.isAuth,
            }),
            skipHydration: true,
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        }
    )
)
