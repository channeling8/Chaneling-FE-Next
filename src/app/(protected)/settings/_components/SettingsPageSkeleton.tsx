import Line from '@/components/Line'
import PageContent from '@/components/layout/PageContent'
import { SkeletonBase } from '@/components/skeletonbase'

function SectionLine() {
    return <div className="h-px w-full bg-border-default" />
}

export default function SettingsPageSkeleton() {
    return (
        <PageContent aria-busy="true" aria-label="설정 정보를 불러오는 중" className="flex flex-col gap-8 pb-8">
            <div className="flex flex-col gap-5.5 pt-4.25 desktop:pt-0">
                <SkeletonBase sizeConfig="h-20 w-20 rounded-full tablet:h-30 tablet:w-30 desktop:h-48.25 desktop:w-48.25" />

                <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <SkeletonBase sizeConfig="h-3 w-12" />
                        <SkeletonBase sizeConfig="h-5 w-32" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <SkeletonBase sizeConfig="h-3 w-10" />
                        <SkeletonBase sizeConfig="h-5 w-48" />
                    </div>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <SkeletonBase sizeConfig="h-22 w-full desktop:h-25" />
                    <SkeletonBase sizeConfig="h-38 w-full desktop:h-45" />
                </div>
            </div>

            <Line variant="thick" />

            <div className="flex flex-col gap-4">
                <SkeletonBase sizeConfig="h-3 w-14" />
                <SkeletonBase sizeConfig="h-8 w-full" />
                <SectionLine />
                <SkeletonBase sizeConfig="h-3 w-10" />
                <SkeletonBase sizeConfig="h-12 w-full" />
                <SectionLine />
                <SkeletonBase sizeConfig="h-3 w-14" />
                <SkeletonBase sizeConfig="h-30 w-full" />
                <SectionLine />
                <SkeletonBase sizeConfig="h-12 w-full" />
            </div>

            <Line variant="thick" />

            <div className="flex flex-col gap-4">
                <SkeletonBase sizeConfig="h-3 w-16" />
                <SkeletonBase sizeConfig="h-12 w-full" />
                <SkeletonBase sizeConfig="h-12 w-full" />
            </div>

            <Line variant="thick" />

            <div className="flex flex-col gap-4">
                <SkeletonBase sizeConfig="h-8 w-full" />
                <SkeletonBase sizeConfig="h-8 w-full" />
            </div>
        </PageContent>
    )
}
