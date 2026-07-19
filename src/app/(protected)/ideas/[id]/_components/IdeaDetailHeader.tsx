import Link from 'next/link'
import ArrowIcon from '@/assets/icons/arrow.svg'
import Bookmarked from '@/assets/icons/bookmarked.svg'
import BookmarkDefault from '@/assets/icons/bookmark_default.svg'

interface IdeaDetailHeaderProps {
    isBookmarked?: boolean
    isBookmarkPending: boolean
    onBookmarkClick: () => void
}

export default function IdeaDetailHeader({
    isBookmarked,
    isBookmarkPending,
    onBookmarkClick,
}: IdeaDetailHeaderProps) {
    return (
        <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-bg-0 py-4 desktop:py-5">
            <div className="flex items-center gap-2">
                <Link
                    href="/ideas"
                    aria-label="아이디어 목록으로 돌아가기"
                    className="-ml-1 flex size-8 shrink-0 items-center justify-center rounded-md text-icon-primary transition-colors hover:bg-bg-2 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active"
                >
                    <ArrowIcon aria-hidden className="size-6 rotate-180" />
                </Link>
                <h1 className="font-title-18sb text-text-primary">아이디어 상세</h1>
            </div>

            {isBookmarked !== undefined && (
                <button
                    type="button"
                    disabled={isBookmarkPending}
                    onClick={onBookmarkClick}
                    className="flex size-8 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
                >
                    {isBookmarked ? <Bookmarked /> : <BookmarkDefault />}
                </button>
            )}
        </header>
    )
}
