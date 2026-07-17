'use client'

import { useState } from 'react'

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

const commentTabs: CommentTabData[] = [
    {
        id: 'positive',
        label: '긍정',
        percentage: 25,
        count: 100,
        title: '긍정적 댓글 분석',
        description:
            '시청자들은 화자의 솔직한 태도와 진정성에 큰 호감을 느꼈습니다. 특히 "힐링된다", "위로받았다"는 키워드가 상위권에 랭크되었습니다.',
        dotClassName: 'bg-green',
        textClassName: 'text-green',
        activeClassName: 'border-green bg-green-op8',
    },
    {
        id: 'negative',
        label: '부정',
        percentage: 25,
        count: 100,
        title: '부정적 댓글 분석',
        description: '일부 시청자들은 영상의 전개가 다소 느리고 핵심 내용이 늦게 등장한다는 의견을 남겼습니다.',
        dotClassName: 'bg-red-error',
        textClassName: 'text-red-error',
        activeClassName: 'border-red-error bg-red-error-op8',
    },
    {
        id: 'neutral',
        label: '중립',
        percentage: 25,
        count: 100,
        title: '중립적 댓글 분석',
        description: '영상의 주제와 관련된 질문이나 개인적인 경험을 공유하는 중립적인 댓글이 주로 나타났습니다.',
        dotClassName: 'bg-gray-500',
        textClassName: 'text-gray-500',
        activeClassName: 'border-gray-500 bg-gray-500/10',
    },
    {
        id: 'advice',
        label: '조언',
        percentage: 25,
        count: 100,
        title: '조언 댓글 분석',
        description: '자막의 가독성을 높이고 영상의 주요 구간을 조금 더 간결하게 편집하면 좋겠다는 의견이 있었습니다.',
        dotClassName: 'bg-blue-400',
        textClassName: 'text-blue-400',
        activeClassName: 'border-blue-400 bg-blue-op8',
    },
]

export default function CommentTab() {
    const [activeTab, setActiveTab] = useState<CommentType>('positive')

    const selectedTab = commentTabs.find((tab) => tab.id === activeTab) ?? commentTabs[0]

    return (
        <div className="w-full flex flex-col gap-8">
            {/* 탭 버튼 */}
            <div className="flex flex-row tablet:flex-col gap-1">
                {commentTabs.map((tab) => {
                    const isActive = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full rounded-xl border px-6 py-4 text-left transition-colors ${
                                isActive ? tab.activeClassName : 'border-transparent bg-transparent hover:bg-white/5'
                            }`}
                        >
                            <div className="flex flex-col tablet:flex-row items-center gap-2 tablet:gap-2.5">
                                <div className={`size-2 rounded-full ${tab.dotClassName}`} />
                                <div className="flex flex-col tablet:flex-row items-center gap-2">
                                    <span
                                        className={
                                            isActive
                                                ? `font-body-14m ${tab.textClassName}`
                                                : 'font-body-14m text-text-secondary'
                                        }
                                    >
                                        {tab.label}
                                    </span>

                                    <span className="font-body-14m text-text-secondary">{tab.percentage}%</span>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* 선택된 탭 내용 */}
            <div className="w-full flex flex-col gap-1">
                <div className="flex items-center">
                    <p className={`font-body-14m ${selectedTab.textClassName}`}>{selectedTab.title}</p>

                    <p className="font-body-14r text-text-secondary">({selectedTab.count}개)</p>
                </div>

                <p className="font-body-14r text-text-primary">{selectedTab.description}</p>
            </div>
        </div>
    )
}
