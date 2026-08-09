'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useLayoutStore } from '@/stores/layoutStore'
import Sidebar from '@/components/layout/Sidebar'
import SidebarSkeleton from '@/components/layout/SidebarSkeleton'
import GlobalReportProgress from '@/components/report/GlobalReportProgress'
import ProtectedPageLoadingView from '@/components/layout/ProtectedPageLoadingView'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const hasHydrated = useAuthStore((state) => state.hasHydrated)
    const isAuth = useAuthStore((state) => state.isAuth)

    const { isMobileSidebarOpen, closeSidebar } = useLayoutStore()

    useEffect(() => {
        if (hasHydrated && !isAuth) {
            router.replace('/')
        }
    }, [hasHydrated, isAuth, router])

    if (!hasHydrated) {
        const shouldShowSidebar = pathname !== '/onboarding'

        return (
            <div className="flex h-screen w-full bg-bg-0">
                {shouldShowSidebar && <SidebarSkeleton />}
                <div className="min-w-0 flex-1">
                    <ProtectedPageLoadingView pathname={pathname} />
                </div>
            </div>
        )
    }
    if (!isAuth) return <div className="h-screen w-full bg-bg-0" />

    return (
        <div className="flex h-screen w-full bg-bg-0">
            <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />
            <GlobalReportProgress />

            <div className="relative flex-1 flex flex-col min-w-0 ">{children}</div>
        </div>
    )
}
