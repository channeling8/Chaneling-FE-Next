'use client'

import { Fragment, useState } from 'react'
import CommentDonutChart from './CommentDoughnutChart'
import Comment from './Comment'
import { ReportOverviewresponse } from '@/types/reports'
import { formatKoreanNumber, formatRelativeTime } from '@/utils/format'

type CommentType = 'positive' | 'negative' | 'neutral' | 'advice'

interface CommentTabData {
    id: CommentType
    label: string
    percentage: number
    count: number
    title: string
    description: string
    dotClassName: string
    textClassName: string
    activeClassName: string
}

interface CommentReactionSectionProps {
    overview: ReportOverviewresponse
}

export default function CommentSummarySection({ overview }: CommentReactionSectionProps) {
    const [activeTab, setActiveTab] = useState<CommentType>('positive')

    const commentData = [
        {
            name: '긍정',
            value: overview.positiveCommentPercent,
            color: '#4ADE80',
        },
        {
            name: '부정',
            value: overview.negativeCommentPercent,
            color: '#E0001B',
        },
        {
            name: '중립',
            value: overview.neutralCommentPercent,
            color: '#36363B',
        },
        {
            name: '조언',
            value: overview.adviceCommentPercent,
            color: '#60A5FA',
        },
    ]

    const commentSummary = overview.commentSummary ?? {
        positive: '긍정적 댓글 분석이 없습니다.',
        negative: '부정적 댓글 분석이 없습니다.',
        neutral: '중립적 댓글 분석이 없습니다.',
        advice: '조언 댓글 분석이 없습니다.',
    }

    const commentTabs: CommentTabData[] = [
        {
            id: 'positive',
            label: '긍정',
            percentage: overview.positiveCommentPercent,
            count: overview.positiveComment,
            title: '긍정적 댓글 분석',
            description: commentSummary.positive,
            dotClassName: 'bg-green',
            textClassName: 'text-green',
            activeClassName: 'border-green bg-green-op8',
        },
        {
            id: 'negative',
            label: '부정',
            percentage: overview.negativeCommentPercent,
            count: overview.negativeComment,
            title: '부정적 댓글 분석',
            description: commentSummary.negative,
            dotClassName: 'bg-red-error',
            textClassName: 'text-red-error',
            activeClassName: 'border-red-error bg-red-error-op8',
        },
        {
            id: 'neutral',
            label: '중립',
            percentage: overview.neutralCommentPercent,
            count: overview.neutralComment,
            title: '중립적 댓글 분석',
            description: commentSummary.neutral,
            dotClassName: 'bg-gray-500',
            textClassName: 'text-gray-500',
            activeClassName: 'border-gray-500 bg-gray-500/10',
        },
        {
            id: 'advice',
            label: '조언',
            percentage: overview.adviceCommentPercent,
            count: overview.adviceComment,
            title: '조언 댓글 분석',
            description: commentSummary.advice,
            dotClassName: 'bg-blue-400',
            textClassName: 'text-blue-400',
            activeClassName: 'border-blue-400 bg-blue-op8',
        },
    ]

    const selectedTab = commentTabs.find((tab) => tab.id === activeTab) ?? commentTabs[0]

    const filteredComments = overview.comments.filter((comment) => comment.category === activeTab)

    return (
        <section id="comments" className="flex flex-col gap-2">
            <p className="font-body-16sb text-text-primary">댓글 반응</p>
            <div className="flex flex-col gap-8 rounded-[20px] bg-bg-1 p-5">
                <div className="flex flex-col gap-6 tablet:flex-row">
                    <CommentDonutChart
                        totalComment={formatKoreanNumber(overview.totalCommentCount, '')}
                        data={commentData}
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-8">
                        <div className="flex flex-row gap-1 tablet:flex-col">
                            {commentTabs.map((tab) => {
                                const isActive = activeTab === tab.id
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full rounded-xl border px-6 py-4 text-left transition-colors ${
                                            isActive
                                                ? tab.activeClassName
                                                : 'border-transparent bg-transparent hover:bg-white/5'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-2 tablet:flex-row tablet:gap-2.5">
                                            <div className={`size-2 rounded-full ${tab.dotClassName}`} />

                                            <div className="flex flex-col items-center gap-2 tablet:flex-row">
                                                <span
                                                    className={
                                                        isActive
                                                            ? `font-body-14m ${tab.textClassName}`
                                                            : 'font-body-14m text-text-secondary'
                                                    }
                                                >
                                                    {tab.label}
                                                </span>

                                                <span className="font-body-14m text-text-secondary">
                                                    {tab.percentage}%
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center gap-1">
                                <p className="font-body-14m text-text-secondary">{selectedTab.title}</p>
                                <p className="font-body-14r text-text-secondary">
                                    {formatKoreanNumber(selectedTab.count, '개')}
                                </p>
                            </div>

                            <p className="font-body-14r text-text-primary">{selectedTab.description}</p>
                        </div>
                    </div>
                </div>
                {/* 댓글 */}
                <div className="flex flex-col">
                    <p className="font-body-14m text-text-secondary">주요 댓글</p>

                    <div className="flex flex-col gap-2">
                        {overview.comments.length === 0 && (
                            <p className="py-4 font-body-14r text-text-secondary">해당 유형의 주요 댓글이 없습니다.</p>
                        )}

                        {filteredComments.map((comment, index) => (
                            <Fragment key={`${comment.author}-${comment.publishedAt}-${index}`}>
                                <Comment
                                    comment={comment.content}
                                    profileImageUrl={comment.authorProfileImageUrl}
                                    nickname={comment.author}
                                    time={formatRelativeTime(comment.publishedAt)}
                                    like={comment.likeCount}
                                />

                                {index !== filteredComments.length - 1 && (
                                    <div className="h-px w-full bg-border-default" />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
