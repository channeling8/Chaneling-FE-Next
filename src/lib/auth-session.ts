import { authStorage } from '@/lib/auth-storage'
import { useAuthStore } from '@/stores/authStore'
import { useIdeasStore } from '@/stores/ideasStore'
import { useReportGenerationStore } from '@/stores/reportGenerationStore'

export function clearAuthSession() {
    authStorage.clear()
    useAuthStore.getState().clearUser()
    useIdeasStore.getState().clearGeneratedIdeas()
    useReportGenerationStore.getState().clearReports()
    void useAuthStore.persist.clearStorage()
    void useReportGenerationStore.persist.clearStorage()
}
