'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { clearAuthSession, requestWithdrawal } from '@/api/auth'

export function useWithdraw() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isWithdrawing, setIsWithdrawing] = useState(false)

    const withdraw = useCallback(async () => {
        if (isWithdrawing) return

        setIsWithdrawing(true)

        try {
            await requestWithdrawal()
            clearAuthSession()
            queryClient.clear()
            router.replace('/')
            router.refresh()
        } catch (error) {
            console.error('회원 탈퇴 API 호출 실패:', error)
            throw error
        } finally {
            setIsWithdrawing(false)
        }
    }, [isWithdrawing, queryClient, router])

    return { isWithdrawing, withdraw }
}
