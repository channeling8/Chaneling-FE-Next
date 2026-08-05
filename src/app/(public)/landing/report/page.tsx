'use client'

import { useState } from 'react'
import Link from 'next/link'
import LikeIcon from '@/assets/icons/like.svg'

export default function ReportPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'analyze'>('overview')
    const [sentimentTab, setSentimentTab] = useState<'positive' | 'negative' | 'neutral' | 'suggestion'>('positive')

    // 댓글 반응용 텍스트 데이터 맵핑
    const sentimentInfo = {
        positive: {
            title: '긍정적 댓글 분석 (100개)',
            desc: '시청자들은 화자의 솔직한 태도와 진정성에 큰 호감을 느꼈습니다. 특히 "힐링된다", "위로받았다"는 키워드가 상위권에 랭크되었습니다.',
            comments: [
                {
                    id: 1,
                    text: '영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!',
                    nickname: '닉네임',
                    time: 'n시간 전',
                    likes: 999,
                },
                {
                    id: 2,
                    text: '영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!',
                    nickname: '닉네임',
                    time: 'n일 전',
                    likes: 999,
                },
                {
                    id: 3,
                    text: '영상 정말 잘 봤습니다! 평소 궁금했던 주제인데 설명이 깔끔해서 단번에 이해됐어요. 앞으로도 유익한 영상 많이 올려주세요. 항~상 응원하며 다음 영상도 즐겁게 기다리고 있겠습니다!',
                    nickname: '닉네임',
                    time: 'n달 전',
                    likes: 999,
                },
            ],
        },
    }

    return (
        <div className="min-h-screen bg-[#141415] text-text-primary flex flex-col">
            {/* 상단 헤더 */}
            <header className="h-[72px] flex items-center justify-between bg-[#141415] sticky top-0 z-40 tablet:px-16 max-w-[1440px] w-full mx-auto">
                <div className="flex items-center gap-3">
                    <Link
                        href="/landing"
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-primary transition-colors cursor-pointer"
                        aria-label="이전 페이지로 이동"
                    >
                        <svg
                            className="w-5 h-5 rotate-180"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
                        </svg>
                    </Link>
                    <span className="font-title-20sb text-text-primary">상세 분석 리포트</span>
                </div>
            </header>

            {/* 메인 콘텐츠 바디 */}
            <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 tablet:px-16 py-8 flex flex-col gap-10 pb-16">
                {/* 1. 영상 메타 정보 영역 */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col tablet:flex-row gap-4">
                        <div
                            className="w-full tablet:w-[316px] h-[178px] rounded-[20px] shrink-0 relative overflow-hidden"
                            style={{
                                backgroundImage:
                                    'linear-gradient(45deg, #EAEAEA 25%, transparent 25%), linear-gradient(-45deg, #EAEAEA 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #EAEAEA 75%), linear-gradient(-45deg, transparent 75%, #EAEAEA 75%)',
                                backgroundSize: '16px 16px',
                                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                                backgroundColor: '#FFFFFF',
                            }}
                        />

                        <div className="flex flex-col gap-1">
                            <div className="inline-block self-start px-2 py-1 bg-gray-20 rounded-full">
                                <span className="font-body-14m text-gray-95">Long-Form</span>
                            </div>
                            <h3 className="font-title-20sb text-text-primary">주말 아침 루틴 | 느긋한 브런치 만들기</h3>
                            <div className="flex flex-col gap-1 font-body-16r text-text-secondary">
                                <span>업데이트: 2025년 6월 21일 (오전 03:39)</span>
                                <span className="flex items-center gap-1">
                                    <span>지혜로운 생활</span>
                                    <span>·</span>
                                    <span>5일 전</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 개요/분석 탭 */}
                    <div className="w-full bg-gray-5 rounded-[20px] p-1 flex">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 py-2 rounded-[16px] text-center font-title-18sb transition-all cursor-pointer ${
                                activeTab === 'overview'
                                    ? 'bg-gray-20 text-text-primary'
                                    : 'text-text-tertiary hover:text-text-primary'
                            }`}
                        >
                            개요
                        </button>
                        <button
                            onClick={() => setActiveTab('analyze')}
                            className={`flex-1 py-2 rounded-[16px] text-center font-title-18sb transition-all cursor-pointer ${
                                activeTab === 'analyze'
                                    ? 'bg-gray-20 text-text-primary'
                                    : 'text-text-tertiary hover:text-text-primary'
                            }`}
                        >
                            분석
                        </button>
                    </div>

                    {/* 탭 내용 분기 */}
                    {activeTab === 'overview' ? (
                        <div className="flex flex-col gap-8 mt-2">
                            {/* 리포트 요약 */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-body-16sb text-text-primary">리포트 요약</h4>
                                <div className="flex flex-col gap-2">
                                    {/* 요약 카드 1 */}
                                    <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-2">
                                        <div className="self-start px-1 py-0.5 bg-[#4ADE80]/8 text-[#4ADE80] font-body-14m rounded-[8px]">
                                            긍정
                                        </div>
                                        <h5 className="font-title-18sb text-text-primary">진정성 있는 콘텐츠</h5>
                                        <p className="font-body-16r text-text-secondary">
                                            시청자들의 높은 공감을 이끌어냈으며, 특히 긍정 댓글 비율 60%를 기록했어요.
                                        </p>
                                    </div>

                                    {/* 요약 카드 2 */}
                                    <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-2 relative overflow-hidden group">
                                        {/* 잠금 오버레이 */}
                                        <div className="absolute inset-0 bg-white/1 backdrop-blur-[20px] z-10 flex flex-col items-center justify-center text-center transition-all duration-300">
                                            <span className="font-body-16m text-text-primary text-center">
                                                로그인 시, 본인 영상의 분석에서 확인할 수 있어요
                                            </span>
                                        </div>
                                        <div className="self-start px-1 py-0.5 bg-gray-20 text-text-secondary font-body-14m rounded-[8px]">
                                            양호
                                        </div>
                                        <h5 className="font-title-18sb text-text-primary">2분대 이탈 발생</h5>
                                        <p className="font-body-16r text-text-secondary">
                                            2분 6초~2분 55초 구간에서 이탈이 집중되고 있어요. 편집 템포 조절이 필요해요.
                                        </p>
                                    </div>

                                    {/* 요약 카드 3 */}
                                    <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-2">
                                        <div className="self-start px-1 py-0.5 bg-[#4ADE80]/8 text-[#4ADE80] font-body-14m rounded-[8px]">
                                            최적화 원활
                                        </div>
                                        <h5 className="font-title-18sb text-text-primary">SEO 점수 65점</h5>
                                        <p className="font-body-16r text-text-secondary">
                                            제목과 해시태그 개선을 통해 검색 유입률을 더 높일 수 있어요.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 영상 평가 계량 지표 Grid */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-body-16sb text-text-primary">영상 평가</h4>
                                <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-2">
                                    {/* 지표 1 */}
                                    <div className="bg-gray-10 rounded-[20px] p-4 flex flex-col justify-between h-[135px]">
                                        <span className="font-body-16m text-text-secondary">조회수</span>
                                        <div className="flex items-baseline">
                                            <span className="text-[32px] font-normal text-text-primary">120</span>
                                            <span className="text-[32px] font-normal text-text-secondary">만</span>
                                        </div>
                                        <div className="flex items-center gap-[6.43px] font-body-14r text-text-tertiary">
                                            <span>평균</span>
                                            <span>150만</span>
                                        </div>
                                    </div>
                                    {/* 지표 2 */}
                                    <div className="bg-gray-10 rounded-[20px] p-4 flex flex-col justify-between h-[135px]">
                                        <span className="font-body-16m text-text-secondary">좋아요</span>
                                        <div className="flex items-baseline">
                                            <span className="text-[32px] font-normal text-text-primary">12</span>
                                            <span className="text-[32px] font-normal text-text-secondary">만</span>
                                        </div>
                                        <div className="flex items-center gap-[6.43px] font-body-14r text-text-tertiary">
                                            <span>평균</span>
                                            <span>000</span>
                                        </div>
                                    </div>
                                    {/* 지표 3 */}
                                    <div className="bg-gray-10 rounded-[20px] p-4 flex flex-col justify-between h-[135px]">
                                        <span className="font-body-16m text-text-secondary">댓글</span>
                                        <div className="flex items-baseline">
                                            <span className="text-[32px] font-normal text-text-primary">8</span>
                                            <span className="text-[32px] font-normal text-text-secondary">천</span>
                                        </div>
                                        <div className="flex items-center gap-[6.43px] font-body-14r text-text-tertiary">
                                            <span>평균</span>
                                            <span>000</span>
                                        </div>
                                    </div>
                                    {/* 지표 4 */}
                                    <div className="bg-gray-10 rounded-[20px] p-4 flex flex-col justify-between h-[135px]">
                                        <span className="font-body-16m text-text-secondary">콘텐츠 컨셉 일관성</span>
                                        <div className="flex items-baseline">
                                            <span className="text-[32px] font-normal text-text-primary">100</span>
                                            <span className="text-[32px] font-normal text-text-secondary">%</span>
                                        </div>
                                        <div className="flex items-center gap-[6.43px] font-body-14r text-text-tertiary">
                                            <span>평균</span>
                                            <span>000</span>
                                        </div>
                                    </div>
                                    {/* 지표 5 */}
                                    <div className="bg-gray-10 rounded-[20px] p-4 flex flex-col justify-between h-[135px]">
                                        <span className="font-body-16m text-text-secondary">SEO 구성</span>
                                        <div className="flex items-baseline">
                                            <span className="text-[32px] font-normal text-text-primary">65</span>
                                            <span className="text-[32px] font-normal text-text-secondary">%</span>
                                        </div>
                                        <div className="flex items-center gap-[6.43px] font-body-14r text-text-tertiary">
                                            <span>평균</span>
                                            <span>000</span>
                                        </div>
                                    </div>
                                    {/* 지표 6 (잠금 블러) */}
                                    <div className="bg-gray-10 rounded-[20px] p-4 flex flex-col justify-between h-[135px] relative overflow-hidden group">
                                        {/* 잠금 오버레이 */}
                                        <div className="absolute inset-0 bg-white/1 backdrop-blur-[20px] z-10 flex flex-col items-center justify-center p-3 text-center transition-all duration-300">
                                            <span className="font-body-16m text-text-primary">
                                                로그인 시, 본인 영상의 분석에서 확인할 수 있어요
                                            </span>
                                        </div>
                                        <div className="font-body-16m text-text-secondary">재방문률</div>
                                        <div className="flex items-baseline">
                                            <span className="text-[32px] font-normal text-text-primary">10</span>
                                            <span className="text-[32px] font-normal text-text-secondary">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 영상 요약 (타임라인 스크립트) */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-body-16sb text-text-primary">영상 요약</h4>
                                <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col">
                                    {/* 스크립트 1 */}
                                    <div className="flex gap-[5px] items-start pb-4">
                                        <span className="text-[18px] font-normal text-text-brand shrink-0">nn:nn</span>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[18px] font-medium text-text-primary">
                                                소제목소제목소제목소제목소제목소제목소제목소제목소제목소제목
                                            </span>
                                            <span className="font-body-16r text-text-secondary">
                                                캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.캡션입니다.
                                            </span>
                                        </div>
                                    </div>
                                    {/* 스크립트 2 */}
                                    <div className="flex gap-[5px] items-start pb-4">
                                        <span className="text-[18px] font-normal text-text-brand shrink-0">nn:nn</span>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[18px] font-medium text-text-primary">소제목</span>
                                            <span className="font-body-16r text-text-secondary">캡션입니다.</span>
                                        </div>
                                    </div>
                                    {/* 스크립트 3 */}
                                    <div className="flex gap-[5px] items-start pb-4">
                                        <span className="text-[18px] font-normal text-text-brand shrink-0">nn:nn</span>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[18px] font-medium text-text-primary">소제목</span>
                                            <span className="font-body-16r text-text-secondary">캡션입니다.</span>
                                        </div>
                                    </div>
                                    {/* 전체 보기 */}
                                    <button className="w-full pt-2 pb-2 border-t-[1.5px] border-border-default flex items-center justify-center text-text-secondary font-body-16r transition-colors cursor-pointer bg-transparent outline-none">
                                        <span>전체 보기</span>
                                    </button>
                                </div>
                            </div>

                            {/* 댓글 반응 (차트 및 주요 반응) */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-body-16sb text-text-primary">댓글 반응</h4>
                                <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-8">
                                    {/* 상단: 도넛 차트 및 감정 분석 탭/해설 */}
                                    <div className="flex flex-col tablet:flex-row gap-7 items-start">
                                        {/* 도넛 차트 */}
                                        <div className="w-full tablet:w-[352px] flex flex-col items-center justify-center shrink-0 relative">
                                            <div className="relative w-88 h-88 flex items-center justify-center">
                                                <svg
                                                    className="w-full h-full transform -rotate-90"
                                                    viewBox="0 0 100 100"
                                                >
                                                    {/* 기타 (10%) - 회색 */}
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="transparent"
                                                        stroke="#37363A"
                                                        strokeWidth="12"
                                                        strokeDasharray="251.2"
                                                        strokeDashoffset="0"
                                                    />
                                                    {/* 부정 (10%) - 빨강 */}
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="transparent"
                                                        stroke="#F50019"
                                                        strokeWidth="12"
                                                        strokeDasharray="251.2"
                                                        strokeDashoffset="25.12"
                                                    />
                                                    {/* 중립 (20%) - 파랑 */}
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="transparent"
                                                        stroke="#60A5FA"
                                                        strokeWidth="12"
                                                        strokeDasharray="251.2"
                                                        strokeDashoffset="50.24"
                                                    />
                                                    {/* 긍정 (60%) - 초록 */}
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="transparent"
                                                        stroke="#4ADE80"
                                                        strokeWidth="12"
                                                        strokeDasharray="251.2"
                                                        strokeDashoffset="100.48"
                                                    />
                                                </svg>
                                                <div className="absolute flex flex-col items-center justify-center text-center">
                                                    <span className="font-body-14m text-text-secondary">총 댓글</span>
                                                    <div className="flex items-baseline">
                                                        <span className="text-[32px] font-normal text-text-primary">
                                                            8
                                                        </span>
                                                        <span className="text-[32px] font-normal text-text-secondary">
                                                            천
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 상세 분류 탭 및 감정 해설 */}
                                        <div className="flex-1 flex flex-col gap-4">
                                            {/* 감정 서브 탭 */}
                                            <div className="grid grid-cols-2 tablet:grid-cols-1">
                                                <button
                                                    onClick={() => setSentimentTab('positive')}
                                                    className={`py-4 px-6 rounded-[12px] border text-center transition-all cursor-pointer flex items-center gap-1 border-box ${
                                                        sentimentTab === 'positive'
                                                            ? 'bg-[#4ADE80]/8 border-[#4ADE80] text-text-primary'
                                                            : 'border-transparent text-text-secondary'
                                                    }`}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-[#4ADE80] mr-[6px]" />
                                                    <span className="font-body-16m">긍정</span>
                                                    <span className="font-body-16m">25%</span>
                                                </button>
                                                <button
                                                    onClick={() => setSentimentTab('negative')}
                                                    className={`py-4 px-6 rounded-[12px] border text-center transition-all cursor-pointer flex items-center gap-1 border-box ${
                                                        sentimentTab === 'negative'
                                                            ? 'bg-[#F50019]/8 border-[#F50019] text-text-primary'
                                                            : 'border-transparent text-text-secondary'
                                                    }`}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-[#F50019] mr-[6px]" />
                                                    <span className="font-body-16m">부정</span>
                                                    <span className="font-body-16m">10%</span>
                                                </button>
                                                <button
                                                    onClick={() => setSentimentTab('neutral')}
                                                    className={`py-4 px-6 rounded-[12px] border text-center transition-all cursor-pointer flex items-center gap-1 border-box ${
                                                        sentimentTab === 'neutral'
                                                            ? 'bg-[#37363A]/8 border-[#37363A] text-text-primary'
                                                            : 'border-transparent text-text-secondary'
                                                    }`}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-[#37363A] mr-[6px]" />
                                                    <span className="font-body-16m">중립</span>
                                                    <span className="font-body-16m">25%</span>
                                                </button>
                                                <button
                                                    onClick={() => setSentimentTab('suggestion')}
                                                    className={`py-4 px-6 rounded-[12px] border text-center transition-all cursor-pointer flex items-center gap-1 border-box ${
                                                        sentimentTab === 'suggestion'
                                                            ? 'bg-[#60A5FA]/8 border-[#60A5FA] text-text-primary'
                                                            : 'border-transparent text-text-secondary'
                                                    }`}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-[#60A5FA] mr-[6px]" />
                                                    <span className="font-body-16m">조언</span>
                                                    <span className="font-body-16m">25%</span>
                                                </button>
                                            </div>

                                            {/* 감정 해설 */}
                                            {(() => {
                                                const currentSentiment = {
                                                    positive: {
                                                        title: '긍정적 댓글 분석',
                                                        count: '(100개)',
                                                        desc: '시청자들은 화자의 솔직한 태도와 진정성에 큰 호감을 느꼈습니다. 특히 "힐링된다", "위로받았다"는 키워드가 상위권에 랭크되었습니다.',
                                                    },
                                                    negative: {
                                                        title: '부정적 댓글 분석',
                                                        count: '(15개)',
                                                        desc: '일부 슬로우 모션 구간의 편집 속도가 너무 느려 다소 지루하다는 반응이 있었습니다. 전체적인 컷 편집 템포를 조절할 필요가 있습니다.',
                                                    },
                                                    neutral: {
                                                        title: '중립적 댓글 분석',
                                                        count: '(45개)',
                                                        desc: '영상에 등장한 인테리어 소품, 식기류 브랜드 및 조리 도구 정보와 배경 음악의 트랙 정보를 묻는 질문 중심의 댓글이 주를 이루고 있습니다.',
                                                    },
                                                    suggestion: {
                                                        title: '조언 댓글 분석',
                                                        count: '(20개)',
                                                        desc: '조리 과정을 상세히 보고 싶어하는 시청자들을 위해 카메라 앵글을 위에서 아래로 비추는 탑뷰(Top-down) 앵글을 추가해 달라는 의견이 많았습니다.',
                                                    },
                                                }[sentimentTab]

                                                return (
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex gap-[2px]">
                                                            <span className="font-body-16m text-[#4ADE80]">
                                                                {currentSentiment.title}
                                                            </span>
                                                            <span className="font-body-16r text-text-secondary">
                                                                {currentSentiment.count}
                                                            </span>
                                                        </div>
                                                        <p className="font-body-16r text-text-primary">
                                                            {currentSentiment.desc}
                                                        </p>
                                                    </div>
                                                )
                                            })()}
                                        </div>
                                    </div>

                                    {/* 하단: 주요 댓글 목록 (풀 가로 너비) */}
                                    <div className="flex flex-col gap-4">
                                        <span className="font-body-14m text-text-secondary">주요 댓글</span>
                                        <div className="flex flex-col divide-y divide-white/5">
                                            {sentimentInfo.positive.comments.map((comment) => (
                                                <div key={comment.id} className="py-4 flex flex-col gap-3 first:pt-0">
                                                    <p className="font-body-16r text-text-primary">{comment.text}</p>
                                                    <div className="flex items-center justify-between font-body-14r text-text-secondary">
                                                        <div className="flex items-center gap-1">
                                                            <div
                                                                className="w-6 h-6 rounded-full shrink-0"
                                                                style={{
                                                                    backgroundImage:
                                                                        'linear-gradient(45deg, #EAEAEA 25%, transparent 25%), linear-gradient(-45deg, #EAEAEA 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #EAEAEA 75%), linear-gradient(-45deg, transparent 75%, #EAEAEA 75%)',
                                                                    backgroundSize: '8px 8px',
                                                                    backgroundPosition:
                                                                        '0 0, 0 4px, 4px -4px, -4px 0px',
                                                                    backgroundColor: '#FFFFFF',
                                                                }}
                                                            />
                                                            <span>{comment.nickname}</span>
                                                            <span>{comment.time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 font-body-14r text-text-primary">
                                                            <LikeIcon className="w-5 h-6 text-[#6E6D73]" />
                                                            <span>{comment.likes}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8 mt-2">
                            {/* 시청자 이탈 분석 */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-body-18sb text-text-primary">시청자 이탈 분석</h4>
                                <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-4 relative overflow-hidden">
                                    {/* 구간 요약 정보 */}
                                    <div className="flex flex-col gap-1">
                                        <span className="font-body-16m text-text-brand">
                                            0분 00초(00:00~00:00) 구간 이탈 요약
                                        </span>
                                        <span className="font-body-16r text-text-secondary">
                                            채널링이 분석한 가장 개선이 시급한 구간입니다.
                                        </span>
                                    </div>

                                    {/* 이탈 분석 그래프 */}
                                    <div className="w-full h-[205px] relative">
                                        <svg
                                            className="w-full h-full"
                                            viewBox="0 0 1272 160"
                                            preserveAspectRatio="none"
                                        >
                                            {/* 그라데이션 정의 */}
                                            <defs>
                                                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#E9495A" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#DA1B2E" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>

                                            {/* 이탈 하이라이트 세로 구역 (0:15 ~ 0:45 부근) */}
                                            <rect
                                                x="90"
                                                y="0"
                                                width="100"
                                                height="160"
                                                fill="rgba(233, 73, 90, 0.08)"
                                            />
                                            <line
                                                x1="90"
                                                y1="0"
                                                x2="90"
                                                y2="160"
                                                stroke="#E9495A"
                                                strokeWidth="1"
                                                strokeDasharray="3 3"
                                            />
                                            <line
                                                x1="190"
                                                y1="0"
                                                x2="190"
                                                y2="160"
                                                stroke="#E9495A"
                                                strokeWidth="1"
                                                strokeDasharray="3 3"
                                            />

                                            {/* 배경 보조 가로선 */}
                                            <line
                                                x1="0"
                                                y1="40"
                                                x2="1272"
                                                y2="40"
                                                stroke="white"
                                                strokeOpacity={0.05}
                                            />
                                            <line
                                                x1="0"
                                                y1="80"
                                                x2="1272"
                                                y2="80"
                                                stroke="white"
                                                strokeOpacity={0.05}
                                            />
                                            <line
                                                x1="0"
                                                y1="120"
                                                x2="1272"
                                                y2="120"
                                                stroke="white"
                                                strokeOpacity={0.05}
                                            />

                                            {/* 차트 영역 채우기 (Area) */}
                                            <path
                                                d="M 0 30 Q 150 15 300 110 T 600 40 T 900 60 T 1200 45 L 1272 45 L 1272 160 L 0 160 Z"
                                                fill="url(#area-grad)"
                                            />

                                            {/* 차트 선 (Line) */}
                                            <path
                                                d="M 0 30 Q 150 15 300 110 T 600 40 T 900 60 T 1200 45 L 1272 45"
                                                fill="transparent"
                                                stroke="#E9495A"
                                                strokeWidth="2"
                                            />
                                        </svg>

                                        {/* X축 라벨들 */}
                                        <div className="flex justify-between font-body-14r text-text-tertiary mt-2 px-1">
                                            <span>0:00</span>
                                            <span>0:30</span>
                                            <span>1:00</span>
                                            <span>1:30</span>
                                            <span>2:00</span>
                                            <span>2:30</span>
                                            <span>3:00</span>
                                            <span>3:30</span>
                                        </div>
                                    </div>

                                    {/* 하단 상세 분석 (원인, 개선방안, 기대효과) */}
                                    <div className="mt-8">
                                        <div className="flex flex-col gap-6">
                                            {/* 이탈 원인 */}
                                            <div className="flex flex-col gap-2">
                                                <span className="font-body-16sb text-text-secondary">이탈 원인</span>
                                                <div className="flex flex-col gap-1 text-text-primary font-body-14r">
                                                    <p>
                                                        • 예상 뷰어 수치: 해당 구간에서 시청자가 지루함을 느낄 수 있는
                                                        반복적인 내용이 30초 이상 지속됨
                                                    </p>
                                                    <p>
                                                        • 중복된 내용: 앞서 1분 15초에 언급했던 내용과 유사한 주장이
                                                        반복되어 정보값이 낮아짐
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="h-[1px] bg-gray-20" />

                                            {/* 개선 방안 */}
                                            <div className="flex flex-col gap-1">
                                                <span className="font-body-16sb text-text-secondary">개선 방안</span>
                                                <div className="flex flex-col gap-1 text-text-primary font-body-14r">
                                                    <p>
                                                        • 진행 속도 조절: 2분 6초부터 2분 30초까지의 부연 설명 구간을
                                                        컷편집하여 10초 이내로 단축
                                                    </p>
                                                    <p>
                                                        • 그래픽 활용: 설명이 길어지는 부분에 핵심 키워드 자막이나 자료
                                                        화면을 삽입하여 시각적 변화 주기
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="h-[1px] bg-gray-20" />

                                            {/* 기대 효과 */}
                                            <div className="flex flex-col gap-1">
                                                <span className="font-body-16sb text-text-secondary">기대 효과</span>
                                                <p className="text-text-primary font-body-14r">
                                                    위 개선사항 적용 시, 해당 구간 이탈율을 약 40% 감소시킬 수 있으며,
                                                    전체 영상 평균 시청 시간을 1분 30초 이상 증가시킬 수 있을 것으로
                                                    예상됩니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 블러 페이월 오버레이 (컨테이너 전체 가로폭 및 하단 곡률 100% 동기화) */}
                                    <div className="absolute left-0 right-0 bottom-0 h-[319px] bg-white/1 backdrop-blur-[10px] z-10 flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
                                        <span className="font-body-16m text-text-primary">
                                            로그인 시, 본인 영상의 분석에서 확인할 수 있어요
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 알고리즘 최적화 */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-body-18sb text-text-primary">알고리즘 최적화</h4>
                                <div className="bg-gray-10 rounded-[20px] p-5 flex flex-col gap-4">
                                    {/* 제목 관련 */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-body-16m text-text-secondary">1. 제목 관련</span>
                                            <span className="px-1 py-0.5 rounded-[8px] bg-[#F50019]/8 text-[#F50019] font-body-14r">
                                                3점 / 10점 | 개선 필요
                                            </span>
                                        </div>
                                        <div className="flex flex-col font-body-14r text-text-primary leading-relaxed">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex">
                                                    <span className="font-body-16r mr-2">•</span>
                                                    <p className="font-body-16sb text-text-primary mr-1">문제:</p>
                                                    <p className="font-body-16r">
                                                        제목이 너무 평범하고 클릭을 유도하는 요소 부족
                                                    </p>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-body-16r mr-2">•</span>
                                                    <p className="font-body-16sb text-text-primary mr-1">개선:</p>
                                                    <p className="font-body-16r">
                                                        감정적 트리거와 호기심을 자극하는 키워드 추가
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-body-16r text-text-secondary flex ml-6">
                                                <span>•</span>
                                                <span className="ml-2">
                                                    {' 예: “20대 혼자 사는 법 | 진짜 현실적인 월세 절약 팁 3가지"'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-[1px] w-[292px] bg-border-default" />

                                    {/* 설명란 관련 */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-body-16m text-text-secondary">2. 설명란 관련</span>
                                            <span className="px-1 py-0.5 rounded-[8px] bg-gray-20 text-text-secondary font-body-14r">
                                                5점 / 10점 | 보통
                                            </span>
                                        </div>
                                        <div className="flex flex-col font-body-14r text-text-primary leading-relaxed">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex">
                                                    <span className="font-body-16r mr-2">•</span>
                                                    <p className="font-body-16sb text-text-primary mr-1">문제:</p>
                                                    <p className="font-body-16r">타임스태프와 구독 유도 문구 미흡</p>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-body-16r mr-2">•</span>
                                                    <p className="font-body-16sb text-text-primary mr-1">개선:</p>
                                                    <p className="font-body-16r">1~2줄 요약 + 타임스탬프 추가</p>
                                                </div>
                                            </div>
                                            <p className="font-body-16r text-text-secondary flex ml-6">
                                                <span>•</span>
                                                <span className="ml-2">
                                                    00:00 오늘의 주제 소개 / 00:45 팁 1 / 02:15 팁 2 / 03:40 팁 3
                                                </span>
                                            </p>
                                            <p className="font-body-16r text-text-secondary flex ml-6">
                                                <span>•</span>
                                                <span className="ml-2">
                                                    {
                                                        '콜투액션("좋아요·구독", "댓글로 여러분의 생활 팁도 공유해주세요!")'
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-[1px] w-[292px] bg-border-default" />

                                    {/* 해시태그 관련 */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-body-16m text-text-secondary">3. 해시태그 관련</span>
                                            <span className="px-1 py-0.5 rounded-[8px] bg-[#4ADE80]/8 text-[#4ADE80] font-body-14r">
                                                8점 / 10점 | 좋음
                                            </span>
                                        </div>
                                        <div className="flex flex-col font-body-14r text-text-primary leading-relaxed">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex">
                                                    <span className="font-body-16r mr-2">•</span>
                                                    <p className="font-body-16sb text-text-primary mr-1">현재 상태:</p>
                                                    <p className="font-body-16r">적절한 해시태그 사용 중</p>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-body-16r mr-2">•</span>
                                                    <p className="font-body-16sb text-text-primary mr-1">추가 제안:</p>
                                                    <p className="font-body-16r">
                                                        #20대일상 #직장인브이로그 #혼자사는법 #생활팁 #일상루틴
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[1px] w-[292px] bg-border-default" />

                                    {/* 추가 제안 */}
                                    <div className="flex flex-col gap-2">
                                        <span className="font-body-16m text-text-secondary">4. 추가 제안</span>
                                        <ul className="list-disc list-inside flex flex-col gap-1 font-body-16r text-text-primary">
                                            <p>• 챕터 타임스탬프 삽입</p>
                                            <p>• 카드·엔드스크린(플레이리스트·구독 유도)</p>
                                            <p>{'• 재생목록 섹션 생성("거리 인터뷰 시리즈")'}</p>
                                            <p>• 자동 자막(.srt) 편집 → 접근성·SEO 강화</p>
                                            <p>• 트랜스크립트 자동 분석 → 키워드 요약, 커뮤니티/블로그 활용</p>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
