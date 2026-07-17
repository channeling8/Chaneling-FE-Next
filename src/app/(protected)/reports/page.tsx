'use client'

import Header from '@/components/layout/Header'
import MyVideoList from './_components/MyVideoList'
import Line from '@/components/Line'
import VideoReport from './_components/VideoReport'
import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'

/**
 * 영상 리포트 목록 페이지 (/reports)
 * - 리포트 생성 섹션: 분석할 영상 URL 입력 및 리포트 생성 버튼
 * - 생성된 리포트 목록
 */
export default function ReportsPage() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <Header title="영상 리포트" showMenu={true} />
                <PageContent className="flex flex-col gap-4 pb-6 pt-2 tablet:pt-4 desktop:pt-2">
                    <MyVideoList />
                    <Line variant="thick" />
                    <VideoReport />
                </PageContent>
            </Scroll>
        </div>
    )
}
