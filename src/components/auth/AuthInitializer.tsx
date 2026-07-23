'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { getMember } from '@/api/member'
import { clearAuthSession } from '@/lib/auth-session'
import { authStorage } from '@/lib/auth-storage'
import { useAuthStore } from '@/stores/authStore'

export default function AuthInitializer() {
    const pathname = usePathname()
    const hasHydrated = useAuthStore((state) => state.hasHydrated)
    const isAuth = useAuthStore((state) => state.isAuth)
    const channelId = useAuthStore((state) => state.user?.channelId)
    const setUser = useAuthStore((state) => state.setUser)
    const lastValidatedToken = useRef<string | null>(null)

    useEffect(() => {
        if (!hasHydrated || pathname === '/auth/callback') return

        const accessToken = authStorage.getAccessToken()

        if (!accessToken && !isAuth && !channelId) {
            lastValidatedToken.current = null
            return
        }

        if (!accessToken || !isAuth || !channelId) {
            lastValidatedToken.current = null
            clearAuthSession()
            return
        }

        if (lastValidatedToken.current === accessToken) return

        let isCancelled = false

        const validateSession = async () => {
            try {
                const member = await getMember(channelId)
                if (!isCancelled) {
                    lastValidatedToken.current = accessToken
                    setUser(member)
                }
            } catch {
                if (!isCancelled) {
                    lastValidatedToken.current = null
                    clearAuthSession()
                }
            }
        }

        void validateSession()

        return () => {
            isCancelled = true
        }
    }, [channelId, hasHydrated, isAuth, pathname, setUser])

    return null
}
