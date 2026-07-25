'use client'
import Back from '@/assets/icons/back.svg'
import Bin from '@/assets/icons/bin.svg'
import Plus from '@/assets/icons/plus.svg'
import { useEffect, useState } from 'react'
import PageContent from '@/components/layout/PageContent'
import ReportBox from '../_components/ReportBox'
import { useRouter } from 'next/navigation'
import { getVideoInfo } from '@/api/video'
import { useVideoStore } from '@/stores/videoStore'
import { VideoInfoResponse } from '@/types/videos'
import { formatKoreanDate, formatKoreanDateTime, formatRelativeTime } from '@/utils/format'
import { useGetVideoReportList } from '@/hooks/useGetVideoReportList'

export default function ReportList() {
    const router = useRouter()
    const [isDelete, setIsDelete] = useState(false)

    const selectedVideoId = useVideoStore((state) => state.selectedVideoId)
    const [videoInfo, setVideoInfo] = useState<VideoInfoResponse | null>(null)

    const videoId = selectedVideoId ?? 0

    const { data } = useGetVideoReportList({ videoId: videoId, page: 1, size: 8 })

    useEffect(() => {
        async function fetchVideoInfo() {
            const video = await getVideoInfo(videoId)
            setVideoInfo(video)
        }

        void fetchVideoInfo()
    }, [videoId])

    if (selectedVideoId == null) {
        return null
    }
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

                        <h1 className="font-title-18sb text-text-primary">리포트 상세 목록</h1>
                    </div>
                    <div className="flex gap-2">
                        <Bin onClick={() => setIsDelete((prev) => !prev)} />
                        <button
                            type="button"
                            disabled={!videoInfo}
                            onClick={() => {
                                if (!videoInfo) return

                                router.push(
                                    `/reports/period?videoId=${selectedVideoId}&uploadDate=${encodeURIComponent(videoInfo.videoCreatedDate)}`
                                )
                            }}
                            className="flex disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="리포트 생성"
                        >
                            <Plus />
                        </button>
                    </div>
                </header>
                <div className="pt-2 flex">
                    <p className="font-body-16m text-text-primary">{data?.totalReportCount}</p>
                    <p className="font-body-16m text-text-secondary">개의 리포트</p>
                </div>
                {/* 영상 정보  */}
                {videoInfo && (
                    <div className="flex gap-4 flex-col tablet:flex-row">
                        <img
                            className="w-82 h-46 tablet:w-59.25 tablet:h-33.25 desktop:w-79 desktop:h-44.5 rounded-[20px] object-cover"
                            src={videoInfo?.videoThumbnailUrl}
                            alt={videoInfo?.videoTitle ?? '영상 썸네일'}
                        ></img>
                        <div className="flex flex-col gap-1 justify-start items-start">
                            <div className="px-2 py-1 rounded-[20px] bg-bg-2 font-caption-12m desktop:font-caption-14m text-text-primary">
                                {videoInfo.videoType == 'LONG' ? 'Long-Form' : 'Short-Form'}
                            </div>
                            <div className="font-title-14sb desktop:font-title-20sb text-text-primary">
                                {videoInfo?.videoTitle}
                            </div>

                            <div className="flex gap-1">
                                <div className="font-body-14r desktop:font-body-16r text-text-secondary">
                                    업데이트 :
                                </div>
                                <div className="font-body-14r desktop:font-body-16r text-text-secondary">
                                    {formatKoreanDate(videoInfo?.videoCreatedDate)}
                                </div>
                            </div>

                            <div className="flex gap-1">
                                <div className="font-body-14r desktop:font-body-16r text-text-secondary">
                                    {videoInfo?.ChannelName}
                                </div>
                                <div className="font-body-14r desktop:font-body-16r text-text-secondary">·</div>
                                <div className="font-body-14r desktop:font-body-16r text-text-secondary">
                                    {formatRelativeTime(videoInfo?.videoCreatedDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {videoInfo && (
                    <div className="flex flex-col gap-2">
                        {data?.reportList.map((report) => (
                            <ReportBox
                                key={report.reportId}
                                generatedDate={formatKoreanDateTime(report.createdAt)}
                                startDate={report.startDate}
                                endDate={report.endDate}
                                isDelete={isDelete}
                                reportId={report.reportId}
                                videoId={videoInfo?.videoId}
                            />
                        ))}
                    </div>
                )}
            </PageContent>
        </div>
    )
}
