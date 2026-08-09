'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import AuthInitializer from '@/components/auth/AuthInitializer'
import { useAuthStore } from '@/stores/authStore'

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        useAuthStore.persist.rehydrate()
    }, [])

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // 5분
                        retry: 1,
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <AuthInitializer />
            {children}
            {/* 개발 시에만 쓴다면 주석 해제하여 사용. 지금은 거슬리므로 끔. */}
            {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />} */}
        </QueryClientProvider>
    )
}
