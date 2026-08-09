'use client'

import XIcon from '@/assets/icons/X.svg'
import { deleteReport } from '@/api/video'
import { useReportProgress } from '@/hooks/useReportProgress'
import { type ProcessingReport, useReportGenerationStore } from '@/stores/reportGenerationStore'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

interface ReportProgressCardProps {
    item: ProcessingReport
    onHide: () => void
}

const STEP_TITLES: Record<number, string> = {
    1: '유튜브 데이터 수집 중..',
    2: '영상 지표 및 댓글 분석 중..',
    3: '이탈 구간과 알고리즘 최적화 분석 중..',
    4: '리포트 완성',
}

function ReportProgressCard({ item, onHide }: ReportProgressCardProps) {
    const router = useRouter()
    const hideReport = useReportGenerationStore((state) => state.hideReport)
    const removeReport = useReportGenerationStore((state) => state.removeReport)
    const reportTitle = item.title?.trim() || '선택한 영상'
    const {
        currentStep,
        isCompleted,
        isGenerationFailed,
        isProcessing,
        isStatusError,
        refetch,
    } = useReportProgress(item.reportId)
    const progressStyle = useMemo(() => {
        switch (currentStep) {
            case 1:
                return { duration: '10000ms', width: '25%' }
            case 2:
                return { duration: '15000ms', width: '50%' }
            case 3:
                return { duration: '20000ms', width: '90%' }
            case 4:
                return { duration: '100ms', width: '100%' }
            default:
                return { duration: '0ms', width: '5%' }
        }
    }, [currentStep])

    useEffect(() => {
        if (!isGenerationFailed) return

        removeReport(item.reportId)
        void deleteReport(item.reportId).catch(() => undefined)
    }, [isGenerationFailed, item.reportId, removeReport])

    const moveToReport = () => {
        router.push(`/reports/${item.reportId}?videoId=${item.videoId}`)
        if (isCompleted) {
            removeReport(item.reportId)
        }
    }

    const closeProgress = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        hideReport(item.reportId)
        onHide()
    }

    const closeCompleted = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        removeReport(item.reportId)
    }

    if (isGenerationFailed) return null

    if (isCompleted) {
        return (
            <article
                className="pointer-events-auto relative mx-auto flex w-[calc(100%-16px)] flex-col gap-4 rounded-[20px] bg-bg-2 p-6 shadow-2xl tablet:w-96"
                aria-live="polite"
            >
                <button
                    type="button"
                    aria-label="완료 알림 닫기"
                    className="absolute right-4 top-4 size-6 cursor-pointer text-icon-primary"
                    onClick={closeCompleted}
                >
                    <XIcon className="size-full" />
                </button>

                <div className="flex flex-col gap-2 pr-7">
                    <h2 className="font-title-20sb text-text-primary">리포트 생성이 완료되었습니다.</h2>
                    <p className="font-body-16r text-text-secondary">[{reportTitle}] 리포트가 완성되었습니다.</p>
                </div>

                <button
                    type="button"
                    className="flex h-10 w-full cursor-pointer items-center justify-center rounded-[10px] bg-primary-60 px-4 font-body-16sb text-text-primary"
                    onClick={(event) => {
                        event.stopPropagation()
                        moveToReport()
                    }}
                >
                    리포트로 이동
                </button>
            </article>
        )
    }

    if (item.isHidden) return null

    if (isStatusError) {
        return (
            <article className="pointer-events-auto relative mx-auto flex w-[calc(100%-16px)] flex-col gap-4 rounded-[20px] bg-bg-2 p-6 shadow-2xl tablet:w-96 desktop:w-[486px]">
                <div className="flex flex-col gap-2">
                    <h2 className="font-title-20sb text-text-primary">리포트 진행 상태를 확인하지 못했습니다.</h2>
                    <p className="font-body-16r text-text-secondary">
                        생성은 백그라운드에서 계속될 수 있습니다. 잠시 후 다시 확인해 주세요.
                    </p>
                </div>
                <button
                    type="button"
                    className="flex h-10 w-full cursor-pointer items-center justify-center rounded-[10px] bg-primary-60 px-4 font-body-16sb text-text-primary"
                    onClick={() => void refetch()}
                >
                    다시 확인
                </button>
            </article>
        )
    }

    if (!isProcessing) return null

    return (
        <article
            className="pointer-events-auto relative mx-auto flex w-[calc(100%-16px)] cursor-pointer flex-col gap-4 rounded-[20px] bg-bg-2 p-6 shadow-2xl tablet:w-96 desktop:w-[486px]"
            onClick={moveToReport}
        >
            <button
                type="button"
                aria-label="진행 알림 닫기"
                className="absolute right-4 top-4 size-6 cursor-pointer text-icon-primary"
                onClick={closeProgress}
            >
                <XIcon className="size-full" />
            </button>

            <div className="flex flex-col gap-2 pr-7">
                <h2 className="font-title-20sb text-text-primary">{STEP_TITLES[currentStep]}</h2>
                <p className="font-body-16r text-text-secondary">[{reportTitle}] 리포트를 생성 중입니다.</p>
                <div
                    className="h-1 w-full overflow-hidden rounded-full bg-bg-3"
                    role="progressbar"
                    aria-label="리포트 생성 진행률"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Number.parseInt(progressStyle.width, 10)}
                >
                    <div
                        className="h-full rounded-full bg-primary-60 transition-[width] ease-out"
                        style={{
                            transitionDuration: progressStyle.duration,
                            width: progressStyle.width,
                        }}
                    />
                </div>
            </div>

            <button
                type="button"
                className="flex h-10 w-full cursor-pointer items-center justify-center rounded-[10px] bg-primary-60 px-4 font-body-16sb text-text-primary"
                onClick={(event) => {
                    event.stopPropagation()
                    moveToReport()
                }}
            >
                리포트로 이동
            </button>
        </article>
    )
}

export default function GlobalReportProgress() {
    const pathname = usePathname()
    const reports = useReportGenerationStore((state) => state.reports)
    const [showBackgroundToast, setShowBackgroundToast] = useState(false)

    useEffect(() => {
        if (!showBackgroundToast) return

        const timeoutId = window.setTimeout(() => setShowBackgroundToast(false), 6000)
        return () => window.clearTimeout(timeoutId)
    }, [showBackgroundToast])

    return (
        <>
            <div className="pointer-events-none fixed bottom-2 right-0 z-50 flex w-full flex-col-reverse gap-2 tablet:bottom-8 tablet:right-8 tablet:w-auto tablet:gap-4">
                {reports.map((report) => {
                    if (pathname === `/reports/${report.reportId}`) return null

                    return (
                        <ReportProgressCard
                            key={report.reportId}
                            item={report}
                            onHide={() => setShowBackgroundToast(true)}
                        />
                    )
                })}
            </div>

            {showBackgroundToast && (
                <div
                    className="fixed left-1/2 top-4 z-[60] w-[calc(100%-32px)] max-w-md -translate-x-1/2 rounded-[20px] bg-bg-3 px-5 py-4 shadow-2xl"
                    role="status"
                >
                    <p className="font-body-16sb text-text-primary">리포트 생성이 백그라운드에서 계속됩니다.</p>
                    <p className="mt-1 font-body-14r text-text-secondary">
                        리포트는 &apos;내 리포트&apos;에서 확인하실 수 있습니다.
                    </p>
                </div>
            )}
        </>
    )
}
