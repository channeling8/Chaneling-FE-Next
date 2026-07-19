'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useLayoutStore } from '@/stores/layoutStore'
import Sidebar from '@/components/layout/Sidebar'
import SidebarSkeleton from '@/components/layout/SidebarSkeleton'
import DashboardLoadingView from '@/components/dashboard/DashboardLoadingView'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const hasHydrated = useAuthStore((state) => state.hasHydrated)
    const isAuth = useAuthStore((state) => state.isAuth)

    const { isMobileSidebarOpen, closeSidebar } = useLayoutStore()

    useEffect(() => {
        if (hasHydrated && !isAuth) {
            router.replace('/')
        }
    }, [hasHydrated, isAuth, router])

    if (!hasHydrated) {
        return (
            <div className="flex h-screen w-full bg-bg-0">
                <SidebarSkeleton />
                <div className="min-w-0 flex-1">
                    <DashboardLoadingView />
                </div>
            </div>
        )
    }
    if (!isAuth) return <div className="h-screen w-full bg-bg-0" />

    return (
        <div className="flex h-screen w-full bg-bg-0">
            <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />

            <div className="relative flex-1 flex flex-col min-w-0 ">{children}</div>
        </div>
    )
}
