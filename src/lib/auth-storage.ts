import { LOCAL_STORAGE_KEY } from '@/constants/key'

function getStoredValue<T>(key: string): T | null {
    if (typeof window === 'undefined') return null

    try {
        const raw = window.localStorage.getItem(key)
        return raw ? JSON.parse(raw) as T : null
    } catch {
        return null
    }
}

function setStoredValue(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export const authStorage = {
    getAccessToken: () => getStoredValue<string>(LOCAL_STORAGE_KEY.accessToken),
    setAccessToken: (accessToken: string) => {
        setStoredValue(LOCAL_STORAGE_KEY.accessToken, accessToken)
    },
    clear: () => {
        if (typeof window === 'undefined') return
        window.localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken)
    },
}
