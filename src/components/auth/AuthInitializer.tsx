'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { clearAuthSession } from '@/lib/auth-session'
import { authStorage } from '@/lib/auth-storage'
import { useAuthStore } from '@/stores/authStore'

export default function AuthInitializer() {
    const pathname = usePathname()
    const hasHydrated = useAuthStore((state) => state.hasHydrated)
    const isAuth = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        void useAuthStore.persist.rehydrate()
    }, [])

    useEffect(() => {
        if (!hasHydrated || pathname === '/auth/callback') return

        const accessToken = authStorage.getAccessToken()
        if (!accessToken || !isAuth || !user) {
            clearAuthSession()
        }
    }, [hasHydrated, isAuth, pathname, user])

    return null
}
