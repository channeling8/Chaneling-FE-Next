interface SkeletonTitleBaseProps {
    children?: React.ReactNode
    titleSizeConfig?: string
}

export function SkeletonBase({ sizeConfig = 'h-46 w-82' }: { sizeConfig?: string }) {
    return (
        <div
            className={`animate-custom-wave bg-linear-to-r from-white/5 via-white/10 to-white/5 rounded-[20px] ${sizeConfig}`}
        ></div>
    )
}

export function SkeletonTitleBase({ children, titleSizeConfig = 'h-6.25 w-20' }: SkeletonTitleBaseProps) {
    return (
        <div className="flex flex-col gap-4">
            <SkeletonBase sizeConfig={titleSizeConfig} />
            {children && <div className="flex-1 w-full">{children}</div>}
        </div>
    )
}
