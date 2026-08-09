'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteReport } from '@/api/video'
import { VideoReportListResponse } from '@/types/videos'
import { videoReportListQueryKey } from '@/hooks/useGetVideoReportList'

interface UseDeleteReportParams {
    videoId: number | null
    page: number
    size: number
}

export function useDeleteReport({ videoId, page, size }: UseDeleteReportParams) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (reportId: number) => deleteReport(reportId),

        onMutate: async (reportId) => {
            if (videoId == null) return

            const queryKey = videoReportListQueryKey.list(videoId, page, size)

            await queryClient.cancelQueries({ queryKey })

            const previousData = queryClient.getQueryData<VideoReportListResponse>(queryKey)

            queryClient.setQueryData<VideoReportListResponse>(queryKey, (oldData) => {
                if (!oldData) return oldData

                return {
                    ...oldData,
                    totalReportCount: Math.max(oldData.totalReportCount - 1, 0),
                    reportList: oldData.reportList.filter((report) => report.reportId !== reportId),
                }
            })

            return {
                previousData,
                queryKey,
            }
        },

        onError: (_error, _reportId, context) => {
            if (!context?.previousData || !context.queryKey) return

            queryClient.setQueryData(context.queryKey, context.previousData)
        },

        onSettled: (_data, _error, _reportId, context) => {
            if (!context?.queryKey) return

            queryClient.invalidateQueries({
                queryKey: context.queryKey,
            })
        },
    })
}
