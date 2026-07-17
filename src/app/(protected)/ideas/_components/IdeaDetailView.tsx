import Bookmarked from '@/assets/icons/bookmarked.svg'
import BookmarkDefault from '@/assets/icons/bookmark_default.svg'
import Back from '@/assets/icons/back.svg'
import { useState } from 'react'

interface IdeaDetailViewProps {
    onBack: () => void
}

export default function IdeaDetailView({ onBack }: IdeaDetailViewProps) {
    const handleBookmarkClick = () => {
        setIsBookmarked((prev) => !prev)
    }
    const [isBookmarked, setIsBookmarked] = useState(false)

    return (
        <div className="flex flex-col gap-2 w-full h-full bg-bg-1 fixed inset-0 z-999 overflow-y-auto">
            <div className="sticky px-4 py-3 mt-1.75 flex flex-row justify-between">
                <div className="flex gap-2">
                    <button onClick={onBack} className="cursor-pointer flex items-center">
                        <Back />
                    </button>
                    <h1 className="text-text-primary font-title-18sb">아이디어 상세</h1>
                </div>
                <button onClick={handleBookmarkClick} className="cursor-pointer">
                    {isBookmarked ? <Bookmarked /> : <BookmarkDefault />}
                </button>
            </div>
            <div className="flex flex-col gap-4 px-4 py-2">
                <div className="font-caption-14r text-text-tertiary">26년 2월 15일 (19:35) 생성</div>
                <div className="flex flex-col gap-2">
                    <div className="font-title-18sb text-text-primary">코케트(coquette) 패션 인사</div>
                    <div className="flex items-start justify-start gap-1 flex-wrap">
                        <p className="px-2 py-1 rounded-[10px] bg-text-brand/8 text-text-brand font-caption-12m whitespace-nowrap">
                            직장인브이로그직장인브이로그
                        </p>
                        <p className="px-2 py-1 rounded-[10px] bg-text-brand/8 text-text-brand font-caption-12m whitespace-nowrap">
                            직장인브이로그
                        </p>
                        <p className="px-2 py-1 rounded-[10px] bg-text-brand/8 text-text-brand font-caption-12m whitespace-nowrap">
                            직장인브이로그
                        </p>
                    </div>
                </div>
                <div className="font-body-14r text-text-secondary">
                    가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가
                </div>
            </div>
        </div>
    )
}
