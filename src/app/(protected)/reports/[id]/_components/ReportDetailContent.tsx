'use client'

import { getVideoInfo } from '@/api/video'
import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'
import { SkeletonBase } from '@/components/skeletonbase'
import { useReportProgress } from '@/hooks/useReportProgress'
import { useReportGenerationStore } from '@/stores/reportGenerationStore'
import { useVideoStore } from '@/stores/videoStore'
import type { VideoInfoResponse } from '@/types/videos'
import { formatKoreanDate, formatRelativeTime } from '@/utils/format'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import ReportProgressBar from '../../_components/ReportProgressBar'
import ReportTabs from '../../_components/ReportTabs'
import ReportDetailHeader from './ReportDetailHeader'

interface ReportDetailContentProps {
    reportId: number
    videoId: number
}

const VIDEO_TYPE_LABEL: Record<VideoInfoResponse['videoType'], string> = {
    ALL: 'All',
    LONG: 'Long-Form',
    SHORTS: 'Short-Form',
}

function VideoInfoSkeleton() {
    return (
        <div className="flex flex-col gap-4 tablet:flex-row" aria-label="영상 정보를 불러오는 중">
            <SkeletonBase sizeConfig="aspect-[328/184] h-auto w-full tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79" />
            <SkeletonBase sizeConfig="h-28 w-full flex-1 tablet:h-33.25 desktop:h-44.5" />
        </div>
    )
}

function VideoInfo({ video }: { video: VideoInfoResponse }) {
    return (
        <section className="flex flex-col gap-4 tablet:flex-row" aria-labelledby="report-video-title">
            <div
                role="img"
                aria-label={`${video.videoTitle} 썸네일`}
                className="aspect-[328/184] w-full rounded-[20px] bg-bg-3 bg-cover bg-center tablet:aspect-auto tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79"
                style={{ backgroundImage: `url(${video.videoThumbnailUrl})` }}
            />
            <div className="flex min-w-0 flex-1 flex-col items-start justify-start gap-1">
                <div className="rounded-[20px] bg-bg-2 px-2 py-1 font-caption-12m text-text-primary desktop:font-caption-14m">
                    {VIDEO_TYPE_LABEL[video.videoType]}
                </div>
                <h1 id="report-video-title" className="line-clamp-2 font-title-18sb text-text-primary">
                    {video.videoTitle}
                </h1>
                <p className="font-body-14r text-text-secondary desktop:font-body-16r">
                    업데이트: {formatKoreanDate(video.lastUpdatedDate)}
                </p>
                <div className="flex min-w-0 gap-1 font-body-14r text-text-secondary desktop:font-body-16r">
                    <span className="truncate">{video.ChannelName}</span>
                    <span aria-hidden>·</span>
                    <span className="shrink-0">{formatRelativeTime(video.videoCreatedDate)}</span>
                </div>
            </div>
        </section>
    )
}

export default function ReportDetailContent({ reportId, videoId: videoIdFromUrl }: ReportDetailContentProps) {
    const selectedVideoId = useVideoStore((state) => state.selectedVideoId)
    const addProcessingReport = useReportGenerationStore((state) => state.addReport)
    const removeProcessingReport = useReportGenerationStore((state) => state.removeReport)
    const videoId = Number.isInteger(videoIdFromUrl) && videoIdFromUrl > 0 ? videoIdFromUrl : (selectedVideoId ?? 0)
    const isValidVideoId = Number.isInteger(videoId) && videoId > 0
    const videoQuery = useQuery({
        queryKey: ['videos', videoId, 'info'],
        queryFn: () => getVideoInfo(videoId),
        enabled: isValidVideoId,
    })
    const {
        currentStep,
        isCompleted,
        isFailed,
        isProcessing,
        isStatusError,
        refetch,
    } = useReportProgress(reportId)

    useEffect(() => {
        if (isProcessing && isValidVideoId) {
            addProcessingReport({
                reportId,
                videoId,
                title: videoQuery.data?.videoTitle,
            })
            return
        }

        if (isCompleted) {
            removeProcessingReport(reportId)
        }
    }, [
        addProcessingReport,
        isCompleted,
        isProcessing,
        isValidVideoId,
        removeProcessingReport,
        reportId,
        videoId,
        videoQuery.data?.videoTitle,
    ])

    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            {isProcessing && <ReportProgressBar currentStep={currentStep} />}
            <Scroll as="main" className="flex-1">
                <ReportDetailHeader />
                <PageContent as="main" className="flex flex-col gap-4 pb-16 pt-4">
                    {videoQuery.data && <VideoInfo video={videoQuery.data} />}

                    {videoQuery.isPending && isValidVideoId && <VideoInfoSkeleton />}

                    {(!isValidVideoId || videoQuery.isError) && (
                        <div className="flex min-h-28 flex-col items-start justify-center gap-2 rounded-[20px] bg-bg-1 p-5">
                            <p className="font-body-14m text-text-primary">영상 정보를 불러오지 못했습니다.</p>
                            {videoQuery.isError && (
                                <button
                                    type="button"
                                    className="rounded-xl bg-bg-2 px-4 py-2 font-body-14m text-text-primary"
                                    onClick={() => void videoQuery.refetch()}
                                >
                                    다시 시도
                                </button>
                            )}
                        </div>
                    )}

                    {(isProcessing || isCompleted) && (
                        <>
                            {isProcessing && (
                                <span className="sr-only" aria-live="polite">
                                    리포트를 생성하고 있습니다.
                                </span>
                            )}
                            <ReportTabs reportId={reportId} isProcessing={isProcessing} />
                        </>
                    )}

                    {isFailed && (
                        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-[20px] bg-bg-1 text-center">
                            <p className="font-body-16sb text-text-primary">
                                {isStatusError
                                    ? '리포트 진행 상태를 확인하지 못했습니다.'
                                    : '리포트를 생성하지 못했습니다.'}
                            </p>
                            <p className="font-body-14r text-text-secondary">
                                {isStatusError
                                    ? '생성은 백그라운드에서 계속될 수 있습니다.'
                                    : '잠시 후 다시 확인해 주세요.'}
                            </p>
                            <button
                                type="button"
                                className="rounded-xl bg-bg-2 px-4 py-2 font-body-14m text-text-primary"
                                onClick={() => void refetch()}
                            >
                                다시 확인
                            </button>
                        </div>
                    )}
                </PageContent>
            </Scroll>
        </div>
    )
}
