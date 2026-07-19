import { changeIdeaBookmark, getIdeaDetail } from '@/api/ideas'
import Bookmarked from '@/assets/icons/bookmarked.svg'
import BookmarkDefault from '@/assets/icons/bookmark_default.svg'
import Back from '@/assets/icons/back.svg'
import { SkeletonBase } from '@/components/skeletonbase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useIdeasStore } from '@/stores/ideasStore'
import { formatIdeaDate, formatIdeaTag } from './idea-format'

interface IdeaDetailViewProps {
    ideaId: number
    onBack: () => void
}

export default function IdeaDetailView({ ideaId, onBack }: IdeaDetailViewProps) {
    const queryClient = useQueryClient()
    const updateGeneratedIdeaBookmark = useIdeasStore((state) => state.updateGeneratedIdeaBookmark)
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ['ideas', 'detail', ideaId],
        queryFn: () => getIdeaDetail(ideaId),
    })
    const bookmarkMutation = useMutation({
        mutationFn: () => changeIdeaBookmark(ideaId),
        onSuccess: async (bookmarkResult) => {
            updateGeneratedIdeaBookmark(bookmarkResult.ideaId, bookmarkResult.isBookmarked)
            queryClient.setQueryData(['ideas', 'detail', ideaId], (previousIdea: typeof data) =>
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
        <div className="flex flex-col gap-2 w-full h-full bg-bg-1 fixed inset-0 z-999 overflow-y-auto">
            <div className="sticky px-4 py-3 mt-1.75 flex flex-row justify-between">
                <div className="flex gap-2">
                    <button
                        type="button"
                        aria-label="아이디어 목록으로 돌아가기"
                        onClick={onBack}
                        className="cursor-pointer flex items-center"
                    >
                        <Back />
                    </button>
                    <h1 className="text-text-primary font-title-18sb">아이디어 상세</h1>
                </div>
                {data && (
                    <button
                        type="button"
                        disabled={bookmarkMutation.isPending}
                        onClick={() => bookmarkMutation.mutate()}
                        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={data.isBookmarked ? '북마크 해제' : '북마크 추가'}
                    >
                        {data.isBookmarked ? <Bookmarked /> : <BookmarkDefault />}
                    </button>
                )}
            </div>

            {isPending && (
                <div className="flex flex-col gap-4 px-4 py-2">
                    <SkeletonBase sizeConfig="h-5 w-36" />
                    <SkeletonBase sizeConfig="h-7 w-2/3" />
                    <SkeletonBase sizeConfig="h-60 w-full" />
                </div>
            )}

            {isError && (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
                    <p className="font-body-14r text-text-secondary">아이디어 상세를 불러오지 못했습니다.</p>
                    <button
                        type="button"
                        className="rounded-xl bg-bg-2 px-4 py-2 font-body-14m text-text-primary"
                        onClick={() => void refetch()}
                    >
                        다시 시도
                    </button>
                </div>
            )}

            {data && (
                <div className="flex flex-col gap-4 px-4 py-2">
                    <div className="font-caption-14r text-text-tertiary">{formatIdeaDate(data.createdAt)} 생성</div>
                    <div className="flex flex-col gap-2">
                        <div className="font-title-18sb text-text-primary">{data.title}</div>
                        <div className="flex items-start justify-start gap-1 flex-wrap">
                            {data.tags.map((tag) => (
                                <p
                                    key={tag}
                                    className="px-2 py-1 rounded-[10px] bg-text-brand/8 text-text-brand font-caption-12m whitespace-nowrap"
                                >
                                    {formatIdeaTag(tag)}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="whitespace-pre-wrap font-body-14r text-text-secondary">{data.content}</div>
                </div>
            )}
        </div>
    )
}
