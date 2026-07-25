'use client'

import type {
    AlgorithmGrade,
    AlgorithmIssueType,
    AlgorithmOptimization,
    ReportAnalysis,
    RetentionPoint,
    ViewerRetentionAnalysis,
} from '@/api/report'
import { SkeletonBase } from '@/components/skeletonbase'
import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const CATEGORY_LABELS: Record<string, string> = {
    TITLE: '제목 관련',
    DESCRIPTION: '설명란 관련',
    HASHTAG: '해시태그 관련',
    THUMBNAIL: '썸네일 관련',
    DURATION: '영상 길이 관련',
}

const ISSUE_LABELS: Record<AlgorithmIssueType, string> = {
    PROBLEM: '문제',
    IMPROVEMENT: '개선',
    CURRENT_STATUS: '현재 상태',
}

const GRADE_STYLES: Record<AlgorithmGrade, { label: string; tone: ScoreBadgeProps['tone'] }> = {
    NEEDS_IMPROVEMENT: { label: '개선 필요', tone: 'danger' },
    NORMAL: { label: '보통', tone: 'neutral' },
    GOOD: { label: '좋음', tone: 'positive' },
}

interface AnalysisItemProps {
    label: ReactNode
    children: ReactNode
}

interface ScoreBadgeProps {
    score: number
    status: string
    tone: 'danger' | 'neutral' | 'positive'
}

function parseTimeToSeconds(time: string) {
    const parts = time.split(':').map(Number)

    if (parts.some(Number.isNaN)) {
        return 0
    }

    return parts.reduce((total, part) => total * 60 + part, 0)
}

function formatKoreanTime(time: string) {
    const totalSeconds = parseTimeToSeconds(time)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}분 ${seconds}초`
}

function parseJson(value: unknown): unknown {
    if (typeof value !== 'string') return value

    try {
        return JSON.parse(value)
    } catch {
        return null
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function isRetentionPoint(value: unknown): value is RetentionPoint {
    return isRecord(value) && typeof value.time === 'string' && typeof value.retentionRate === 'number'
}

function parseRetentionGraph(value: unknown): RetentionPoint[] {
    const parsed = parseJson(value)
    const points =
        isRecord(parsed) && Array.isArray(parsed.points)
            ? parsed.points
            : isRecord(parsed) && Array.isArray(parsed.retentionGraph)
              ? parsed.retentionGraph
              : parsed

    return Array.isArray(points) && points.every(isRetentionPoint) ? points : []
}

function isAnalysisDetail(value: unknown) {
    return isRecord(value) && typeof value.title === 'string' && typeof value.description === 'string'
}

function isViewerRetentionAnalysis(value: unknown): value is ViewerRetentionAnalysis {
    if (!isRecord(value) || !isRecord(value.criticalSection)) {
        return false
    }

    const { criticalSection } = value

    return (
        typeof criticalSection.startTime === 'string' &&
        typeof criticalSection.endTime === 'string' &&
        typeof criticalSection.duration === 'number' &&
        Array.isArray(value.causes) &&
        value.causes.every(isAnalysisDetail) &&
        Array.isArray(value.improvements) &&
        value.improvements.every(isAnalysisDetail) &&
        typeof value.expectedEffect === 'string'
    )
}

function parseViewerRetentionAnalysis(value: unknown) {
    const parsed = parseJson(value)
    return isViewerRetentionAnalysis(parsed) ? parsed : null
}

const ALGORITHM_CATEGORIES = ['TITLE', 'DESCRIPTION', 'HASHTAG', 'THUMBNAIL', 'DURATION'] as const
const ALGORITHM_GRADES = ['NEEDS_IMPROVEMENT', 'NORMAL', 'GOOD'] as const
const ALGORITHM_ISSUE_TYPES = ['PROBLEM', 'IMPROVEMENT', 'CURRENT_STATUS'] as const

function isAlgorithmOptimization(value: unknown): value is AlgorithmOptimization {
    if (!isRecord(value) || !Array.isArray(value.categoryList) || !Array.isArray(value.additionalSuggestions)) {
        return false
    }

    return (
        value.categoryList.every(
            (category) =>
                isRecord(category) &&
                typeof category.category === 'string' &&
                ALGORITHM_CATEGORIES.includes(category.category as (typeof ALGORITHM_CATEGORIES)[number]) &&
                typeof category.score === 'number' &&
                typeof category.grade === 'string' &&
                ALGORITHM_GRADES.includes(category.grade as (typeof ALGORITHM_GRADES)[number]) &&
                Array.isArray(category.issues) &&
                category.issues.every(
                    (issue) =>
                        isRecord(issue) &&
                        typeof issue.type === 'string' &&
                        ALGORITHM_ISSUE_TYPES.includes(issue.type as (typeof ALGORITHM_ISSUE_TYPES)[number]) &&
                        typeof issue.content === 'string' &&
                        (typeof issue.examples === 'string' || issue.examples === null)
                )
        ) && value.additionalSuggestions.every((suggestion) => typeof suggestion === 'string')
    )
}

function parseAlgorithmOptimization(value: unknown) {
    const parsed = parseJson(value)
    return isAlgorithmOptimization(parsed) ? parsed : null
}

function formatAnalysisText(content: unknown) {
    if (typeof content === 'string') {
        return content.replace(/\\n/g, '\n').trim()
    }

    try {
        return JSON.stringify(content, null, 2) ?? ''
    } catch {
        return ''
    }
}

function AnalysisMarkdown({ content }: { content: unknown }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ ...props }) => <h3 className="font-body-16sb text-text-primary" {...props} />,
                h2: ({ ...props }) => <h3 className="font-body-16sb text-text-primary" {...props} />,
                h3: ({ ...props }) => <h3 className="font-body-14m text-text-primary" {...props} />,
                p: ({ ...props }) => <p className="font-body-14r text-text-primary" {...props} />,
                ul: ({ ...props }) => <ul className="ml-5 list-disc space-y-2 font-body-14r" {...props} />,
                ol: ({ ...props }) => <ol className="ml-5 list-decimal space-y-2 font-body-14r" {...props} />,
                li: ({ ...props }) => <li className="pl-1 text-text-primary marker:text-text-secondary" {...props} />,
            }}
        >
            {formatAnalysisText(content)}
        </ReactMarkdown>
    )
}

function RetentionGraph({
    points,
    criticalStartTime,
    criticalEndTime,
}: {
    points: RetentionPoint[]
    criticalStartTime?: string
    criticalEndTime?: string
}) {
    const chartHeight = 140
    const pointTimes = points.map(({ time }) => parseTimeToSeconds(time))
    const maxTime = Math.max(...pointTimes, 1)
    const toX = (seconds: number) => Math.min(Math.max((seconds / maxTime) * 1000, 0), 1000)
    const toY = (rate: number) => 8 + ((100 - Math.min(Math.max(rate, 0), 100)) / 100) * 120
    const coordinates = points.map((point, index) => ({
        x: toX(pointTimes[index]),
        y: toY(point.retentionRate),
    }))
    const linePath = coordinates.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
    const areaPath = `${linePath} L ${coordinates.at(-1)?.x ?? 1000} ${chartHeight} L ${
        coordinates[0]?.x ?? 0
    } ${chartHeight} Z`
    const criticalBoundaryPositions =
        criticalStartTime && criticalEndTime
            ? [toX(parseTimeToSeconds(criticalStartTime)), toX(parseTimeToSeconds(criticalEndTime))]
            : []

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden pt-4">
            <div className="min-w-[292px]">
                <svg
                    aria-label="영상 구간별 시청자 유지율 그래프"
                    className="h-35 w-full"
                    preserveAspectRatio="none"
                    role="img"
                    viewBox={`0 0 1000 ${chartHeight}`}
                >
                    <defs>
                        <linearGradient id="retention-area-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#E9495A" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#DA1B2E" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <path d={areaPath} fill="url(#retention-area-gradient)" />
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#E9495A"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />

                    {criticalBoundaryPositions.map((x, index) => (
                        <line
                            key={`${x}-${index}`}
                            stroke="#E9495A"
                            strokeDasharray="2 2"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                            x1={x}
                            x2={x}
                            y1="0"
                            y2={chartHeight}
                        />
                    ))}
                </svg>

                <div className="relative h-7 text-text-tertiary font-caption-12r">
                    {points.map((point, index) => (
                        <span
                            key={`${point.time}-${index}`}
                            className={`absolute top-0 flex flex-col items-center whitespace-nowrap ${
                                index === 0
                                    ? ''
                                    : index === points.length - 1
                                      ? '-translate-x-full'
                                      : '-translate-x-1/2'
                            } ${index > 0 && index < points.length - 1 && index % 2 === 1 ? 'hidden tablet:flex' : ''}`}
                            style={{ left: `${(coordinates[index].x / 1000) * 100}%` }}
                        >
                            <span aria-hidden className="h-2 w-px bg-border-default" />
                            {point.time}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

function AnalysisItem({ label, children }: AnalysisItemProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-body-14m text-text-secondary">{label}</p>
            <div className="flex flex-col gap-2 font-body-14r text-text-primary">{children}</div>
        </div>
    )
}

function Bullet({ label, children, secondary = false }: { label?: string; children: ReactNode; secondary?: boolean }) {
    return (
        <p className={`flex gap-2 ${secondary ? 'pl-5 text-text-secondary' : ''}`}>
            <span aria-hidden className="shrink-0">
                •
            </span>
            <span>
                {label && <strong className="font-semibold">{label}: </strong>}
                {children}
            </span>
        </p>
    )
}

function Divider() {
    return <div className="h-px w-full bg-border-default" />
}

function ScoreBadge({ score, status, tone }: ScoreBadgeProps) {
    const toneClassName = {
        danger: 'bg-red-error-op8 text-red-error',
        neutral: 'bg-bg-2 text-text-secondary',
        positive: 'bg-green-op8 text-green',
    }[tone]

    return (
        <span className={`shrink-0 rounded-lg px-1 py-0.5 font-body-14r ${toneClassName}`}>
            <strong className="font-medium">{score}점</strong> / 10점 | {status}
        </span>
    )
}

function AnalysisTabSkeleton() {
    return (
        <div
            aria-label="분석 결과를 불러오는 중"
            className="-ml-0.5 flex w-[calc(100%+8px)] flex-col gap-8 pt-4 tablet:ml-0 tablet:w-full"
        >
            {[0, 1].map((section) => (
                <section key={section} className="flex flex-col gap-2">
                    <SkeletonBase sizeConfig="h-6 w-28" />
                    <SkeletonBase sizeConfig="h-[528px] w-full" />
                </section>
            ))}
        </div>
    )
}

function AnalysisTabError({ onRetry }: { onRetry?: () => void }) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-[20px] bg-bg-1 px-5 py-12 text-center">
            <p className="font-body-14m text-text-primary">분석 결과를 불러오지 못했습니다.</p>
            <p className="font-body-14r text-text-secondary">잠시 후 다시 시도해 주세요.</p>
            {onRetry && (
                <button
                    type="button"
                    className="rounded-xl bg-bg-2 px-4 py-2 font-body-14m text-text-primary"
                    onClick={onRetry}
                >
                    다시 시도
                </button>
            )}
        </div>
    )
}

function AnalysisTabContent({ analysis }: { analysis: ReportAnalysis }) {
    const { retentionGraph, viewerRetentionAnalysis, algorithmOptimization } = analysis
    const retentionPoints = parseRetentionGraph(retentionGraph)
    const structuredViewerAnalysis = parseViewerRetentionAnalysis(viewerRetentionAnalysis)
    const structuredAlgorithmOptimization = parseAlgorithmOptimization(algorithmOptimization)

    return (
        <div className="-ml-0.5 flex w-[calc(100%+8px)] flex-col gap-8 pt-4 tablet:ml-0 tablet:w-full">
            <section className="flex flex-col gap-2" aria-labelledby="viewer-dropoff-title">
                <h2 id="viewer-dropoff-title" className="font-body-16sb text-text-primary">
                    시청자 이탈 분석
                </h2>

                <div className="flex flex-col gap-4 overflow-hidden rounded-[20px] bg-bg-1 p-5">
                    {structuredViewerAnalysis ? (
                        <div className="flex flex-col gap-1">
                            <p className="font-body-14m text-text-brand">
                                {formatKoreanTime(structuredViewerAnalysis.criticalSection.startTime)}(
                                {structuredViewerAnalysis.criticalSection.startTime}~
                                {structuredViewerAnalysis.criticalSection.endTime}) 구간 이탈 요약
                            </p>
                            <p className="font-body-14r text-text-secondary">
                                채널링이 분석한 가장 개선이 시급한 구간입니다.
                            </p>
                        </div>
                    ) : null}

                    {retentionPoints.length > 0 && (
                        <RetentionGraph
                            points={retentionPoints}
                            criticalStartTime={structuredViewerAnalysis?.criticalSection.startTime}
                            criticalEndTime={structuredViewerAnalysis?.criticalSection.endTime}
                        />
                    )}

                    {structuredViewerAnalysis ? (
                        <>
                            <AnalysisItem label="1. 이탈 원인">
                                {structuredViewerAnalysis.causes.map((cause, index) => (
                                    <Bullet key={`${cause.title}-${index}`} label={cause.title}>
                                        {cause.description}
                                    </Bullet>
                                ))}
                            </AnalysisItem>

                            <Divider />

                            <AnalysisItem label="2. 개선 방안">
                                {structuredViewerAnalysis.improvements.map((improvement, index) => (
                                    <Bullet key={`${improvement.title}-${index}`} label={improvement.title}>
                                        {improvement.description}
                                    </Bullet>
                                ))}
                            </AnalysisItem>

                            <Divider />

                            <AnalysisItem label="3. 기대 효과">
                                <Bullet>{structuredViewerAnalysis.expectedEffect}</Bullet>
                            </AnalysisItem>
                        </>
                    ) : (
                        <AnalysisMarkdown content={viewerRetentionAnalysis} />
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-2" aria-labelledby="algorithm-optimization-title">
                <h2 id="algorithm-optimization-title" className="font-body-16sb text-text-primary">
                    알고리즘 최적화
                </h2>

                <div className="flex flex-col gap-4 rounded-[20px] bg-bg-1 p-5">
                    {structuredAlgorithmOptimization ? (
                        <>
                            {structuredAlgorithmOptimization.categoryList.map((item, index) => {
                                const grade = GRADE_STYLES[item.grade] ?? {
                                    label: item.grade,
                                    tone: 'neutral' as const,
                                }

                                return (
                                    <div key={`${item.category}-${index}`} className="flex flex-col gap-4">
                                        {index > 0 && <Divider />}
                                        <AnalysisItem
                                            label={
                                                <span className="flex items-center justify-between gap-2">
                                                    <span>
                                                        {index + 1}. {CATEGORY_LABELS[item.category] ?? item.category}
                                                    </span>
                                                    <ScoreBadge
                                                        score={item.score}
                                                        status={grade.label}
                                                        tone={grade.tone}
                                                    />
                                                </span>
                                            }
                                        >
                                            {item.issues.map((issue, issueIndex) => (
                                                <div key={`${issue.type}-${issueIndex}`} className="flex flex-col gap-2">
                                                    <Bullet label={ISSUE_LABELS[issue.type] ?? issue.type}>
                                                        {issue.content}
                                                    </Bullet>
                                                    {issue.examples
                                                        ?.split('\n')
                                                        .filter(Boolean)
                                                        .map((example, exampleIndex) => (
                                                            <Bullet key={`${example}-${exampleIndex}`} secondary>
                                                                {example}
                                                            </Bullet>
                                                        ))}
                                                </div>
                                            ))}
                                        </AnalysisItem>
                                    </div>
                                )
                            })}

                            {structuredAlgorithmOptimization.additionalSuggestions.length > 0 && (
                                <>
                                    <Divider />
                                    <AnalysisItem
                                        label={`${structuredAlgorithmOptimization.categoryList.length + 1}. 추가 제안`}
                                    >
                                        {structuredAlgorithmOptimization.additionalSuggestions.map(
                                            (suggestion, index) => (
                                                <Bullet key={`${suggestion}-${index}`}>{suggestion}</Bullet>
                                            )
                                        )}
                                    </AnalysisItem>
                                </>
                            )}
                        </>
                    ) : (
                        <AnalysisMarkdown content={algorithmOptimization} />
                    )}
                </div>
            </section>
        </div>
    )
}

interface AnalysisTabProps {
    analysis?: ReportAnalysis
    isPending: boolean
    isError: boolean
    onRetry?: () => void
}

export default function AnalysisTab({ analysis, isPending, isError, onRetry }: AnalysisTabProps) {
    if (isError) {
        return <AnalysisTabError onRetry={onRetry} />
    }

    if (isPending || !analysis) {
        return <AnalysisTabSkeleton />
    }

    return <AnalysisTabContent analysis={analysis} />
}
