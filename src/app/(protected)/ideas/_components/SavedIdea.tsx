import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { changeIdeaBookmark, getBookmarkedIdeas } from '@/api/ideas'
import type { IdeaDetail, IdeaSort } from '@/api/ideas'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import SavedIdeaCard from './SavedIdeaCard'
import SearchBar from './SearchBar'
import DropdownOrder from '@/components/dropdown-order'
import { SkeletonBase } from '@/components/skeletonbase'
import { useIdeasStore } from '@/stores/ideasStore'

export default function SavedIdea() {
    const router = useRouter()
    const [searchKeyword, setSearchKeyword] = useState('')
    const [debouncedKeyword, setDebouncedKeyword] = useState('')
    const [sort, setSort] = useState<IdeaSort>('latest')
    const queryClient = useQueryClient()
    const updateGeneratedIdeaBookmark = useIdeasStore((state) => state.updateGeneratedIdeaBookmark)

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedKeyword(searchKeyword.trim())
        }, 300)

        return () => window.clearTimeout(timeoutId)
    }, [searchKeyword])

    const ideasQuery = useInfiniteQuery({
        queryKey: ['ideas', 'bookmarks'],
        queryFn: ({ pageParam }) =>
            getBookmarkedIdeas({
                page: pageParam,
                size: 6,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined),
    })
    const bookmarkMutation = useMutation({
        mutationFn: changeIdeaBookmark,
        onSuccess: async (bookmarkResult) => {
            updateGeneratedIdeaBookmark(bookmarkResult.ideaId, bookmarkResult.isBookmarked)
            queryClient.setQueryData<IdeaDetail>(['ideas', 'detail', bookmarkResult.ideaId], (previousIdea) =>
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

    const ideas = (ideasQuery.data?.pages.flatMap((page) => page.ideas) ?? [])
        .filter((idea) => {
            if (!debouncedKeyword) return true

            const normalizedKeyword = debouncedKeyword.toLocaleLowerCase()
            return [idea.title, idea.contentPreview, ...idea.tags].some((value) =>
                value.toLocaleLowerCase().includes(normalizedKeyword)
            )
        })
        .sort((firstIdea, secondIdea) => {
            const firstCreatedAt = new Date(firstIdea.createdAt).getTime()
            const secondCreatedAt = new Date(secondIdea.createdAt).getTime()
            return sort === 'latest' ? secondCreatedAt - firstCreatedAt : firstCreatedAt - secondCreatedAt
        })
    const totalIdeas = debouncedKeyword ? ideas.length : (ideasQuery.data?.pages[0]?.total ?? 0)

    return (
        <section className="flex w-full flex-col justify-start gap-2">
            <h1 className="text-text-primary font-title-18sb">저장한 아이디어</h1>
            <div className="flex flex-col gap-4">
                <SearchBar value={searchKeyword} onChange={setSearchKeyword} />
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="text-text-primary font-body-14m">{totalIdeas}</div>
                        <div className="text-text-secondary font-body-14m">개의 아이디어</div>
                    </div>
                    <DropdownOrder
                        options={['최신순', '오래된순']}
                        onChange={(option) => setSort(option === '오래된순' ? 'oldest' : 'latest')}
                    />
                </div>

                {ideasQuery.isPending && (
                    <div className="flex flex-col gap-3">
                        {[0, 1, 2].map((index) => (
                            <SkeletonBase key={index} sizeConfig="h-50 w-full" />
                        ))}
                    </div>
                )}

                {ideasQuery.isError && (
                    <div className="flex min-h-50 flex-col items-center justify-center gap-3 text-center">
                        <p className="font-body-14r text-text-secondary">아이디어를 불러오지 못했습니다.</p>
                        <button
                            type="button"
                            className="rounded-xl bg-bg-1 px-4 py-2 font-body-14m text-text-primary"
                            onClick={() => void ideasQuery.refetch()}
                        >
                            다시 시도
                        </button>
                    </div>
                )}

                {!ideasQuery.isPending && !ideasQuery.isError && ideas.length === 0 && (
                    <div className="flex min-h-50 items-center justify-center text-center font-body-14r text-text-secondary">
                        {debouncedKeyword ? '검색 결과가 없습니다.' : '저장한 아이디어가 없습니다.'}
                    </div>
                )}

                {ideas.map((idea) => (
                    <SavedIdeaCard
                        key={idea.ideaId}
                        idea={idea}
                        onClick={() => router.push(`/ideas/${idea.ideaId}`)}
                        onBookmarkClick={() => bookmarkMutation.mutate(idea.ideaId)}
                        isBookmarkPending={bookmarkMutation.isPending && bookmarkMutation.variables === idea.ideaId}
                    />
                ))}

                {ideasQuery.hasNextPage && (
                    <button
                        type="button"
                        disabled={ideasQuery.isFetchingNextPage}
                        className="w-full rounded-[20px] bg-bg-1 px-4 py-3 font-body-14m text-text-primary disabled:text-text-disabled"
                        onClick={() => void ideasQuery.fetchNextPage()}
                    >
                        {ideasQuery.isFetchingNextPage ? '불러오는 중...' : '더 보기'}
                    </button>
                )}
            </div>
        </section>
    )
}
