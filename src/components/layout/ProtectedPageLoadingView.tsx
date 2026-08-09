import DashboardLoadingView from '@/components/dashboard/DashboardLoadingView'
import { DashboardSuggestionDetailSkeleton } from '@/components/dashboard/DashboardSkeletons'
import Line from '@/components/Line'
import ReportDetailSkeleton from '@/app/(protected)/reports/_components/ReportDetailSkeleton'
import SettingsPageSkeleton from '@/app/(protected)/settings/_components/SettingsPageSkeleton'
import Scroll from '@/components/Scroll'
import { SkeletonBase } from '@/components/Skeletonbase'
import Header from './Header'
import PageContent from './PageContent'

interface ProtectedPageLoadingViewProps {
    pathname: string
}

function CardGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-2 tablet:grid-cols-2 desktop:grid-cols-4">
            {Array.from({ length: count }, (_, index) => (
                <SkeletonBase key={index} sizeConfig="h-[266px] w-full" />
            ))}
        </div>
    )
}

function DetailPageSkeleton({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <Scroll as="main" className="flex-1">
                <PageContent className="flex flex-col gap-4 pb-8 desktop:pb-16">
                    <Header title={title} className="px-0 tablet:px-0 desktop:px-0" />
                    {children}
                </PageContent>
            </Scroll>
        </div>
    )
}

function ReportsPageSkeleton() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <Header title="영상 리포트" showMenu />
                <PageContent className="flex flex-col gap-4 pb-6 pt-2 tablet:pt-4 desktop:pt-2">
                    <section className="flex flex-col gap-2">
                        <SkeletonBase sizeConfig="h-6 w-28" />
                        <SkeletonBase sizeConfig="h-12 w-full" />
                        <SkeletonBase sizeConfig="h-5 w-24 self-center" />
                        <CardGridSkeleton />
                        <SkeletonBase sizeConfig="h-10 w-full" />
                    </section>

                    <Line variant="thick" />

                    <section className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <SkeletonBase sizeConfig="h-10 w-28" />
                            <SkeletonBase sizeConfig="h-10 w-24" />
                        </div>
                        <SkeletonBase sizeConfig="h-12 w-full" />
                        <div className="flex justify-between gap-4">
                            <div className="flex gap-1">
                                {Array.from({ length: 3 }, (_, index) => (
                                    <SkeletonBase key={index} sizeConfig="h-9 w-16" />
                                ))}
                            </div>
                            <SkeletonBase sizeConfig="h-9 w-20" />
                        </div>
                        <CardGridSkeleton />
                    </section>
                </PageContent>
            </Scroll>
        </div>
    )
}

function VideoSelectionPageSkeleton() {
    return (
        <div className="h-full w-full overflow-y-auto bg-bg-0">
            <PageContent className="flex min-h-full flex-col gap-4 pb-16 pt-4">
                <Header title="내 영상 선택" className="px-0 tablet:px-0 desktop:px-0" />
                <SkeletonBase sizeConfig="h-12 w-full" />
                <div className="flex justify-between gap-4">
                    <div className="flex gap-1">
                        {Array.from({ length: 3 }, (_, index) => (
                            <SkeletonBase key={index} sizeConfig="h-9 w-16" />
                        ))}
                    </div>
                    <SkeletonBase sizeConfig="h-9 w-20" />
                </div>
                <CardGridSkeleton count={8} />
            </PageContent>
        </div>
    )
}

function ReportListPageSkeleton() {
    return (
        <div className="h-full w-full overflow-y-auto bg-bg-0">
            <PageContent className="flex min-h-full flex-col gap-4 pb-16 pt-4">
                <Header title="리포트 상세 목록" className="px-0 tablet:px-0 desktop:px-0" />
                <SkeletonBase sizeConfig="h-5 w-28" />
                <div className="flex flex-col gap-4 tablet:flex-row">
                    <SkeletonBase sizeConfig="h-46 w-full tablet:h-33.25 tablet:w-59.25 desktop:h-44.5 desktop:w-79" />
                    <SkeletonBase sizeConfig="h-28 w-full flex-1 tablet:h-33.25 desktop:h-44.5" />
                </div>
                <div className="flex flex-col gap-2">
                    {Array.from({ length: 5 }, (_, index) => (
                        <SkeletonBase key={index} sizeConfig="h-20 w-full" />
                    ))}
                </div>
            </PageContent>
        </div>
    )
}

function ReportPeriodPageSkeleton() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Header title="리포트 기간 설정" className="tablet:min-h-16 desktop:min-h-18" />
            <PageContent className="flex min-h-0 flex-1 flex-col pb-24 pt-2 tablet:pb-5 tablet:pt-4 desktop:pt-2">
                <SkeletonBase sizeConfig="h-7 w-72 max-w-full" />
                <section className="mt-4 flex flex-col gap-2">
                    <SkeletonBase sizeConfig="h-5 w-24" />
                    <div className="flex flex-wrap gap-2">
                        {['w-16', 'w-16', 'w-[88px]', 'w-24', 'w-18'].map((widthClassName, index) => (
                            <SkeletonBase key={index} sizeConfig={`h-9 ${widthClassName}`} />
                        ))}
                    </div>
                </section>
                <section className="mt-4 flex flex-col gap-2">
                    <SkeletonBase sizeConfig="h-5 w-24" />
                    <SkeletonBase sizeConfig="h-12 w-full desktop:h-[51px]" />
                    <SkeletonBase sizeConfig="h-12 w-full desktop:h-[51px]" />
                </section>
                <SkeletonBase sizeConfig="mt-4 h-12 w-full desktop:h-[49px]" />
            </PageContent>
        </div>
    )
}

function IdeasPageSkeleton() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <Header title="트렌드 · 아이디어" showMenu />
                <PageContent className="flex flex-col gap-8 pb-16">
                    <section className="flex flex-col gap-3">
                        <SkeletonBase sizeConfig="h-6 w-32" />
                        <SkeletonBase sizeConfig="h-5 w-3/4" />
                        <div className="flex gap-2">
                            <SkeletonBase sizeConfig="h-10 w-20" />
                            <SkeletonBase sizeConfig="h-10 w-28" />
                        </div>
                        {Array.from({ length: 5 }, (_, index) => (
                            <SkeletonBase key={index} sizeConfig="h-14 w-full" />
                        ))}
                    </section>
                    <Line variant="thin" />
                    <section className="flex flex-col gap-3">
                        <SkeletonBase sizeConfig="h-6 w-40" />
                        <SkeletonBase sizeConfig="h-24 w-full" />
                        <SkeletonBase sizeConfig="h-38 w-full" />
                        <SkeletonBase sizeConfig="h-12 w-full" />
                    </section>
                    <Line variant="thick" />
                    <section className="flex flex-col gap-3">
                        <SkeletonBase sizeConfig="h-6 w-28" />
                        <SkeletonBase sizeConfig="h-12 w-full" />
                        {Array.from({ length: 3 }, (_, index) => (
                            <SkeletonBase key={index} sizeConfig="h-50 w-full" />
                        ))}
                    </section>
                </PageContent>
            </Scroll>
        </div>
    )
}

function SettingsLoadingView() {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Scroll as="main" className="flex-1">
                <Header title="설정" showMenu />
                <SettingsPageSkeleton />
            </Scroll>
        </div>
    )
}

function FormPageSkeleton({ onboarding = false, title }: { onboarding?: boolean; title: string }) {
    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Header title={title} showMenu={!onboarding} />
            <Scroll as="main" className="flex-1">
                <PageContent className="flex flex-col gap-4 pb-8 pt-2">
                    <SkeletonBase sizeConfig="h-7 w-3/4" />
                    <SkeletonBase sizeConfig="h-12 w-full" />
                    <SkeletonBase sizeConfig="h-40 w-full" />
                    <SkeletonBase sizeConfig="h-32 w-full" />
                    {!onboarding && <SkeletonBase sizeConfig="h-44 w-full" />}
                    <SkeletonBase sizeConfig="h-12 w-full" />
                </PageContent>
            </Scroll>
        </div>
    )
}

export default function ProtectedPageLoadingView({ pathname }: ProtectedPageLoadingViewProps) {
    if (pathname === '/dashboard') {
        return <DashboardLoadingView />
    }

    if (pathname.startsWith('/dashboard/insights/')) {
        return (
            <DetailPageSkeleton title="채널링의 제안 상세">
                <DashboardSuggestionDetailSkeleton />
            </DetailPageSkeleton>
        )
    }

    if (/^\/reports\/\d+$/.test(pathname)) {
        return <ReportDetailSkeleton title="영상 리포트" statusMessage="리포트를 불러오고 있습니다." />
    }

    if (pathname === '/reports/period') {
        return <ReportPeriodPageSkeleton />
    }

    if (pathname === '/reports/my') {
        return <VideoSelectionPageSkeleton />
    }

    if (pathname === '/reports/list') {
        return <ReportListPageSkeleton />
    }

    if (pathname === '/reports') {
        return <ReportsPageSkeleton />
    }

    if (/^\/ideas\/[^/]+$/.test(pathname)) {
        return (
            <DetailPageSkeleton title="아이디어 상세">
                <div className="flex flex-col gap-4">
                    <SkeletonBase sizeConfig="h-5 w-36" />
                    <SkeletonBase sizeConfig="h-7 w-2/3" />
                    <SkeletonBase sizeConfig="h-60 w-full" />
                </div>
            </DetailPageSkeleton>
        )
    }

    if (pathname === '/ideas') {
        return <IdeasPageSkeleton />
    }

    if (pathname === '/settings') {
        return <SettingsLoadingView />
    }

    if (pathname === '/feedback') {
        return <FormPageSkeleton title="피드백" />
    }

    if (pathname === '/onboarding') {
        return <FormPageSkeleton onboarding title="타겟과 컨셉" />
    }

    return (
        <div className="flex h-full w-full flex-col bg-bg-0">
            <PageContent className="flex flex-col gap-4 py-6">
                <SkeletonBase sizeConfig="h-7 w-36" />
                <SkeletonBase sizeConfig="h-48 w-full" />
            </PageContent>
        </div>
    )
}
