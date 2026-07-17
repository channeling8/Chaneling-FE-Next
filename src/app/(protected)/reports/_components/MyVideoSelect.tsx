import Back from '@/assets/icons/back.svg'
import { useState } from 'react'
import SearchBar from './SearchBar'
import VideoCard from './VideoCard'
import DropdownOrder from '@/components/dropdown-order'
import Chip from '@/components/Chip'
import PageContent from '@/components/layout/PageContent'

interface MyVideoSelectProps {
    onBack: () => void
}

export default function MyVideoSelect({ onBack }: MyVideoSelectProps) {
    const [activeChip, setActiveChip] = useState<'all' | 'longform' | 'shortform'>('all')

    const [order, setOrder] = useState('최신순')

    return (
        <div className="absolute inset-0 z-30 overflow-y-auto bg-bg-0">
            <PageContent className="flex min-h-full flex-col gap-4 pb-16 pt-4">
                <header className="sticky top-0 z-10 flex items-center justify-between bg-bg-0 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex cursor-pointer items-center"
                            aria-label="뒤로 가기"
                        >
                            <Back />
                        </button>

                        <h1 className="font-title-18sb text-text-primary">내 영상 선택</h1>
                    </div>
                </header>

                <SearchBar />

                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <Chip title="전체" onClick={() => setActiveChip('all')} isActive={activeChip === 'all'} />

                        <Chip
                            title="롱폼"
                            onClick={() => setActiveChip('longform')}
                            isActive={activeChip === 'longform'}
                        />

                        <Chip
                            title="숏폼"
                            onClick={() => setActiveChip('shortform')}
                            isActive={activeChip === 'shortform'}
                        />
                    </div>

                    <DropdownOrder onChange={setOrder} />
                </div>

                <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
                    <VideoCard
                        title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                        leftside="조회수"
                        rightside="17만회"
                        period="3년 전"
                    />

                    <VideoCard
                        title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                        leftside="조회수"
                        rightside="17만회"
                        period="3년 전"
                    />

                    <VideoCard
                        title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                        leftside="조회수"
                        rightside="17만회"
                        period="3년 전"
                    />

                    <VideoCard
                        title="영상제목이 들어가는 곳입니다. 2줄까지 가능합니다. 나머지는 ...처리해주세요"
                        leftside="조회수"
                        rightside="17만회"
                        period="3년 전"
                    />
                </div>
            </PageContent>
        </div>
    )
}
