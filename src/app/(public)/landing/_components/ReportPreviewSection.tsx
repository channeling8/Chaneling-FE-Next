'use client'

import { FormEvent, useRef, useState } from 'react'
import Link from 'next/link'
import ArrowRightIcon from '@/assets/icons/arrow_right.svg'
import SearchIcon from '@/assets/icons/search.svg'

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

export default function ReportPreviewSection() {
    const [videoLink, setVideoLink] = useState('')
    const [activeTab, setActiveTab] = useState<ReportTab>('overview')
    const reportRef = useRef<HTMLDivElement>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <section aria-labelledby="report-preview-heading" className="flex flex-col gap-4">
            <div className="flex max-w-[311px] flex-col gap-1">
                <h2 id="report-preview-heading" className="font-title-20sb text-text-primary">
                    영상 리포트를 미리 체험해보세요
                </h2>
                <p className="font-body-14r text-text-secondary">
                    유튜브 영상 링크를 입력하시면<br />
                    채널링 AI 영상 리포트를 미리 보여드립니다
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <label className="flex min-w-0 flex-1 items-center gap-2 rounded-[20px] bg-bg-1 px-4 py-3">
                    <SearchIcon aria-hidden className="size-6 shrink-0 text-icon-secondary" />
                    <span className="sr-only">유튜브 영상 링크</span>
                    <input
                        type="url"
                        value={videoLink}
                        onChange={(event) => setVideoLink(event.target.value)}
                        placeholder="분석할 영상 링크를 입력해주세요"
                        className="min-w-0 flex-1 bg-transparent font-body-16r text-text-primary outline-none placeholder:text-text-secondary"
                    />
                </label>
                <button
                    type="submit"
                    aria-label="영상 리포트 보기"
                    className="flex size-12 shrink-0 items-center justify-center rounded-[20px] bg-bg-3 text-icon-secondary desktop:size-[51px]"
                >
                    <ArrowRightIcon aria-hidden className="size-6" />
                </button>
            </form>

            <div ref={reportRef} className="relative flex flex-col gap-4 border-t-[1.5px] border-border-subtitle pt-[15px]">
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-bg-0 px-1 font-body-14r text-text-secondary">
                    리포트 예시
                </span>

                <div className="flex flex-col gap-4 tablet:flex-row">
                    <div
                        aria-label="리포트 영상 썸네일 예시"
                        role="img"
                        className="aspect-video w-full shrink-0 rounded-[20px] tablet:w-[237px] desktop:w-[316px]"
                        style={{
                            backgroundColor: '#fff',
                            backgroundImage:
                                'linear-gradient(45deg, #eaeaea 25%, transparent 25%), linear-gradient(-45deg, #eaeaea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eaeaea 75%), linear-gradient(-45deg, transparent 75%, #eaeaea 75%)',
                            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
                            backgroundSize: '16px 16px',
                        }}
                    />
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
                                    className="flex min-h-[147px] flex-col gap-2 rounded-[20px] bg-bg-1 p-5 tablet:min-h-[126px] desktop:min-h-[132px]"
                                >
                                    <span className={`self-start rounded-lg px-1 py-0.5 text-[14px] font-medium leading-[1.4] ${badgeClassName}`}>
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
                    <div className="flex min-h-[445px] flex-col gap-2 desktop:min-h-[432px]">
                        <h4 className="text-[16px] font-semibold leading-[1.4] text-text-primary">심층 반응 분석</h4>
                        <div className="flex flex-col gap-4 rounded-[20px] bg-bg-1 p-5 font-body-14r text-text-secondary">
                            <p>댓글과 시청 지표를 기반으로 영상의 핵심 반응을 분석합니다.</p>
                            <p>가장 높은 호감 키워드: 힐링, 요리, 음악</p>
                        </div>
                    </div>
                )}

                <Link
                    href="/landing/report"
                    className="group relative mt-2 block w-full cursor-pointer overflow-hidden rounded-[20px] p-0.5 focus:outline-none"
                >
                    <span
                        aria-hidden
                        className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite]"
                        style={{
                            background: 'conic-gradient(from 0deg, #141415 0%, #141415 70%, #da1b2e 100%)',
                            filter: 'blur(3px)',
                        }}
                    />
                    <span className="relative z-10 flex w-full items-center justify-center rounded-[18px] bg-bg-1 py-3.5 font-title-18sb text-text-primary transition-colors group-hover:bg-bg-1/95">
                        실제 데이터로 정밀한 리포트 받기
                    </span>
                </Link>
            </div>
        </section>
    )
}
