import Bookmarked from '@/assets/icons/bookmarked.svg'
import BookmarkDefault from '@/assets/icons/bookmark_default.svg'
import { useState } from 'react'

interface SaveCardProps {
    onClick: () => void
}

export default function SavedIdeaCard({ onClick }: SaveCardProps) {
    const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsBookmarked((prev) => !prev)
    }
    const [isBookmarked, setIsBookmarked] = useState(false)

    return (
        <div
            className="relative p-5 space-y-2 w-full items-start rounded-[20px] bg-bg-1 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex flex-row justify-between">
                <div className="text-text-tertiary font-caption-14r">26년 2월 15일 (19:35)</div>
                <button onClick={handleBookmarkClick} className="cursor-pointer">
                    {isBookmarked ? <Bookmarked /> : <BookmarkDefault />}
                </button>
            </div>
            <h3 className="flex-1 line-clamp-1 font-body-16sb text-text-primary">코케트(coquette) 패션 인사</h3>
            <p className="min-h-[calc(1em*1.5*2)] line-clamp-2 font-body-14r text-text-secondary">
                가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가
            </p>
            <div className="w-82 h-px bg-border-default mt-4" />
            <div className="flex flex-row flex-wrap gap-2">
                <p className="px-2 py-1 rounded-[10px] bg-text-brand/8 text-text-brand font-caption-12m">#ddd</p>
            </div>
        </div>
    )
}
