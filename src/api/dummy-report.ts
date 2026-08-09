import api from '@/lib/axios'
import type { ApiResponse } from '@/types'
import type { ReportAnalysis, ReportOverview } from '@/api/report'
import type { VideoInfoResponse } from '@/types/videos'

export type DummyReportSection = 'VIDEO' | 'OVERVIEW' | 'ANALYSIS' | 'COMMENTS'
export type DummyReportCommentType = 'NEUTRAL' | 'POSITIVE' | 'NEGATIVE' | 'ADVICE_OPINION'

interface GenerateDummyReportParams {
    section: DummyReportSection
    url: string
    commentType?: DummyReportCommentType
}

export interface DummyReportVideoInfo extends Omit<VideoInfoResponse, 'videoId'> {
    videoId: number | null
}

export type DummyReportOverview = ReportOverview

export interface DummyReportData {
    video: DummyReportVideoInfo
    overview: DummyReportOverview
    analysis: ReportAnalysis
}

export async function generateDummyReport<T = unknown>({
    section,
    url,
    commentType,
}: GenerateDummyReportParams): Promise<T> {
    const { data } = await api.post<ApiResponse<T>>(
        `/dummy-reports/${section}`,
        { url },
        {
            params: commentType ? { type: commentType } : undefined,
        }
    )

    if (!data.isSuccess) {
        throw new Error(data.message || '체험 리포트를 생성하지 못했습니다.')
    }

    return data.result
}

function normalizeAnalysisField(value: unknown) {
    if (value == null) return ''
    if (typeof value === 'string') return value

    try {
        return JSON.stringify(value) ?? ''
    } catch {
        return ''
    }
}

function getYoutubeVideoId(url: string) {
    try {
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname.replace(/^www\./, '')
        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)
        const isYoutubeHost = hostname === 'youtube.com' || hostname.endsWith('.youtube.com')
        const isYoutubeNoCookieHost =
            hostname === 'youtube-nocookie.com' || hostname.endsWith('.youtube-nocookie.com')

        let candidate = ''

        if (hostname === 'youtu.be') {
            candidate = pathSegments[0] ?? ''
        } else if (isYoutubeHost || isYoutubeNoCookieHost) {
            candidate = parsedUrl.searchParams.get('v') ?? ''

            if (!candidate && ['shorts', 'embed', 'live'].includes(pathSegments[0] ?? '')) {
                candidate = pathSegments[1] ?? ''
            }
        }

        return /^[A-Za-z0-9_-]{11}$/.test(candidate) ? candidate : ''
    } catch {
        return ''
    }
}

export async function generateDummyReportData(url: string): Promise<DummyReportData> {
    const video = await generateDummyReport<DummyReportVideoInfo>({
        section: 'VIDEO',
        url,
    })
    const youtubeVideoId = video.youtubeVideoId || getYoutubeVideoId(url)
    const [overview, rawAnalysis] = await Promise.all([
        generateDummyReport<DummyReportOverview>({ section: 'OVERVIEW', url }),
        generateDummyReport<{
            reportId: number | null
            retentionGraph: unknown
            viewerRetentionAnalysis: unknown
            algorithmOptimization: unknown
        }>({ section: 'ANALYSIS', url }),
    ])

    return {
        video: { ...video, youtubeVideoId },
        overview,
        analysis: {
            reportId: rawAnalysis.reportId ?? 0,
            retentionGraph: normalizeAnalysisField(rawAnalysis.retentionGraph),
            viewerRetentionAnalysis: normalizeAnalysisField(rawAnalysis.viewerRetentionAnalysis),
            algorithmOptimization: normalizeAnalysisField(rawAnalysis.algorithmOptimization),
        },
    }
}
