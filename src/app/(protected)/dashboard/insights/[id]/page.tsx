import { notFound } from 'next/navigation'
import Scroll from '@/components/Scroll'
import PageContent from '@/components/layout/PageContent'
import { dashboardInsights, getDashboardInsight } from '../../_data/insights'
import InsightDetailContent from './_components/InsightDetailContent'
import InsightDetailHeader from './_components/InsightDetailHeader'

interface InsightDetailPageProps {
    params: Promise<{ id: string }>
}

export function generateStaticParams() {
    return dashboardInsights.map((insight) => ({ id: insight.id }))
}

export default async function InsightDetailPage({ params }: InsightDetailPageProps) {
    const { id } = await params
    const insight = getDashboardInsight(id)

    if (!insight) notFound()

    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <Scroll as="main" className="flex-1">
                <PageContent className="flex flex-col gap-4 pb-8 desktop:pb-16">
                    <InsightDetailHeader />
                    <InsightDetailContent insight={insight} />
                </PageContent>
            </Scroll>
        </div>
    )
}
