'use client'

import { useEffect, useState } from 'react'
import { getChannelReportList } from '@/api/channel'
import { useAuthStore } from '@/stores/authStore'
import { ReportListResponse } from '@/types/reports'

export function useGetChannelReportList({
    type,
    page = 1,
    size = 8,
}: {
    type: 'ALL' | 'LONG' | 'SHORTS'
    sort?: 'LATEST' | 'POPULAR' | 'DATE'
    page?: number
    size?: number
}) {
    const channelId = useAuthStore((state) => state.user?.channelId)
    const hasHydrated = useAuthStore((state) => state.hasHydrated)

    const [data, setData] = useState<ReportListResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        if (!hasHydrated) return
        if (channelId == null) return

        const currentChannelId = channelId

        async function fetchVideos() {
            try {
                setIsLoading(true)
                setError(null)

                const result = await getChannelReportList({
                    channelId: currentChannelId,
                    type,
                    page,
                    size,
                })

                setData(result)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        void fetchVideos()
    }, [hasHydrated, channelId, type, page, size])

    return {
        data,
        isLoading,
        error,
    }
}
