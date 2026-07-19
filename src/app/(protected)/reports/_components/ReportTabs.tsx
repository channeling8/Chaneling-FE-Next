'use client'

import { getReportAnalysis } from '@/api/report'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import AnalysisTab from './AnalysisTab'
import OverviewTab from './OverviewTab'

type TabType = 'overview' | 'analysis'

const TABS = [
    { id: 'overview', label: '개요' },
    { id: 'analysis', label: '분석' },
] as const

interface ReportTabsProps {
    reportId: number
}

export default function ReportTabs({ reportId }: ReportTabsProps) {
    const [activeTab, setActiveTab] = useState<TabType>('overview')
    const isValidReportId = Number.isInteger(reportId) && reportId > 0
    const analysisQuery = useQuery({
        queryKey: ['reports', reportId, 'analysis'],
        queryFn: () => getReportAnalysis(reportId),
        enabled: isValidReportId,
    })

    const tabBaseClass =
        'flex flex-1 p-2 justify-center items-center rounded-2xl font-body-16sb desktop:font-body-18sb cursor-pointer transition-colors'

    return (
        <div className="flex flex-col gap-4">
            <div className="flex p-1 items-center rounded-[20px] bg-bg-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={
                            tabBaseClass +
                            ' ' +
                            (activeTab === tab.id ? 'bg-bg-2 text-text-primary' : 'bg-transparent text-text-tertiary')
                        }
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && <OverviewTab />}

            {activeTab === 'analysis' && (
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
