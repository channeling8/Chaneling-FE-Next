import { SkeletonBase } from '@/components/skeletonbase'

export default function SidebarSkeleton() {
    return (
        <aside
            aria-busy="true"
            aria-label="사이드바를 불러오는 중"
            className="hidden h-screen w-[192px] shrink-0 flex-col bg-bg-1 px-4 py-8 desktop:flex"
        >
            <div className="flex flex-1 flex-col gap-4">
                <SkeletonBase sizeConfig="h-8 w-30" />
                <div className="flex flex-col gap-2">
                    <SkeletonBase sizeConfig="h-10 w-full" />
                    <SkeletonBase sizeConfig="h-10 w-full" />
                    <SkeletonBase sizeConfig="h-10 w-full" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <SkeletonBase sizeConfig="h-10 w-full" />
                <SkeletonBase sizeConfig="h-18 w-full" />
            </div>
        </aside>
    )
}
