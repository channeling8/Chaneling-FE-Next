import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

export type DashboardPeriod = 'WEEK' | 'MONTH'

export type DashboardScoreType =
    | 'CHANNEL_GROWTH'
    | 'ALGORITHM'
    | 'VIEW_ENGAGEMENT'
    | 'REACTION_DENSITY'
    | 'INFLOW_ACTIVITY'
    | 'UPLOAD_CYCLE'

export type DashboardSuggestionType =
    | 'VIDEO_REUSE'
    | 'TREND_KEYWORD'
    | 'COMMENT_ANALYSIS'

export interface DashboardChannelInfo {
    channelName: string
    profileImageUrl: string | null
    subscriberCount: number
    subscriberChange: number
}

export interface DashboardChannelScore {
    scoreType: DashboardScoreType
    score: number | null
    grade: string | null
    scoreChange: number | null
}

export interface DashboardMetadata {
    baseDate: string
    channelInfo: DashboardChannelInfo
    channelScoreList: DashboardChannelScore[]
}

export interface DashboardScorePoint {
    date: string
    score: number | null
}

export interface DashboardScoreGraph {
    scoreType: DashboardScoreType
    currentScore: number | null
    scoreHistory: DashboardScorePoint[]
}

export interface DashboardGraph {
    period: DashboardPeriod
    scoreGraphs: DashboardScoreGraph[]
}

export interface DashboardSuggestion {
    suggestionId: number
    suggestionType: DashboardSuggestionType
    title: string
    description: string
}

export interface DashboardSuggestionList {
    summaryMessage: string | null
    suggestionList: DashboardSuggestion[]
}

export interface DashboardExpectedMetric {
    label: string
    value: string
}

export interface DashboardSuggestionDetail extends DashboardSuggestion {
    expectedMetrics: DashboardExpectedMetric[]
    detailAnalysis: string
    tips: string[]
}

export async function getDashboardMetadata(): Promise<DashboardMetadata> {
    const { data } = await api.get<ApiResponse<DashboardMetadata>>('/dashboards/metadata')
    return data.result
}

export async function getDashboardGraph(period: DashboardPeriod): Promise<DashboardGraph> {
    const { data } = await api.get<ApiResponse<DashboardGraph>>('/dashboards/graph', {
        params: { period },
    })
    return data.result
}

export async function getDashboardSuggestions(): Promise<DashboardSuggestionList> {
    const { data } = await api.get<ApiResponse<DashboardSuggestionList>>('/dashboards/suggestions')
    return data.result
}

export async function getDashboardSuggestionDetail(
    suggestionId: number
): Promise<DashboardSuggestionDetail> {
    const { data } = await api.get<ApiResponse<DashboardSuggestionDetail>>(
        `/dashboards/suggestions/${suggestionId}`
    )
    return data.result
}
