import Back from '@/assets/icons/back.svg'
import Bin from '@/assets/icons/bin.svg'
import Plus from '@/assets/icons/plus.svg'
import { useState } from 'react'
import PageContent from '@/components/layout/PageContent'
import ReportBox from './ReportBox'

interface ReportListProps {
    totalCount: number
    onBack: () => void
}

export default function ReportList({ totalCount, onBack }: ReportListProps) {
    const [isDelete, setIsDelete] = useState(false)

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

                        <h1 className="font-title-18sb text-text-primary">리포트 상세 목록</h1>
                    </div>
                    <div className="flex gap-2">
                        <Bin onClick={() => setIsDelete((prev) => !prev)} />
                        <Plus />
                    </div>
                </header>
                <div className="pt-2 flex">
                    <p className="font-body-16m text-text-primary">{totalCount}</p>
                    <p className="font-body-16m text-text-secondary">개의 리포트</p>
                </div>
                {/* 영상 정보  */}
                <div className="flex gap-4 flex-col tablet:flex-row">
                    <div className="w-82 h-46 tablet:w-59.25 tablet:h-33.25 desktop:w-79 desktop:h-44.5 rounded-[20px] bg-bg-3"></div>
                    <div className="flex flex-col gap-1 justify-start items-start">
                        <div className="px-2 py-1 rounded-[20px] bg-bg-2 font-caption-12m desktop:font-caption-14m text-text-primary">
                            Long-Form
                        </div>
                        <div className="font-title-14sb desktop:font-title-20sb text-text-primary">
                            주말 아침 루틴 | 느긋한 브런치 만들기
                        </div>
                        <div className="font-body-14r desktop:font-body-16r text-text-secondary">
                            업데이트: 2025년 6월 21일 (오전 03:39)
                        </div>
                        <div className="font-body-14r desktop:font-body-16r text-text-secondary">
                            지혜로운 생활 · 5일 전
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <ReportBox
                        generatedDate="25년 12월 21일 (03:39)"
                        startDate="25.12.21"
                        endDate="26.12.21"
                        isDelete={isDelete}
                    />
                    <ReportBox
                        generatedDate="25년 12월 21일 (03:39)"
                        startDate="25.12.21"
                        endDate="26.12.21"
                        isDelete={isDelete}
                    />
                    <ReportBox
                        generatedDate="25년 12월 21일 (03:39)"
                        startDate="25.12.21"
                        endDate="26.12.21"
                        isDelete={isDelete}
                    />
                    <ReportBox
                        generatedDate="25년 12월 21일 (03:39)"
                        startDate="25.12.21"
                        endDate="26.12.21"
                        isDelete={isDelete}
                    />
                </div>
            </PageContent>
        </div>
    )
}
