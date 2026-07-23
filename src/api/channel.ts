import api from '@/lib/axios'
import type { ApiResponse } from '@/types'
import { VideoListRequest, VideoListResponse } from '@/types/channels'
import { ReportListResponse, ReportsListRequest } from '@/types/reports'

interface UpdateChannelTargetResult {
    channelId: number
    updatedTarget: string
}

interface UpdateChannelConceptResult {
    channelId: number
    updatedConcept: string
}

export interface ChannelDetail {
    channelId: number
    target: string | null
    concept: string | null
}

export async function getChannel(channelId: number): Promise<ChannelDetail> {
    const { data } = await api.get<ApiResponse<ChannelDetail>>(`/channels/${channelId}`)
    return data.result
}

export async function updateChannelTarget(channelId: number, target: string): Promise<string> {
    const { data } = await api.patch<ApiResponse<UpdateChannelTargetResult>>(`/channels/${channelId}/targets`, {
        target,
    })
    return data.result.updatedTarget
}

export async function updateChannelConcept(channelId: number, concept: string): Promise<string> {
    const { data } = await api.patch<ApiResponse<UpdateChannelConceptResult>>(`/channels/${channelId}/concepts`, {
        concept,
    })
    return data.result.updatedConcept
}
export async function getChannelVideoList({
    channelId,
    type,
    sort,
    page = 1,
    size = 8,
}: VideoListRequest): Promise<VideoListResponse> {
    const { data } = await api.get<ApiResponse<VideoListResponse>>(`/channels/${channelId}/videos`, {
        params: { type, sort, page, size },
    })
    return { ...data.result, channelId }
}

export async function getChannelReportList({
    channelId,
    type,
    page = 1,
    size = 8,
}: ReportsListRequest): Promise<ReportListResponse> {
    const { data } = await api.get<ApiResponse<ReportListResponse>>(`/channels/${channelId}/reports`, {
        params: { type, page, size },
    })
    return { ...data.result, channelId }
}
