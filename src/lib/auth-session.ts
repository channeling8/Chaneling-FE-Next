import { authStorage } from '@/lib/auth-storage'
import { useAuthStore } from '@/stores/authStore'
import { useIdeasStore } from '@/stores/ideasStore'

export function clearAuthSession() {
    authStorage.clear()
    useAuthStore.getState().clearUser()
    useIdeasStore.getState().clearGeneratedIdeas()
    void useAuthStore.persist.clearStorage()
}
