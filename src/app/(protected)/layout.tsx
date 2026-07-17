'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useLayoutStore } from '@/stores/layoutStore'
import Sidebar from '@/components/layout/Sidebar'

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

    if (!hasHydrated || !isAuth) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-bg-0">
                <p className="font-body-16m text-text-secondary">
                    {!hasHydrated ? '로그인 상태를 확인하고 있습니다...' : '로그인이 필요합니다.'}
                </p>
            </div>
        )
    }

    return (
        <div className="flex h-screen w-full bg-bg-0">
            <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />

            <div className="relative flex-1 flex flex-col min-w-0 ">{children}</div>
        </div>
    )
}
