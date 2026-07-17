interface VideoCardProps {
    title?: string
    leftside?: string
    leftsideamount?: string
    rightside?: string
    rightsideamount?: string
    period?: string
    onClick?: () => void
}

export default function VideoCard({ title, leftside, rightside, period, onClick }: VideoCardProps) {
    return (
        <div
            className="flex flex-col max-w-82 border border-transparent hover:border-border-active rounded-[20px]"
            onClick={onClick}
        >
            <div className="flex w-full h-46 bg-transparent rounded-t-[20px]"></div>
            <div className="flex flex-col p-4 w-full  items-start self-stretch bg-bg-1 rounded-b-[20px]">
                {period && <div className="text-text-tertiary font-caption-14r">{period}</div>}
                <div className="self-stretch text-text-primary font-body-16sb line-clamp-2">{title}</div>
                <div className="flex items-start gap-[8.816px] self-stretch">
                    <div className="text-text-secondary font-body-14r">{leftside}</div>
                    <div className="text-gray-600 font-body-14r">·</div>
                    <div className="text-text-secondary font-body-14r">{rightside}</div>
                </div>
            </div>
        </div>
    )
}
