'use client'

import type { DummyReportOverview } from '@/api/dummy-report'
import CommentSummarySection from '@/app/(protected)/reports/_components/CommentSummarySection'
import EvaluationCard from '@/app/(protected)/reports/_components/EvaluationCard'
import SummaryComment from '@/app/(protected)/reports/_components/SummaryComment'
import SummaryCard, { type SummaryStatus } from '@/app/(protected)/reports/_components/SummaryCard'
import type { ReportOverviewresponse } from '@/types/reports'
import { formatReportMetric } from '@/utils/format'
import { useState, type ReactNode } from 'react'

interface ReportSummaryItem {
    status: SummaryStatus
    title: string
    details: string
}

interface VideoSummaryItem {
    timestamp: string
    title: string
    description: string
}

const SUMMARY_STATUSES = new Set<SummaryStatus>([
    '최상',
    '조언',
    '우수',
    '긍정',
    '최적화 원활',
    '보통',
    '중립',
    '양호',
    '주의',
    '개선 필요',
    '최적화 필요',
    '위험',
    '부정',
])

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function parseJson(value: unknown): unknown {
    if (typeof value !== 'string') return value

    let candidate: unknown = value.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')

    for (let index = 0; index < 3 && typeof candidate === 'string'; index += 1) {
        const text = candidate.trim()
        if (!text) return null

        try {
            candidate = JSON.parse(text)
        } catch {
            const arrayStart = text.indexOf('[')
            const arrayEnd = text.lastIndexOf(']')
            const objectStart = text.indexOf('{')
            const objectEnd = text.lastIndexOf('}')
            const jsonSlice =
                arrayStart >= 0 && arrayEnd > arrayStart
                    ? text.slice(arrayStart, arrayEnd + 1)
                    : objectStart >= 0 && objectEnd > objectStart
                      ? text.slice(objectStart, objectEnd + 1)
                      : ''

            if (!jsonSlice || jsonSlice === text) return text

            try {
                candidate = JSON.parse(jsonSlice)
            } catch {
                return text
            }
        }
    }

    return candidate
}

function getText(record: Record<string, unknown>, keys: string[]) {
    for (const key of keys) {
        const value = record[key]
        if (typeof value === 'string' && value.trim()) return value.trim()
    }

    return ''
}

function getArray(value: unknown, keys: string[], allowKeyedItems = false): unknown[] {
    if (Array.isArray(value)) return value
    if (!isRecord(value)) return []

    for (const key of keys) {
        const nested = parseJson(value[key])
        if (Array.isArray(nested)) return nested
        if (isRecord(nested)) {
            const items = getArray(nested, keys, allowKeyedItems)
            if (items.length > 0) return items
        }
    }

    if (!allowKeyedItems) return []

    return Object.entries(value).flatMap(([timestamp, item]) => {
        if (typeof item === 'string') return [{ timestamp, content: item }]
        if (isRecord(item)) return [{ timestamp, ...item }]
        return []
    })
}

function parseReportSummary(value: unknown): ReportSummaryItem[] {
    return getArray(parseJson(value), ['summary', 'items'])
        .filter(isRecord)
        .map((item) => {
            const rawStatus = getText(item, ['tag', 'status', 'grade', 'label'])

            return {
                status: SUMMARY_STATUSES.has(rawStatus as SummaryStatus) ? (rawStatus as SummaryStatus) : '보통',
                title: getText(item, ['title', 'summaryTitle', 'heading']),
                details: getText(item, ['content', 'details', 'description', 'summary']),
            }
        })
        .filter((item) => item.title || item.details)
        .slice(0, 3)
}

function parseVideoSummary(value: unknown): VideoSummaryItem[] {
    return getArray(parseJson(value), ['summary', 'videoSummary', 'items', 'chapters'], true)
        .map((item) => {
            if (typeof item === 'string') {
                return { timestamp: '00:00', title: item, description: '' }
            }
            if (!isRecord(item)) return null

            return {
                timestamp: getText(item, ['time', 'timestamp', 'startTime', 'start']) || '00:00',
                title: getText(item, ['title', 'heading', 'topic']),
                description: getText(item, ['content', 'description', 'detail', 'summary']),
            }
        })
        .filter((item): item is VideoSummaryItem => item !== null && Boolean(item.title || item.description))
}

function normalizePercent(value: number) {
    const percent = Math.abs(value) <= 1 ? value * 100 : value
    return Math.min(100, Math.max(0, Math.round(percent)))
}

function normalizeOverview(data: DummyReportOverview): ReportOverviewresponse {
    const rawCommentSummary = parseJson(data.commentSummary)
    const getCommentDescription = (keys: string[]) => {
        if (!isRecord(rawCommentSummary)) return ''

        for (const key of keys) {
            const item = rawCommentSummary[key]
            if (typeof item === 'string') return item
            if (isRecord(item)) return getText(item, ['description', 'summary', 'content'])
        }

        return ''
    }
    const parsedCommentSummary = {
        positive: getCommentDescription(['positive', 'POSITIVE']),
        negative: getCommentDescription(['negative', 'NEGATIVE']),
        neutral: getCommentDescription(['neutral', 'NEUTRAL']),
        advice: getCommentDescription(['advice', 'ADVICE', 'adviceOpinion', 'ADVICE_OPINION']),
    }
    const commentSummary = Object.values(parsedCommentSummary).some(Boolean) ? parsedCommentSummary : null

    return {
        reportId: data.reportId ?? 0,
        view: data.view,
        viewChannelAvg: data.viewChannelAvg,
        likeCount: data.likeCount,
        likeChannelAvg: data.likeChannelAvg,
        comment: data.comment,
        commentChannelAvg: data.commentChannelAvg,
        concept: data.concept,
        seo: data.seo,
        revisit: data.revisit,
        summary: parseVideoSummary(data.summary).map((item) => ({
            time: item.timestamp,
            title: item.title,
            content: item.description,
        })),
        totalCommentCount: data.totalCommentCount,
        neutralComment: data.neutralComment,
        adviceComment: data.adviceComment,
        positiveComment: data.positiveComment,
        negativeComment: data.negativeComment,
        positiveCommentPercent: normalizePercent(data.positiveCommentPercent),
        negativeCommentPercent: normalizePercent(data.negativeCommentPercent),
        neutralCommentPercent: normalizePercent(data.neutralCommentPercent),
        adviceCommentPercent: normalizePercent(data.adviceCommentPercent),
        commentSummary,
        comments: data.comments.map((comment) => ({
            ...comment,
            category:
                comment.category.toLowerCase() === 'advice_opinion'
                    ? 'advice'
                    : comment.category.toLowerCase(),
        })),
    }
}

function LockedContent({ children, message }: { children: ReactNode; message: string }) {
    return (
        <div className="relative overflow-hidden rounded-[20px]">
            {children}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/1 p-4 text-center backdrop-blur-[10px]">
                <p className="font-body-16m text-text-primary">{message}</p>
            </div>
        </div>
    )
}

export default function DummyOverviewTab({ data }: { data: DummyReportOverview }) {
    const [isVideoSummaryExpanded, setIsVideoSummaryExpanded] = useState(false)
    const normalizedOverview = normalizeOverview(data)
    const parsedSummary = parseReportSummary(data.overviewSummary)
    const fallbackSummary: ReportSummaryItem[] = [
        {
            status: '긍정',
            title: '시청자의 긍정적인 반응',
            details: `전체 댓글 중 긍정 반응이 ${normalizedOverview.positiveCommentPercent}%로 분석됐어요.`,
        },
        {
            status: '양호',
            title: '시청자 이탈 구간 분석',
            details: '시청 흐름이 감소하는 구간과 개선 방법을 확인해보세요.',
        },
        {
            status: data.seo < 70 ? '최적화 필요' : '최적화 원활',
            title: `SEO 구성 ${data.seo}점`,
            details: '제목과 설명, 해시태그 구성을 분석한 결과예요.',
        },
    ]
    const reportSummary = fallbackSummary.map((fallback, index) => parsedSummary[index] ?? fallback)
    const videoSummary = normalizedOverview.summary
    const visibleVideoSummary = isVideoSummaryExpanded ? videoSummary : videoSummary.slice(0, 3)

    return (
        <div className="flex flex-col gap-8 pt-8">
            <section id="report-summary" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">리포트 요약</p>
                {reportSummary.map((item, index) => {
                    const card = (
                        <SummaryCard status={item.status} summaryTitle={item.title} details={item.details} />
                    )

                    return index === 0 ? (
                        <div key={`${item.title}-${index}`}>{card}</div>
                    ) : (
                        <LockedContent
                            key={`${item.title}-${index}`}
                            message="로그인 시, 본인 영상의 분석에서 확인할 수 있어요"
                        >
                            {card}
                        </LockedContent>
                    )
                })}
            </section>

            <section id="video-evaluation" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">영상 평가</p>
                <div className="grid grid-cols-2 gap-2 tablet:grid-cols-3">
                    <EvaluationCard type="view" score={formatReportMetric(data.view)} isAveragePrivate />
                    <EvaluationCard type="likes" score={formatReportMetric(data.likeCount)} isAveragePrivate />
                    <EvaluationCard type="comments" score={formatReportMetric(data.comment)} isAveragePrivate />
                    <LockedContent message="로그인 후 확인할 수 있어요">
                        <EvaluationCard type="concept-consistency" score={formatReportMetric(data.concept)} />
                    </LockedContent>
                    <LockedContent message="로그인 후 확인할 수 있어요">
                        <EvaluationCard type="SEO" score={formatReportMetric(data.seo)} />
                    </LockedContent>
                    <LockedContent message="로그인 후 확인할 수 있어요">
                        <EvaluationCard type="revisit-rate" score={formatReportMetric(data.revisit)} />
                    </LockedContent>
                </div>
            </section>

            <section id="video-summary" className="flex flex-col gap-2">
                <p className="font-body-16sb text-text-primary">영상 요약</p>
                <div className="flex flex-col gap-4 rounded-[20px] bg-bg-1 p-5">
                    {visibleVideoSummary.length > 0 ? (
                        visibleVideoSummary.map((summary, index) => (
                            <SummaryComment
                                key={`${summary.time}-${index}`}
                                timestamp={summary.time}
                                comment={summary.title}
                                detail={summary.content}
                            />
                        ))
                    ) : (
                        <p className="font-body-14r text-text-secondary">영상 요약 정보가 없습니다.</p>
                    )}
                    {!isVideoSummaryExpanded && videoSummary.length > 3 && (
                        <button
                            type="button"
                            onClick={() => setIsVideoSummaryExpanded(true)}
                            className="flex w-full items-center justify-center border-t-[1.5px] border-border-default px-4 py-2 font-body-16r text-text-secondary"
                        >
                            전체 보기
                        </button>
                    )}
                </div>
            </section>

            <CommentSummarySection overview={normalizedOverview} />
        </div>
    )
}
