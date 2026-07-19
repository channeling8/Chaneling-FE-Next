'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { clearAuthSession } from '@/api/auth'
import { getMember } from '@/api/member'
import { authStorage } from '@/lib/auth-storage'
import { useAuthStore } from '@/stores/authStore'

/**
 * Google OAuth 콜백 페이지 (/auth/callback)
 *
 * 백엔드가 로그인 완료 후 이 페이지로 리다이렉트하며
 * 쿼리스트링으로 다음 값을 전달합니다:
 *   ?message=Success&token=JWT토큰&channelId=채널ID&isNew=true/false
 */
export default function AuthCallbackPage() {
    const router = useRouter()
    const setUser = useAuthStore((state) => state.setUser)
    const hasRun = useRef(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        // React StrictMode 이중 실행 방지
        if (hasRun.current) return
        hasRun.current = true

        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const message = urlParams.get('message')
            const accessToken = urlParams.get('token')
            const channelId = urlParams.get('channelId')
            const isNew = urlParams.get('isNew') === 'true'
            const parsedChannelId = Number(channelId)

            // access token이 브라우저 주소, history, referrer에 오래 남지 않도록 즉시 제거
            window.history.replaceState(null, '', window.location.pathname)

            if (
                message !== 'Success'
                || !accessToken
                || !channelId
                || !Number.isFinite(parsedChannelId)
                || parsedChannelId <= 0
            ) {
                clearAuthSession()
                setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.')
                return
            }

            authStorage.setAccessToken(accessToken)

            try {
                const member = await getMember(parsedChannelId)
                setUser(member)
                router.replace(isNew ? '/onboarding' : '/dashboard')
            } catch {
                clearAuthSession()
                setErrorMessage('회원 정보를 불러오지 못했습니다. 다시 로그인해주세요.')
            }
        }

        void handleCallback()
    }, [router, setUser])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <p className="font-body-16m text-text-primary">
                {errorMessage || '로그인 처리 중...'}
            </p>
            {errorMessage && (
                <button
                    type="button"
                    onClick={() => router.replace('/')}
                    className="rounded-[20px] bg-primary-60 px-4 py-2 font-body-14m text-text-primary hover:bg-primary-70"
                >
                    처음으로 돌아가기
                </button>
            )}
        </div>
    )
}
