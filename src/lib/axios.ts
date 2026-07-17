import axios from 'axios'
import { clearAuthSession } from '@/lib/auth-session'
import { authStorage } from '@/lib/auth-storage'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 요청 인터셉터: localStorage의 accessToken을 Authorization 헤더에 자동 첨부
api.interceptors.request.use((config) => {
    const token = authStorage.getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// 응답 인터셉터: 401 공통 처리
// 인증 만료 시 랜딩 페이지로 리다이렉트
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearAuthSession()

            if (typeof window !== 'undefined' && window.location.pathname !== '/') {
                window.location.replace('/')
            }
        }
        return Promise.reject(error)
    }
)

export default api
