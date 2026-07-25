'use client'

import { getReportAnalysis } from '@/api/report'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import AnalysisTab from './AnalysisTab'
import OverviewTab from './OverviewTab'
import OverviewTabSkeleton from './OverviewTabSkeleton'
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

    return (
        <div className="flex flex-col gap-4">
            <ReportTabBar activeTab={activeTab} onChange={setActiveTab} />

            {isProcessing && activeTab === 'overview' && <OverviewTabSkeleton />}

            {isProcessing && activeTab === 'analysis' && <AnalysisTab isPending={true} isError={false} />}

            {!isProcessing && activeTab === 'overview' && <OverviewTab />}

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
