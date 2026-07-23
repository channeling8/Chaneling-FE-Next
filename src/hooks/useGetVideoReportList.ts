'use client'

import { useEffect, useState } from 'react'

import { VideoReportListRequest, VideoReportListResponse } from '@/types/videos'

import { getVideoReportList } from '@/api/video'
import { useQuery } from '@tanstack/react-query'

export const videoReportListQueryKey = {
    all: ['video-report-list'] as const,
    byVideo: (videoId: number) => ['video-report-list', videoId] as const,
    list: (videoId: number, page: number, size: number) => ['video-report-list', videoId, page, size] as const,
}

export function useGetVideoReportList({ videoId, page, size }: VideoReportListRequest) {
    return useQuery({
        queryKey: videoId == null ? videoReportListQueryKey.all : videoReportListQueryKey.list(videoId, page, size),

        queryFn: () => {
            if (videoId == null) {
                throw new Error('videoId가 없습니다.')
            }

            return getVideoReportList({
                videoId,
                page,
                size,
            })
        },

        enabled: videoId != null,
    })
}
