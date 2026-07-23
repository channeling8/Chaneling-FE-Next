'use client'

import { useEffect, useState } from 'react'
import { getChannelVideoList } from '@/api/channel'
import { useAuthStore } from '@/stores/authStore'
import { VideoListResponse } from '@/types/channels'

export function useGetChannelVideoList({
    type,
    sort = 'LATEST',
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

    const [data, setData] = useState<VideoListResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        if (!hasHydrated) return
        if (channelId == null) return

        // 여기서 새 변수에 담아주면 타입이 number로 고정됨
        const currentChannelId = channelId

        async function fetchVideos() {
            try {
                setIsLoading(true)
                setError(null)

                const result = await getChannelVideoList({
                    channelId: currentChannelId,
                    type,
                    sort,
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
