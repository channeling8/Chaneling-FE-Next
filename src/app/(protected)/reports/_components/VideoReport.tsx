'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Tab from '../../ideas/_components/Tab'
import SearchBar from './SearchBar'
import Chip from '@/components/Chip'
import VideoCard from './VideoCard'
import DropdownOrder from '@/components/dropdown-order'
import { useGetChannelReportList } from '@/hooks/useGetChannelReportList'
import { formatKoreanNumber, formatKoreanShortDate } from '@/utils/format'
import { getCategoryLeadersVideo } from '@/api/report'
import { CategoryLeadersVideoResponse } from '@/types/reports'
import { useVideoStore } from '@/stores/videoStore'

type VideoType = 'ALL' | 'LONG' | 'SHORTS'
type OrderType = '최신순' | '인기순' | '날짜순'
type SortType = 'LATEST' | 'POPULAR' | 'DATE'

const sortMap: Record<OrderType, SortType> = {
    최신순: 'LATEST',
    인기순: 'POPULAR',
    날짜순: 'DATE',
}

export default function VideoReport() {
    const router = useRouter()

    const [leaderData, setLeaderData] = useState<CategoryLeadersVideoResponse | null>(null)
    const [isLeaderLoading, setIsLeaderLoading] = useState(false)
    const [leaderError, setLeaderError] = useState<unknown>(null)

    const [activeTab, setActiveTab] = useState<'myreport' | 'recommend'>('myreport')
    const [activeChip, setActiveChip] = useState<VideoType>('ALL')
    const [order, setOrder] = useState<OrderType>('최신순')

    const setSelectedVideoId = useVideoStore((state) => state.setSelectedVideoId)

    const sort = sortMap[order]

    const {
        data: reportData,
        isLoading: isReportLoading,
        error: reportError,
    } = useGetChannelReportList({
        type: activeChip,
        sort,
        page: 1,
        size: 8,
    })

    useEffect(() => {
        if (activeTab !== 'recommend') return

        async function fetchLeaderVideos() {
            try {
                setIsLeaderLoading(true)
                setLeaderError(null)

                const result = await getCategoryLeadersVideo()
                setLeaderData(result)
            } catch (error) {
                setLeaderError(error)
            } finally {
                setIsLeaderLoading(false)
            }
        }

        void fetchLeaderVideos()
    }, [activeTab])

    return (
        <div>
            <Tab title="내 리포트 내역" onClick={() => setActiveTab('myreport')} isActive={activeTab === 'myreport'} />
            <Tab title="추천 리포트" onClick={() => setActiveTab('recommend')} isActive={activeTab === 'recommend'} />

            {activeTab === 'myreport' && (
                <div className="flex flex-col gap-4 pt-4">
                    <SearchBar />

                    <div className="flex justify-between">
                        <div className="flex gap-1">
                            <Chip title="전체" onClick={() => setActiveChip('ALL')} isActive={activeChip === 'ALL'} />
                            <Chip title="롱폼" onClick={() => setActiveChip('LONG')} isActive={activeChip === 'LONG'} />
                            <Chip
                                title="숏폼"
                                onClick={() => setActiveChip('SHORTS')}
                                isActive={activeChip === 'SHORTS'}
                            />
                        </div>

                        <DropdownOrder onChange={(value) => setOrder(value as OrderType)} />
                    </div>

                    <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
                        {isReportLoading && (
                            <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                                리포트를 불러오는 중...
                            </div>
                        )}

                        {/* {reportError && (
                            <div className="col-span-full py-6 text-center font-body-14m text-red-error">
                                리포트 목록을 불러오지 못했습니다.
                            </div>
                        )} */}

                        {!isReportLoading && !reportError && reportData?.reportList.length === 0 && (
                            <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                                최근 리포트가 없습니다.
                            </div>
                        )}

                        {!isReportLoading &&
                            !reportError &&
                            reportData?.reportList?.map((report) => (
                                <VideoCard
                                    key={report.videoId}
                                    title={report.videoTitle}
                                    leftside="리포트"
                                    leftsideamount={formatKoreanNumber(report.reportCount, '개')}
                                    rightside="최근생성"
                                    rightsideamount={formatKoreanShortDate(report.uploadDate)}
                                    imageUrl={report.videoThumbnailUrl}
                                    onClick={() => {
                                        setSelectedVideoId(report.videoId)
                                        router.push('/reports/list')
                                    }}
                                />
                            ))}
                    </div>
                </div>
            )}

            {activeTab === 'recommend' && (
                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex flex-col gap-1">
                        <div className="font-title-18sb text-text-primary">내 분야 대형 채널의 최신 트렌드</div>
                        <div className="font-body-14r text-text-secondary">
                            카테고리 리더가 다루는 최신 주제로 시장의 흐름을 파악하고 기획에 참고해보세요
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
                        {isLeaderLoading && (
                            <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                                추천 영상을 불러오는 중...
                            </div>
                        )}

                        {/* {leaderError && (
                            <div className="col-span-full py-6 text-center font-body-14m text-red-error">
                                추천 영상을 불러오지 못했습니다.
                            </div>
                        )} */}

                        {!isLeaderLoading && !leaderError && leaderData?.length === 0 && (
                            <div className="col-span-full py-6 text-center font-body-14m text-text-secondary">
                                추천 영상이 없습니다.
                            </div>
                        )}

                        {!isLeaderLoading &&
                            !leaderError &&
                            leaderData?.map((video) => (
                                <VideoCard
                                    key={video.poolVideoId}
                                    title={video.title}
                                    period={video.publishedAt}
                                    rightside="조회수"
                                    // rightsideamount={`${video..toLocaleString()}회`}
                                    imageUrl={video.thumbnail}
                                    onClick={() => router.push('/reports/period')}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}
