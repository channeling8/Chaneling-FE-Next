import { Footer } from '@/components/Footer'
import Scroll from '@/components/Scroll'
import PageContent from '@/components/layout/PageContent'
import {
    DashboardChartSkeleton,
    DashboardDateSkeleton,
    DashboardMetricCardsSkeleton,
    DashboardProfileCardSkeleton,
    DashboardSuggestionsSkeleton,
} from './DashboardSkeletons'

export default function DashboardLoadingView() {
    return (
        <div className="flex h-screen w-full flex-col bg-bg-0">
            <Scroll as="main" className="flex-1">
                <PageContent className="mx-auto flex flex-col gap-8 pb-8 pt-4 desktop:pb-16 desktop:pt-8">
                    <section className="flex w-full flex-col gap-2">
                        <DashboardDateSkeleton />
                        <div className="grid w-full grid-cols-1 gap-2 tablet:grid-cols-[274px_minmax(0,1fr)] desktop:grid-cols-[298px_minmax(0,1fr)]">
                            <DashboardProfileCardSkeleton />
                            <DashboardMetricCardsSkeleton />
                        </div>
                    </section>
                    <DashboardChartSkeleton />
                    <DashboardSuggestionsSkeleton />
                </PageContent>
                <Footer />
            </Scroll>
        </div>
    )
}
