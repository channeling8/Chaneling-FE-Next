'use client'

import type { DummyReportData } from '@/api/dummy-report'
import AnalysisTab from '@/app/(protected)/reports/_components/AnalysisTab'
import ReportTabBar, { type ReportTabType } from '@/app/(protected)/reports/_components/ReportTabBar'
import ReportVideoInfo from '@/app/(protected)/reports/_components/ReportVideoInfo'
import ReportDetailHeader from '@/app/(protected)/reports/[id]/_components/ReportDetailHeader'
import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'
import { useState } from 'react'
import DummyOverviewTab from './DummyOverviewTab'

export default function DummyReportContent({ data, requestedAt }: { data: DummyReportData; requestedAt: Date }) {
    const [activeTab, setActiveTab] = useState<ReportTabType>('overview')

    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <ReportDetailHeader />
                <PageContent as="main" className="flex flex-col gap-4 pb-16 pt-4">
                    <ReportVideoInfo video={data.video} requestedAt={requestedAt} />
                    <div className="flex flex-col gap-4">
                        <ReportTabBar activeTab={activeTab} onChange={setActiveTab} />
                        {activeTab === 'overview' ? (
                            <DummyOverviewTab data={data.overview} />
                        ) : (
                            <AnalysisTab
                                analysis={data.analysis}
                                isPending={false}
                                isError={false}
                                lockViewerRetentionDetails
                                lockAlgorithmImprovements
                            />
                        )}
                    </div>
                </PageContent>
            </Scroll>
        </div>
    )
}
