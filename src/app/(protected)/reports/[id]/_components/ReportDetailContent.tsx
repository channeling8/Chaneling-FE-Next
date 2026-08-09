'use client'

import { getVideoInfo } from '@/api/video'
import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'
import { SkeletonBase } from '@/components/Skeletonbase'
import { useReportProgress } from '@/hooks/useReportProgress'
import { useReportGenerationStore } from '@/stores/reportGenerationStore'
import { useVideoStore } from '@/stores/videoStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import ReportProgressBar from '../../_components/ReportProgressBar'
import ReportTabs from '../../_components/ReportTabs'
import ReportVideoInfo from '../../_components/ReportVideoInfo'
import ReportDetailHeader from './ReportDetailHeader'

interface ReportDetailContentProps {
    reportId: number
    videoId: number
}

function VideoInfoSkeleton() {
    return (
        <div className="flex flex-col gap-4 tablet:flex-row" aria-label="영상 정보를 불러오는 중">
            <SkeletonBase sizeConfig="aspect-[328/184] h-auto w-full tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79" />
            <SkeletonBase sizeConfig="h-28 w-full flex-1 tablet:h-33.25 desktop:h-44.5" />
        </div>
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
                    {videoQuery.data && <ReportVideoInfo video={videoQuery.data} />}

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
