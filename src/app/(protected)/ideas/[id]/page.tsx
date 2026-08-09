'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { changeIdeaBookmark, getIdeaDetail } from '@/api/ideas'
import type { IdeaDetail } from '@/api/ideas'
import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'
import { SkeletonBase } from '@/components/Skeletonbase'
import { useIdeasStore } from '@/stores/ideasStore'
import IdeaDetailContent from './_components/IdeaDetailContent'
import IdeaDetailHeader from './_components/IdeaDetailHeader'

export default function IdeaDetailPage() {
    const { id } = useParams<{ id: string }>()
    const ideaId = Number(id)
    const isValidIdeaId = Number.isInteger(ideaId) && ideaId > 0
    const queryClient = useQueryClient()
    const updateGeneratedIdeaBookmark = useIdeasStore((state) => state.updateGeneratedIdeaBookmark)
    const ideaQuery = useQuery({
        queryKey: ['ideas', 'detail', ideaId],
        queryFn: () => getIdeaDetail(ideaId),
        enabled: isValidIdeaId,
    })
    const bookmarkMutation = useMutation({
        mutationFn: () => changeIdeaBookmark(ideaId),
        onSuccess: async (bookmarkResult) => {
            updateGeneratedIdeaBookmark(bookmarkResult.ideaId, bookmarkResult.isBookmarked)
            queryClient.setQueryData<IdeaDetail>(['ideas', 'detail', ideaId], (previousIdea) =>
                previousIdea
                    ? {
                          ...previousIdea,
                          isBookmarked: bookmarkResult.isBookmarked,
                      }
                    : previousIdea
            )
            await queryClient.invalidateQueries({ queryKey: ['ideas', 'bookmarks'] })
        },
    })

    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <Scroll as="main" className="flex-1">
                <PageContent className="flex flex-col gap-4 pb-8 desktop:pb-16">
                    <IdeaDetailHeader
                        isBookmarked={ideaQuery.data?.isBookmarked}
                        isBookmarkPending={bookmarkMutation.isPending}
                        onBookmarkClick={() => bookmarkMutation.mutate()}
                    />

                    {ideaQuery.data && <IdeaDetailContent idea={ideaQuery.data} />}

                    {ideaQuery.isPending && isValidIdeaId && (
                        <div className="flex flex-col gap-4">
                            <SkeletonBase sizeConfig="h-5 w-36" />
                            <SkeletonBase sizeConfig="h-7 w-2/3" />
                            <SkeletonBase sizeConfig="h-60 w-full" />
                        </div>
                    )}

                    {(!isValidIdeaId || ideaQuery.isError) && (
                        <div className="flex flex-col items-start gap-3">
                            <p className="font-body-14r text-text-secondary">아이디어 상세를 불러오지 못했습니다.</p>
                            {ideaQuery.isError && (
                                <button
                                    type="button"
                                    className="rounded-xl bg-bg-1 px-4 py-2 font-body-14m text-text-primary"
                                    onClick={() => void ideaQuery.refetch()}
                                >
                                    다시 시도
                                </button>
                            )}
                        </div>
                    )}
                </PageContent>
            </Scroll>
        </div>
    )
}
