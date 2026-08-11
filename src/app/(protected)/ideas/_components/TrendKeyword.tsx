import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTrendKeywords } from '@/api/ideas'
import type { TrendKeyword as TrendKeywordItem } from '@/api/ideas'
import { SkeletonBase } from '@/components/Skeletonbase'
import Tab from './Tab'
import KeywordBox from './KeywordBox'
import Infoicon from '@/assets/icons/infoIcon.svg'
import TrendTooltip from './TrendTooltip'

function deduplicateKeywords(keywords: TrendKeywordItem[]) {
    const uniqueKeywords = new Map<string, TrendKeywordItem>()

    keywords.forEach((keyword) => {
        const normalizedKeyword = keyword.keyword.trim()
        const previousKeyword = uniqueKeywords.get(normalizedKeyword)

        if (!previousKeyword || keyword.score > previousKeyword.score) {
            uniqueKeywords.set(normalizedKeyword, {
                ...keyword,
                keyword: normalizedKeyword,
            })
        }
    })

    return Array.from(uniqueKeywords.values()).slice(0, 5)
}

function KeywordList({
    keywords,
    onKeywordSelect,
}: {
    keywords: TrendKeywordItem[]
    onKeywordSelect: (keyword: string) => void
}) {
    if (keywords.length === 0) {
        return (
            <div className="flex min-h-30 items-center justify-center font-body-14r text-text-secondary">
                표시할 트렌드 키워드가 없습니다.
            </div>
        )
    }

    return (
        <div className="flex flex-col mt-3.5 w-full">
            {keywords.map((keyword, index) => (
                <KeywordBox key={keyword.trendKeywordId} keyword={keyword} rank={index + 1} onClick={onKeywordSelect} />
            ))}
        </div>
    )
}

export default function TrendKeyword({ onKeywordSelect }: { onKeywordSelect: (keyword: string) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<'live' | 'custom'>('live')
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['trend-keywords'],
        queryFn: getTrendKeywords,
    })

    const realTimeKeywords = deduplicateKeywords(data?.realTimeTrendKeywordList ?? [])
    const channelKeywords = deduplicateKeywords(data?.channelTrendKeywordInfoList ?? [])

    return (
        <div className="flex flex-col w-full mt-1 tablet:mt-3 desktop:mt-1">
            <div className="flex flex-col py-1 items-start">
                <div className="flex gap-1 items-center relative">
                    <h1 className="text-text-primary font-title-18sb">트렌드 키워드</h1>
                    <button className="size-5 [&_svg]:w-full [&_svg]:h-full" onClick={() => setIsOpen((prev) => !prev)}>
                        <Infoicon />
                    </button>
                    {isOpen && <TrendTooltip />}
                </div>
                <div className="text-text-secondary font-body-14r">
                    키워드를 클릭해 AI 콘텐츠 아이디어를 생성해보세요
                </div>
            </div>
            <div className="flex w-full border-b border-border-subtitle">
                <Tab title="실시간" onClick={() => setActiveTab('live')} isActive={activeTab === 'live'} />
                <Tab title="채널 맞춤형" onClick={() => setActiveTab('custom')} isActive={activeTab === 'custom'} />
            </div>

            {isPending && (
                <div className="flex flex-col gap-2 pt-3.5">
                    {[0, 1, 2, 3, 4].map((index) => (
                        <SkeletonBase key={index} sizeConfig="h-14 w-full" />
                    ))}
                </div>
            )}

            {isError && (
                <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
                    <p className="font-body-14r text-text-secondary">트렌드 키워드를 불러오지 못했습니다.</p>
                    <button
                        type="button"
                        className="rounded-xl bg-bg-1 px-4 py-2 font-body-14m text-text-primary"
                        onClick={() => void refetch()}
                    >
                        다시 시도
                    </button>
                </div>
            )}

            {!isPending && !isError && activeTab === 'live' && (
                <KeywordList keywords={realTimeKeywords} onKeywordSelect={onKeywordSelect} />
            )}
            {!isPending && !isError && activeTab === 'custom' && (
                <KeywordList keywords={channelKeywords} onKeywordSelect={onKeywordSelect} />
            )}
        </div>
    )
}
