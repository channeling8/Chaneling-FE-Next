import type { IdeaListItem } from '@/api/ideas'
import Bookmarked from '@/assets/icons/bookmarked.svg'
import BookmarkDefault from '@/assets/icons/bookmark_default.svg'
import { formatIdeaDate, formatIdeaTag } from './idea-format'

interface SaveCardProps {
    idea: IdeaListItem
    onClick: () => void
    onBookmarkClick: () => void
    isBookmarkPending: boolean
}

export default function SavedIdeaCard({ idea, onClick, onBookmarkClick, isBookmarkPending }: SaveCardProps) {
    const handleBookmarkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        onBookmarkClick()
    }

    return (
        <div
            className="relative p-5 space-y-2 w-full items-start rounded-[20px] bg-bg-1 cursor-pointer"
            onClick={onClick}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onClick()
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${idea.title} 아이디어 상세 보기`}
        >
            <div className="flex flex-row justify-between">
                <div className="text-text-tertiary font-caption-14r">{formatIdeaDate(idea.createdAt)}</div>
                <button
                    type="button"
                    disabled={isBookmarkPending}
                    onClick={handleBookmarkClick}
                    className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={idea.isBookmarked ? '북마크 해제' : '북마크 추가'}
                >
                    {idea.isBookmarked ? <Bookmarked /> : <BookmarkDefault />}
                </button>
            </div>
            <h3 className="flex-1 line-clamp-1 font-body-16sb text-text-primary">{idea.title}</h3>
            <p className="min-h-[calc(1em*1.5*2)] line-clamp-2 font-body-14r text-text-secondary">
                {idea.contentPreview}
            </p>
            <div className="w-full h-px bg-border-default mt-4" />
            <div className="flex flex-row flex-wrap gap-2">
                {idea.tags.map((tag) => (
                    <p key={tag} className="px-2 py-1 rounded-[10px] bg-text-brand/8 text-text-brand font-caption-12m">
                        {formatIdeaTag(tag)}
                    </p>
                ))}
            </div>
        </div>
    )
}
