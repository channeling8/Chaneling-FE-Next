'use client'

import Line from '@/components/Line'
import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import Scroll from '@/components/Scroll'
import { useLayoutStore } from '@/stores/layoutStore'
import ContentIdeaGeneration from './_components/ContentIdeaGeneration'
import SavedIdea from './_components/SavedIdea'
import TrendKeyword from './_components/TrendKeyword'

/**
 * 아이디어 페이지 (/ideas)
 * - 콘텐츠 기획 아이디어 리스트
 * - 아이디어 생성 도구
 */
export default function IdeasPage() {
    const openSidebar = useLayoutStore((state) => state.openSidebar)

    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <Header title="트렌드 · 아이디어" showMenu={true} />
                <PageContent className="flex flex-col gap-8 pb-16">
                    <div className="flex flex-col items-center gap-4">
                        <TrendKeyword />
                        <Line variant="thin" />
                        <ContentIdeaGeneration />
                    </div>
                    <Line variant="thick" />
                    <SavedIdea />
                </PageContent>
            </Scroll>
        </div>
    )
}
