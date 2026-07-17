'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { clearAuthSession, requestLogout } from '@/api/auth'

export function useLogout() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const logout = useCallback(async () => {
        if (isLoggingOut) return
        setIsLoggingOut(true)

        try {
            await requestLogout()
        } catch (error) {
            console.error('로그아웃 API 호출 실패:', error)
        } finally {
            clearAuthSession()
            queryClient.clear()
            router.replace('/')
            router.refresh()
            setIsLoggingOut(false)
        }
    }, [isLoggingOut, queryClient, router])

    return { isLoggingOut, logout }
}
