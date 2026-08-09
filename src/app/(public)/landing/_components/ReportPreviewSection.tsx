'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ArrowRightIcon from '@/assets/icons/arrow_right.svg'
import SearchIcon from '@/assets/icons/search.svg'
import AnalysisTab from '@/app/(protected)/reports/_components/AnalysisTab'

type ReportTab = 'overview' | 'analysis'

const reportSummaries = [
    {
        badge: '긍정',
        badgeClassName: 'bg-[#4ade8014] text-[#4ade80]',
        title: '진정성 있는 콘텐츠',
        description: '시청자들의 높은 공감을 이끌어냈으며, 특히 긍정 댓글 비율 60%를 기록했어요.',
    },
    {
        badge: '양호',
        badgeClassName: 'bg-bg-2 text-text-secondary',
        title: '2분대 이탈 발생',
        description: '2분 6초~2분 55초 구간에서 이탈이 집중되고 있어요. 편집 템포 조절이 필요해요.',
    },
    {
        badge: '최적화 원활',
        badgeClassName: 'bg-[#4ade8014] text-[#4ade80]',
        title: 'SEO 점수 65점',
        description: '제목과 해시태그 개선을 통해 검색 유입률을 더 높일 수 있어요.',
    },
]

const previewAnalysis = {
    reportId: 0,
    retentionGraph: '',
    viewerRetentionAnalysis: '',
    algorithmOptimization: '',
}

export default function ReportPreviewSection() {
    const router = useRouter()
    const [videoLink, setVideoLink] = useState('')
    const [activeTab, setActiveTab] = useState<ReportTab>('overview')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const url = videoLink.trim()
        if (!url) return

        router.push(`/landing/report?url=${encodeURIComponent(url)}`)
    }

    return (
        <section aria-labelledby="report-preview-heading" className="flex flex-col gap-4">
            <div className="flex max-w-77.75 flex-col gap-1">
                <h2 id="report-preview-heading" className="font-title-20sb text-text-primary">
                    영상 리포트를 미리 체험해보세요
                </h2>
                <p className="font-body-14r text-text-secondary">
                    유튜브 영상 링크를 입력하시면
                    <br />
                    채널링 AI 영상 리포트를 미리 보여드립니다
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[20px] bg-bg-1 px-4 py-3">
                    <SearchIcon aria-hidden className="size-6 shrink-0 text-icon-secondary" />
                    <span className="sr-only">유튜브 영상 링크</span>
                    <input
                        type="url"
                        required
                        value={videoLink}
                        onChange={(event) => setVideoLink(event.target.value)}
                        placeholder="분석할 영상 링크를 입력해주세요"
                        className="min-w-0 flex-1 bg-transparent font-body-16r text-text-primary outline-none placeholder:text-text-secondary"
                    />
                </label>
                <button
                    type="submit"
                    disabled={!videoLink.trim()}
                    aria-label="영상 리포트 보기"
                    className="flex size-12 shrink-0 items-center justify-center rounded-[20px] bg-bg-3 text-icon-secondary disabled:cursor-not-allowed disabled:opacity-50 desktop:size-12.75"
                >
                    <ArrowRightIcon aria-hidden className="size-6" />
                </button>
            </form>

            <div className="relative flex flex-col gap-4 border-t-[1.5px] border-border-subtitle pt-3.75">
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-bg-0 px-1 font-body-14r text-text-secondary">
                    리포트 예시
                </span>

                <div className="flex flex-col gap-4 tablet:flex-row">
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[20px] tablet:w-59.25 desktop:w-79">
                        <Image
                            src="/images/dashboard/demo_thumbnail.png"
                            alt="주말 아침 루틴 영상 썸네일"
                            fill
                            sizes="(min-width: 1280px) 316px, (min-width: 768px) 237px, calc(100vw - 32px)"
                            className="object-cover"
                        />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                        <span className="self-start rounded-full bg-bg-2 px-2 py-1 font-caption-12m text-text-primary">
                            Long-Form
                        </span>
                        <h3 className="font-title-18sb text-text-primary">주말 아침 루틴 | 느긋한 브런치 만들기</h3>
                        <div className="flex flex-col gap-1 font-body-14r text-text-secondary">
                            <span>업데이트: 2025년 6월 21일 (오전 03:39)</span>
                            <span>지혜로운 생활 · 5일 전</span>
                        </div>
                    </div>
                </div>

                <div className="flex rounded-[20px] bg-bg-1 p-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 rounded-2xl py-2 font-body-16sb transition-colors ${
                            activeTab === 'overview' ? 'bg-bg-2 text-text-primary' : 'text-text-tertiary'
                        }`}
                    >
                        개요
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('analysis')}
                        className={`flex-1 rounded-2xl py-2 font-body-16sb transition-colors ${
                            activeTab === 'analysis' ? 'bg-bg-2 text-text-primary' : 'text-text-tertiary'
                        }`}
                    >
                        분석
                    </button>
                </div>

                {activeTab === 'overview' ? (
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[16px] font-semibold leading-[1.4] text-text-primary">리포트 요약</h4>
                        <div className="flex flex-col gap-2">
                            {reportSummaries.map(({ badge, badgeClassName, title, description }) => (
                                <article
                                    key={title}
                                    className="flex min-h-36.75 flex-col gap-2 rounded-[20px] bg-bg-1 p-5 tablet:min-h-31.5 desktop:min-h-33"
                                >
                                    <span
                                        className={`self-start rounded-lg px-1 py-0.5 text-[14px] font-medium leading-[1.4] ${badgeClassName}`}
                                    >
                                        {badge}
                                    </span>
                                    <div className="flex flex-col gap-1">
                                        <h5 className="font-body-16sb text-text-primary">{title}</h5>
                                        <p className="font-body-14r text-text-secondary">{description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-111.25 overflow-hidden desktop:h-108">
                        <AnalysisTab
                            analysis={previewAnalysis}
                            isPending={false}
                            isError={false}
                            lockViewerRetentionDetails
                        />
                    </div>
                )}

                <Link
                    href="/landing/report"
                    className="group relative mt-2 block w-full cursor-pointer overflow-hidden rounded-[20px] p-0.5 focus:outline-none"
                >
                    <div className="absolute inset-0 flex items-center justify-center scale-x-[2.5] sm:scale-x-[3]">
                        <span
                            aria-hidden
                            // animate-[spin_2.5s_linear_infinite] 안의 숫자로 속도를 조절합니다
                            className="w-[200%] aspect-square animate-[spin_2.5s_linear_infinite]"
                            style={{
                                background: 'conic-gradient(from 0deg, #141415 0%, #141415 85%, #da1b2e 100%)',
                                filter: 'blur(3px)',
                            }}
                        />
                    </div>

                    <span className="relative z-10 flex w-full items-center justify-center rounded-[18px] bg-bg-1 py-3.5 font-title-18sb text-text-primary transition-colors group-hover:bg-bg-1/95">
                        실제 데이터로 정밀한 리포트 받기
                    </span>
                </Link>
            </div>
        </section>
    )
}
