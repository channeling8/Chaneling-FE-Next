'use client'

import { getReportStatus, type ReportGenerationStatus } from '@/api/report'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const REPORT_STATUS_POLL_INTERVAL = 3_000
const REPORT_STATUS_ERROR_RETRY_INTERVAL = 10_000

function isReportCompleted(status?: ReportGenerationStatus) {
    if (!status) return false

    return (
        status.overviewStatus === 'COMPLETED' &&
        status.analysisStatus === 'COMPLETED' &&
        (status.ideaStatus === undefined || status.ideaStatus === 'COMPLETED')
    )
}

function isReportFailed(status?: ReportGenerationStatus) {
    if (!status) return false

    return [status.overviewStatus, status.analysisStatus, status.ideaStatus].some((step) => step === 'FAILED')
}

function getCurrentStep(status?: ReportGenerationStatus) {
    if (!status) return 1
    if (isReportCompleted(status)) return 4
    if (status.overviewStatus === 'COMPLETED' || status.analysisStatus === 'COMPLETED') return 3
    return 2
}

export function useReportProgress(reportId: number) {
    const isValidReportId = Number.isInteger(reportId) && reportId > 0
    const statusQuery = useQuery({
        queryKey: ['reports', reportId, 'status'],
        queryFn: () => getReportStatus(reportId),
        enabled: isValidReportId,
        staleTime: 0,
        retry: false,
        refetchInterval: (query) => {
            if (query.state.status === 'error') return REPORT_STATUS_ERROR_RETRY_INTERVAL

            const status = query.state.data
            return isReportCompleted(status) || isReportFailed(status) ? false : REPORT_STATUS_POLL_INTERVAL
        },
        refetchIntervalInBackground: true,
    })

    const isCompleted = isReportCompleted(statusQuery.data)
    const hasGenerationFailed = isReportFailed(statusQuery.data)
    const isStatusError = statusQuery.isError
    const isGenerationFailed = !isValidReportId || hasGenerationFailed
    const isFailed = isStatusError || isGenerationFailed
    const isProcessing = isValidReportId && !isFailed && !isCompleted
    const currentStep = useMemo(() => getCurrentStep(statusQuery.data), [statusQuery.data])

    return {
        currentStep,
        isCompleted,
        isFailed,
        isGenerationFailed,
        isProcessing,
        isStatusError,
        refetch: statusQuery.refetch,
    }
}
