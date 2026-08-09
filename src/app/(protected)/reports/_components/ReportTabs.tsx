'use client'

import { getReportAnalysis, getReportOVerview, getReportSummary } from '@/api/report'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import AnalysisTab from './AnalysisTab'
import OverviewTab from './OverviewTab'
import ReportTabBar, { type ReportTabType } from './ReportTabBar'

interface ReportTabsProps {
    isProcessing?: boolean
    reportId: number
}

export default function ReportTabs({ isProcessing = false, reportId }: ReportTabsProps) {
    const [activeTab, setActiveTab] = useState<ReportTabType>('overview')
    const isValidReportId = Number.isInteger(reportId) && reportId > 0
    const analysisQuery = useQuery({
        queryKey: ['reports', reportId, 'analysis'],
        queryFn: () => getReportAnalysis(reportId),
        enabled: isValidReportId && !isProcessing,
    })
    const overviewQuery = useQuery({
        queryKey: ['reports', reportId, 'overview'],
        queryFn: () => getReportOVerview(reportId),
        enabled: isValidReportId,
    })
    const reportSummaryQuery = useQuery({
        queryKey: ['reports', reportId, 'summary'],
        queryFn: () => getReportSummary(reportId),
        enabled: isValidReportId,
    })

    return (
        <div className="flex flex-col gap-4">
            <ReportTabBar activeTab={activeTab} onChange={setActiveTab} />

            {isProcessing && activeTab === 'overview' && <OverviewTab isPending={true} />}

            {isProcessing && activeTab === 'analysis' && <AnalysisTab isPending={true} isError={false} />}

            {!isProcessing && activeTab === 'overview' && (
                <OverviewTab
                    overview={overviewQuery.data}
                    summary={reportSummaryQuery.data}
                    isPending={overviewQuery.isPending}
                />
            )}

            {!isProcessing && activeTab === 'analysis' && (
                <AnalysisTab
                    analysis={analysisQuery.data}
                    isPending={analysisQuery.isPending}
                    isError={!isValidReportId || analysisQuery.isError}
                    onRetry={isValidReportId ? () => void analysisQuery.refetch() : undefined}
                />
            )}
        </div>
    )
}
