'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getDashboardSuggestionDetail } from '@/api/dashboard'
import Scroll from '@/components/Scroll'
import { DashboardSuggestionDetailSkeleton } from '@/components/dashboard/DashboardSkeletons'
import PageContent from '@/components/layout/PageContent'
import InsightDetailContent from './_components/InsightDetailContent'
import InsightDetailHeader from './_components/InsightDetailHeader'

export default function InsightDetailPage() {
    const { id } = useParams<{ id: string }>()
    const suggestionId = Number(id)
    const isValidSuggestionId = Number.isInteger(suggestionId) && suggestionId > 0
    const { data: insight, isError, isPending } = useQuery({
        queryKey: ['dashboard', 'suggestions', suggestionId],
        queryFn: () => getDashboardSuggestionDetail(suggestionId),
        enabled: isValidSuggestionId,
    })

    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <Scroll as="main" className="flex-1">
                <PageContent className="flex flex-col gap-4 pb-8 desktop:pb-16">
                    <InsightDetailHeader />
                    {insight && <InsightDetailContent insight={insight} />}
                    {(isPending && isValidSuggestionId) && (
                        <DashboardSuggestionDetailSkeleton />
                    )}
                    {(!isValidSuggestionId || isError) && (
                        <p className="font-body-14r text-text-secondary">
                            제안 상세 내용을 불러오지 못했습니다.
                        </p>
                    )}
                </PageContent>
            </Scroll>
        </div>
    )
}
