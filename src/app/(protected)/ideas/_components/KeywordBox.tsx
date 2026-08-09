import type { TrendKeyword } from '@/api/ideas'
import RankUpIcon from '@/assets/icons/rankUpIcon.svg'

function formatElapsedTime(dateString: string | null) {
    if (!dateString) return '채널 맞춤 키워드'

    const elapsedMinutes = Math.max(0, Math.floor((Date.now() - new Date(dateString).getTime()) / 60000))

    if (elapsedMinutes < 1) return '방금 전 시작됨'
    if (elapsedMinutes < 60) return `${elapsedMinutes}분 전 시작됨`

    const elapsedHours = Math.floor(elapsedMinutes / 60)
    if (elapsedHours < 24) return `${elapsedHours}시간 전 시작됨`

    return `${Math.floor(elapsedHours / 24)}일 전 시작됨`
}

interface KeywordBoxProps {
    keyword: TrendKeyword
    rank: number
    onClick: (keyword: string) => void
}

export default function KeywordBox({ keyword, rank, onClick }: KeywordBoxProps) {
    const isChannelKeyword = keyword.keywordType === 'CHANNEL'
    const isNew = !isChannelKeyword && keyword.scoreStatus === 'NONE'
    const isUp = keyword.scoreStatus === 'UP' || keyword.scoreStatus === 'NONE'
    const isDown = keyword.scoreStatus === 'DOWN'

    return (
        <button
            type="button"
            className="p-2 flex w-full gap-4 items-center rounded-xl text-left hover:bg-bg-1"
            onClick={() => onClick(keyword.keyword)}
        >
            <div className="w-3 text-text-brand font-title-18sb">{rank}</div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <div className="font-body-16m text-text-primary">{keyword.keyword}</div>
                    {isNew && (
                        <div className="rounded-lg px-1 py-0.5 bg-text-brand/8 text-text-brand font-caption-12m desktop:text-[12px]">
                            new
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <div className="font-body-14r text-text-secondary">
                        {isChannelKeyword ? '추천 점수' : formatElapsedTime(keyword.startedAt ?? keyword.createdAt)}
                    </div>
                    <div className="flex items-center gap-0.5">
                        <div className={isUp ? 'text-text-brand font-body-14r' : 'text-text-secondary font-body-14r'}>
                            {keyword.score}
                        </div>
                        {!isChannelKeyword && isUp && <RankUpIcon className="text-icon-brand" />}
                        {!isChannelKeyword && isDown && <RankUpIcon className="rotate-180 text-icon-secondary" />}
                    </div>
                </div>
            </div>
        </button>
    )
}
