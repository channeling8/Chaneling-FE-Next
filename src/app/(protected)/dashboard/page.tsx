'use client'

import { useQueries, useQuery } from '@tanstack/react-query'
import Scroll from '@/components/Scroll'
import PageContent from '@/components/layout/PageContent'
import StatusBadge from '@/components/StatusBadge'
import {
    getDashboardMetadata,
    getDashboardSuggestionDetail,
    getDashboardSuggestions,
    type DashboardScoreType,
} from '@/api/dashboard'
import DashboardHeader from './_components/DashboardHeader'
import {
    DashboardDateSkeleton,
    DashboardMetricCardsSkeleton,
    DashboardProfileCardSkeleton,
    DashboardSuggestionsSkeleton,
} from '@/components/dashboard/DashboardSkeletons'
import InsightCard from './_components/InsightCard'
import MetricCardSmall from './_components/MetricCardSmall'
import MetricCardWithImage from './_components/MetricCardwithImage'
import UploadCycleChart from './_components/UploadCycleChart'
import { Footer } from '@/components/Footer'
import { useState } from 'react'

type MetricStatus = Parameters<typeof StatusBadge>[0]['status']

const scoreTypeDetails: Record<DashboardScoreType, { label: string }> = {
    CHANNEL_GROWTH: { label: '채널 성장' },
    ALGORITHM: { label: '알고리즘' },
    VIEW_ENGAGEMENT: { label: '시청 몰입' },
    REACTION_DENSITY: { label: '반응 밀도' },
    INFLOW_ACTIVITY: { label: '유입 활력' },
    UPLOAD_CYCLE: { label: '업로드 주기' },
}

const scoreTypeOrder = Object.keys(scoreTypeDetails) as DashboardScoreType[]

const metricStatuses = new Set<MetricStatus>([
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

function isMetricStatus(status: string): status is MetricStatus {
    return metricStatuses.has(status as MetricStatus)
}

function formatBaseDate(baseDate: string) {
    try {
        const date = new Date(baseDate)

        if (Number.isNaN(date.getTime())) {
            return '일시 정보 없음'
        }

        const parts = new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: '2-digit',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        }).formatToParts(date)
        const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value

        return `${getPart('year')}년 ${getPart('month')}월 ${getPart('day')}일 (${getPart('hour')}:${getPart('minute')}) 기준`
    } catch {
        return '일시 정보 없음'
    }
}

function formatSubscribers(subscriberCount: number) {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(subscriberCount)
}

export default function DashboardPage() {
    const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null)

    const { data: metadata, isPending: isMetadataPending } = useQuery({
        queryKey: ['dashboard', 'metadata'],
        queryFn: getDashboardMetadata,
    })
    const { data: suggestions, isPending: isSuggestionsPending } = useQuery({
        queryKey: ['dashboard', 'suggestions'],
        queryFn: getDashboardSuggestions,
    })
    const suggestionDetailQueries = useQueries({
        queries: (suggestions?.suggestionList ?? []).map((suggestion) => ({
            queryKey: ['dashboard', 'suggestions', suggestion.suggestionId],
            queryFn: () => getDashboardSuggestionDetail(suggestion.suggestionId),
        })),
    })
    const areSuggestionDetailsPending = suggestionDetailQueries.some((query) => query.isPending)

    const renderedMetrics = scoreTypeOrder.map((scoreType) => {
        const score = metadata?.channelScoreList.find((item) => item.scoreType === scoreType)
        const detail = scoreTypeDetails[scoreType]

        return {
            label: detail.label,
            score: score?.score ?? null,
            status: score?.grade && isMetricStatus(score.grade) ? score.grade : null,
            delta: score?.scoreChange ?? null,
        }
    })

    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <DashboardHeader />

            <Scroll as="main" className="flex-1">
                <PageContent className="mx-auto flex flex-col gap-8 pb-8 pt-4 desktop:pb-16 desktop:pt-8">
                    <section className="flex w-full flex-col gap-2">
                        {isMetadataPending ? (
                            <DashboardDateSkeleton />
                        ) : metadata ? (
                            <p className="font-body-14r text-text-tertiary">{formatBaseDate(metadata.baseDate)}</p>
                        ) : null}

                        <div className="grid w-full grid-cols-1 gap-2 tablet:grid-cols-[274px_minmax(0,1fr)] desktop:grid-cols-[298px_minmax(0,1fr)]">
                            {isMetadataPending ? (
                                <>
                                    <DashboardProfileCardSkeleton />
                                    <DashboardMetricCardsSkeleton />
                                </>
                            ) : metadata ? (
                                <>
                                    <MetricCardWithImage
                                        channelName={metadata.channelInfo.channelName}
                                        subscribers={formatSubscribers(metadata.channelInfo.subscriberCount)}
                                        delta={metadata.channelInfo.subscriberChange}
                                        imageUrl={metadata.channelInfo.profileImageUrl}
                                    />
                                    <div className="grid min-w-0 grid-cols-2 gap-2 tablet:grid-cols-3">
                                        {renderedMetrics.map((metric) => (
                                            <MetricCardSmall
                                                key={metric.label}
                                                {...metric}
                                                isOpen={activeTooltipId === metric.label}
                                                onClick={() =>
                                                    setActiveTooltipId((prev) =>
                                                        prev === metric.label ? null : metric.label
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </section>

                    <UploadCycleChart />

                    {isSuggestionsPending || areSuggestionDetailsPending ? (
                        <DashboardSuggestionsSkeleton />
                    ) : suggestions ? (
                        <section className="flex w-full flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-title-18sb text-text-primary">채널링의 제안</h2>
                                {suggestions.summaryMessage && (
                                    <p className="font-body-14r text-text-secondary">{suggestions.summaryMessage}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                {suggestions.suggestionList.map((insight, index) => (
                                    <InsightCard
                                        key={insight.suggestionId}
                                        title={insight.title}
                                        description={insight.description}
                                        tags={suggestionDetailQueries[index]?.data?.expectedMetrics.map(
                                            (metric) => `${metric.label}: ${metric.value}`
                                        )}
                                        href={`/dashboard/insights/${insight.suggestionId}`}
                                    />
                                ))}
                            </div>
                        </section>
                    ) : null}
                </PageContent>
                <Footer />
            </Scroll>
        </div>
    )
}
