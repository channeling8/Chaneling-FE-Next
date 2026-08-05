import { SkeletonBase } from '@/components/Skeletonbase'

function SectionTitleSkeleton({ width }: { width: string }) {
    return <SkeletonBase sizeConfig={`h-6 ${width}`} />
}

export default function OverviewTabSkeleton() {
    return (
        <div className="flex flex-col gap-8 pt-8" aria-label="개요 리포트를 생성하는 중">
            <section className="flex flex-col gap-2">
                <SectionTitleSkeleton width="w-24" />
                <SkeletonBase sizeConfig="h-72 w-full" />
            </section>

            <section className="flex flex-col gap-2">
                <SectionTitleSkeleton width="w-20" />
                <div className="grid grid-cols-2 gap-2 tablet:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <SkeletonBase key={index} sizeConfig="h-32 w-full" />
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-2">
                <SectionTitleSkeleton width="w-20" />
                <SkeletonBase sizeConfig="h-64 w-full" />
            </section>

            <section className="flex flex-col gap-2">
                <SectionTitleSkeleton width="w-20" />
                <SkeletonBase sizeConfig="h-96 w-full" />
            </section>
        </div>
    )
}
