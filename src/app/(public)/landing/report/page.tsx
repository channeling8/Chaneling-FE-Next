'use client'

import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { generateDummyReportData } from '@/api/dummy-report'
import type { ApiResponse } from '@/types'
import BackIcon from '@/assets/icons/back.svg'
import ReportDetailSkeleton from '@/app/(protected)/reports/_components/ReportDetailSkeleton'
import DummyReportContent from './_components/DummyReportContent'

function BackToLanding() {
    return (
        <Link
            href="/"
            className="flex h-6 w-8 items-center justify-center"
            aria-label="랜딩 페이지로 돌아가기"
        >
            <BackIcon />
        </Link>
    )
}

function LoadingView({ currentStep }: { currentStep: number }) {
    return (
        <ReportDetailSkeleton
            currentStep={currentStep}
            leading={<BackToLanding />}
            title="상세 분석 리포트"
            statusMessage="체험 리포트를 생성하고 있습니다."
        />
    )
}

function getErrorMessage(error: unknown) {
    if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
        return error.response?.data.message || '체험 리포트를 생성하지 못했습니다.'
    }

    return error instanceof Error ? error.message : '체험 리포트를 생성하지 못했습니다.'
}

function DummyReportError({ message, onRetry }: { message: string; onRetry?: () => void }) {
    return (
        <div className="flex min-h-screen flex-col bg-bg-0">
            <header className="sticky top-0 z-40 flex min-h-14 items-center gap-2 bg-bg-0 px-4 py-3 tablet:px-5 tablet:py-4 desktop:px-16 desktop:py-5">
                <BackToLanding />
                <h1 className="font-title-18sb text-text-primary">상세 분석 리포트</h1>
            </header>
            <main className="flex flex-1 items-center justify-center px-4 py-16">
                <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-[20px] bg-bg-1 p-6 text-center">
                    <h2 className="font-title-18sb text-text-primary">리포트를 생성하지 못했어요</h2>
                    <p className="font-body-14r text-text-secondary">{message}</p>
                    <div className="mt-2 flex w-full gap-2">
                        <Link
                            href="/"
                            className="flex h-10 flex-1 items-center justify-center rounded-xl bg-bg-2 px-4 font-body-14m text-text-primary"
                        >
                            링크 다시 입력
                        </Link>
                        {onRetry && (
                            <button
                                type="button"
                                onClick={onRetry}
                                className="flex h-10 flex-1 items-center justify-center rounded-xl bg-primary-60 px-4 font-body-14m text-text-primary"
                            >
                                다시 시도
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

function DummyReportPageContent() {
    const searchParams = useSearchParams()
    const url = searchParams.get('url')?.trim() ?? ''
    const [currentStep, setCurrentStep] = useState(1)
    const [requestedAt, setRequestedAt] = useState(() => new Date())
    const reportQuery = useQuery({
        queryKey: ['dummy-report', url],
        queryFn: () => generateDummyReportData(url),
        enabled: Boolean(url),
        retry: false,
        staleTime: Number.POSITIVE_INFINITY,
    })

    useEffect(() => {
        if (!reportQuery.isPending || !url) return

        const analysisTimer = window.setTimeout(() => setCurrentStep(2), 10_000)
        const optimizationTimer = window.setTimeout(() => setCurrentStep(3), 35_000)

        return () => {
            window.clearTimeout(analysisTimer)
            window.clearTimeout(optimizationTimer)
        }
    }, [reportQuery.isPending, url])

    if (!url) {
        return <DummyReportError message="분석할 유튜브 영상 링크를 다시 입력해주세요." />
    }

    if (reportQuery.isPending) {
        return <LoadingView currentStep={currentStep} />
    }

    if (reportQuery.isError || !reportQuery.data) {
        return (
            <DummyReportError
                message={getErrorMessage(reportQuery.error)}
                onRetry={() => {
                    setCurrentStep(1)
                    setRequestedAt(new Date())
                    void reportQuery.refetch()
                }}
            />
        )
    }

    return <DummyReportContent data={reportQuery.data} requestedAt={requestedAt} />
}

export default function DummyReportPage() {
    return (
        <Suspense fallback={<LoadingView currentStep={1} />}>
            <DummyReportPageContent />
        </Suspense>
    )
}
