'use client'
import Back from '@/assets/icons/back.svg'
import { useState } from 'react'
import SearchBar from '../_components/SearchBar'
import VideoCard from '../_components/VideoCard'
import DropdownOrder from '@/components/dropdown-order'
import Chip from '@/components/Chip'
import PageContent from '@/components/layout/PageContent'
import { useGetChannelVideoList } from '@/hooks/useGetChannelVideoList'
import { formatRelativeTime } from '@/utils/format'
import { useRouter } from 'next/navigation'
import { useVideoStore } from '@/stores/videoStore'

type VideoType = 'ALL' | 'LONG' | 'SHORTS'
type OrderType = '최신순' | '인기순' | '날짜순'
type SortType = 'LATEST' | 'POPULAR' | 'DATE'

const sortMap: Record<OrderType, SortType> = {
    최신순: 'LATEST',
    인기순: 'POPULAR',
    날짜순: 'DATE',
}

export default function MyVideoSelectPage() {
    const router = useRouter()
    const setSelectedVideoId = useVideoStore((state) => state.setSelectedVideoId)
    const [activeChip, setActiveChip] = useState<VideoType>('ALL')

    const [order, setOrder] = useState<OrderType>('최신순')

    const sort = sortMap[order]

    const { data, isLoading, error } = useGetChannelVideoList({
        type: activeChip,
        sort,
        page: 1,
        size: 8,
    })

    return (
        <div className="absolute inset-0 z-30 overflow-y-auto bg-bg-0">
            <PageContent className="flex min-h-full flex-col gap-4 pb-16 pt-4">
                <header className="sticky top-0 z-10 flex items-center justify-between bg-bg-0 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex cursor-pointer items-center"
                            aria-label="뒤로 가기"
                        >
                            <Back />
                        </button>

                        <h1 className="font-title-18sb text-text-primary">내 영상 선택</h1>
                    </div>
                </header>

                <SearchBar />

                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <Chip title="전체" onClick={() => setActiveChip('ALL')} isActive={activeChip === 'ALL'} />

                        <Chip title="롱폼" onClick={() => setActiveChip('LONG')} isActive={activeChip === 'LONG'} />

                        <Chip title="숏폼" onClick={() => setActiveChip('SHORTS')} isActive={activeChip === 'SHORTS'} />
                    </div>

                    <DropdownOrder onChange={(value) => setOrder(value as OrderType)} />
                </div>

                <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
                    {isLoading && (
                        <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                            영상을 불러오는 중...
                        </div>
                    )}

                    {/* {error && (
                                        <div className="col-span-full py-6 text-center font-body-14m text-red-error">
                                            영상 목록을 불러오지 못했습니다.
                                        </div>
                                    )} */}

                    {!isLoading && !error && data?.videoList.length === 0 && (
                        <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                            최근 영상이 없습니다.
                        </div>
                    )}

                    {!isLoading &&
                        !error &&
                        data?.videoList?.map((video) => (
                            <VideoCard
                                key={video.videoId}
                                title={video.videoTitle}
                                leftside="조회수"
                                leftsideamount={`${video.viewCount.toLocaleString()}회`}
                                rightside={formatRelativeTime(video.uploadDate)}
                                imageUrl={video.videoThumbnailUrl}
                                onClick={() => {
                                    setSelectedVideoId(video.videoId)
                                    router.push(
                                        `/reports/period?videoId=${video.videoId}&uploadDate=${encodeURIComponent(video.uploadDate)}`
                                    )
                                }}
                            />
                        ))}
                </div>
            </PageContent>
        </div>
    )
}
