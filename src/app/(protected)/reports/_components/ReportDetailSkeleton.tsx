import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import { SkeletonBase } from '@/components/Skeletonbase'
import OverviewTabSkeleton from './OverviewTabSkeleton'
import ReportProgressBar from './ReportProgressBar'
import ReportTabBar from './ReportTabBar'

interface ReportDetailSkeletonProps {
    currentStep?: number
    statusMessage: string
    title: string
}

export default function ReportDetailSkeleton({ currentStep, statusMessage, title }: ReportDetailSkeletonProps) {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3" aria-busy="true" aria-live="polite">
            <Header title={title} className="tablet:min-h-16 desktop:min-h-18" />
            {currentStep !== undefined && <ReportProgressBar currentStep={currentStep} />}
            <PageContent as="main" className="flex flex-1 flex-col gap-4 pb-16 pt-4">
                <span className="sr-only">{statusMessage}</span>
                <div className="flex flex-col gap-4 tablet:flex-row">
                    <SkeletonBase sizeConfig="aspect-[328/184] h-auto w-full tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79" />
                    <SkeletonBase sizeConfig="h-28 w-full flex-1 tablet:h-33.25 desktop:h-44.5" />
                </div>
                <div className="flex flex-col gap-4">
                    <ReportTabBar activeTab="overview" disabled />
                    <OverviewTabSkeleton />
                </div>
            </PageContent>
        </div>
    )
}
