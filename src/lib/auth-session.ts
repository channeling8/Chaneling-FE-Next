import { authStorage } from '@/lib/auth-storage'
import { useAuthStore } from '@/stores/authStore'

export function clearAuthSession() {
    authStorage.clear()
    useAuthStore.getState().clearUser()
    void useAuthStore.persist.clearStorage()
}
