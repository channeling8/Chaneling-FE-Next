import api from '@/lib/axios'
import { clearAuthSession } from '@/lib/auth-session'

/**
 * Google 로그인 시작
 * 백엔드의 Google OAuth 엔드포인트로 직접 리다이렉트
 * 로그인 완료 후 백엔드가 /auth/callback?token=...&message=Success&channelId=...&isNew=... 로 넘겨줌
 */
export const redirectToGoogleLogin = () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    if (!apiBaseUrl) {
        throw new Error('NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되지 않았습니다.')
    }

    window.location.assign(new URL('/members/login/google', apiBaseUrl).toString())
}

export async function requestLogout() {
    await api.post('/auth/logout')
}

export async function requestWithdrawal() {
    await api.delete('/members/withdraw')
}

export { clearAuthSession }
