'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import TextField from '@/components/TextField'

export default function OnboardingPage() {
    const router = useRouter()

    const [target, setTarget] = useState('')
    const [concept, setConcept] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const hasContent = target.trim().length > 0 || concept.trim().length > 0

    const handleComplete = () => {
        if (!hasContent) return
        setIsSubmitting(true)
        router.push('/dashboard')
        setIsSubmitting(false)
    }

    const handleSkip = () => {
        router.push('/dashboard')
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-gray-0 text-gray-95 selection:bg-primary-60/30">
            {/* 상단 헤더 영역 */}
            <Header
                title="타겟과 컨셉"
                trailing={
                    <button
                        type="button"
                        onClick={handleSkip}
                        className="cursor-pointer font-body-16m text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-active"
                    >
                        건너뛰기
                    </button>
                }
            />

            {/* 메인 콘텐츠 영역 */}
            <PageContent as="main" className="mx-auto flex flex-col pb-4 pt-2 tablet:pt-4">
                <div className="flex flex-col gap-4 mx-auto w-full">
                    {/* 타이틀 및 서브타이틀 */}
                    <div className="flex flex-col gap-1">
                        <h2 className="font-title-20sb desktop:text-[22px] font-semibold text-gray-95 leading-[1.4] tracking-tight">
                            반가워요! 유저님의 시청자 타겟과 컨셉을 알려주세요
                        </h2>
                        <p className="font-body-14r desktop:font-body-16r text-gray-50 whitespace-pre-line">
                            더욱 맞춤화된 분석을 위해 타겟과 채널 컨셉을 입력해주세요
                            {'\n'}언제든지 설정에서 수정할 수 있어요
                        </p>
                    </div>

                    {/* 입력 폼 영역 */}
                    <div className="flex flex-col gap-2">
                        {/* 채널 타겟층 입력 */}
                        <TextField
                            label="채널 타겟층"
                            maxLength={50}
                            placeholder="더욱 최적화된 분석 및 제안을 위해 채널 타겟층을 입력해주세요"
                            value={target}
                            onChange={setTarget}
                            heightVariant="small"
                            className="!w-full"
                        />

                        {/* 채널 컨셉 입력 */}
                        <TextField
                            label="채널 컨셉"
                            maxLength={150}
                            placeholder="더욱 최적화된 분석 및 제안을 위해 채널 컨셉을 입력해주세요"
                            value={concept}
                            onChange={setConcept}
                            heightVariant="large"
                            className="!w-full"
                        />
                    </div>
                </div>
            </PageContent>

            {/* 완료 버튼 */}
                <div className="w-full mx-auto px-4 desktop:px-16 flex justify-center mt-auto pb-8 tablet:mt-0 tablet:pb-0">
                    <button
                        onClick={handleComplete}
                        disabled={isSubmitting || !hasContent}
                        className={`w-full h-12 font-body-16sb rounded-[20px] transition-all duration-200 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${
                            hasContent
                                ? 'bg-primary-60 text-gray-95'
                                : 'bg-gray-30 text-text-secondary'
                        }`}
                    >
                        완료
                    </button>
                </div>
        </div>
    )
}
