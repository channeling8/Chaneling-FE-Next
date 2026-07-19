import { SkeletonBase } from '@/components/skeletonbase'

export function DashboardDateSkeleton() {
    return (
        <div aria-label="대시보드 기준 시각 불러오는 중" role="status">
            <SkeletonBase sizeConfig="h-5 w-44 rounded-md" />
        </div>
    )
}

export function DashboardProfileCardSkeleton() {
    return (
        <div
            aria-label="채널 정보 불러오는 중"
            className="flex aspect-square w-full flex-col justify-between rounded-[20px] bg-bg-1 p-5"
            role="status"
        >
            <div className="flex flex-col gap-2">
                <SkeletonBase sizeConfig="h-5 w-20 rounded-md" />
                <SkeletonBase sizeConfig="h-6 w-32 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
                <SkeletonBase sizeConfig="h-5 w-12 rounded-md" />
                <SkeletonBase sizeConfig="h-12 w-24 rounded-lg" />
                <SkeletonBase sizeConfig="h-4 w-28 rounded-md" />
            </div>
        </div>
    )
}

export function DashboardMetricCardsSkeleton() {
    return (
        <div
            aria-label="채널 점수 불러오는 중"
            className="grid min-w-0 grid-cols-2 gap-2 tablet:grid-cols-3"
            role="status"
        >
            {Array.from({ length: 6 }, (_, index) => (
                <div
                    className="flex min-h-[110px] flex-col justify-between rounded-[20px] bg-bg-1 p-4 tablet:min-h-[133px] desktop:min-h-[145px]"
                    key={index}
                >
                    <div className="flex items-center justify-between gap-3">
                        <SkeletonBase sizeConfig="h-5 w-16 rounded-md" />
                        <SkeletonBase sizeConfig="h-6 w-10 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <SkeletonBase sizeConfig="h-9 w-20 rounded-lg" />
                        <SkeletonBase sizeConfig="h-4 w-28 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function DashboardChartSkeleton() {
    return (
        <section
            aria-label="대시보드 그래프 불러오는 중"
            className="flex w-full flex-col gap-[22px] rounded-[20px] bg-bg-1 p-5"
            role="status"
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-1 gap-2">
                    {Array.from({ length: 4 }, (_, index) => (
                        <SkeletonBase
                            key={index}
                            sizeConfig="h-9 w-16 shrink-0 rounded-md"
                        />
                    ))}
                </div>
                <SkeletonBase sizeConfig="h-9 w-20 shrink-0 rounded-[20px]" />
            </div>
            <SkeletonBase sizeConfig="h-[290px] w-full" />
        </section>
    )
}

export function DashboardSuggestionsSkeleton() {
    return (
        <section
            aria-label="채널링의 제안 불러오는 중"
            className="flex w-full flex-col gap-6"
            role="status"
        >
            <div className="flex flex-col gap-2">
                <SkeletonBase sizeConfig="h-6 w-28 rounded-md" />
                <SkeletonBase sizeConfig="h-5 w-3/4 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }, (_, index) => (
                    <div
                        className="flex w-full flex-col gap-3 rounded-[20px] bg-bg-1 p-5"
                        key={index}
                    >
                        <SkeletonBase sizeConfig="h-6 w-2/5 rounded-md" />
                        <SkeletonBase sizeConfig="h-5 w-full rounded-md" />
                        <SkeletonBase sizeConfig="h-5 w-4/5 rounded-md" />
                        <div className="h-px w-full bg-border-default" />
                        <div className="flex gap-1">
                            <SkeletonBase sizeConfig="h-6 w-24 rounded-lg" />
                            <SkeletonBase sizeConfig="h-6 w-28 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export function DashboardSuggestionDetailSkeleton() {
    return (
        <article
            aria-label="제안 상세 내용 불러오는 중"
            className="flex w-full flex-col gap-4"
            role="status"
        >
            <header className="flex flex-col gap-2">
                <SkeletonBase sizeConfig="h-6 w-3/5 rounded-md" />
                <div className="flex flex-wrap gap-1">
                    <SkeletonBase sizeConfig="h-6 w-28 rounded-lg" />
                    <SkeletonBase sizeConfig="h-6 w-32 rounded-lg" />
                </div>
            </header>

            <div className="flex flex-col gap-[21px] desktop:gap-6">
                <div className="flex flex-col gap-2">
                    <SkeletonBase sizeConfig="h-5 w-full rounded-md" />
                    <SkeletonBase sizeConfig="h-5 w-11/12 rounded-md" />
                    <SkeletonBase sizeConfig="h-5 w-4/5 rounded-md" />
                </div>
                <div className="flex flex-col gap-2">
                    <SkeletonBase sizeConfig="h-5 w-full rounded-md" />
                    <SkeletonBase sizeConfig="h-5 w-5/6 rounded-md" />
                    <SkeletonBase sizeConfig="h-5 w-2/3 rounded-md" />
                </div>
            </div>

            <section className="flex flex-col gap-2">
                <SkeletonBase sizeConfig="h-5 w-44 rounded-md" />
                <div className="flex flex-col gap-1 pl-[21px] desktop:pl-6">
                    <SkeletonBase sizeConfig="h-5 w-5/6 rounded-md" />
                    <SkeletonBase sizeConfig="h-5 w-3/4 rounded-md" />
                </div>
            </section>
        </article>
    )
}
