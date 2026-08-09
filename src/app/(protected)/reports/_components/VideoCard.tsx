import Image from 'next/image'

interface VideoCardProps {
    title?: string
    leftside?: string
    leftsideamount?: string
    rightside?: string
    rightsideamount?: string
    period?: string
    imageUrl?: string
    onClick?: () => void
}

export default function VideoCard({
    title,
    leftside,
    leftsideamount,
    rightside,
    rightsideamount,
    period,
    imageUrl,
    onClick,
}: VideoCardProps) {
    return (
        <div
            className="flex flex-col w-full border border-transparent hover:border-border-active rounded-[20px]"
            onClick={onClick}
        >
            {imageUrl ? (
                <div className="relative overflow-hidden h-46 w-full rounded-t-[20px] block ">
                    <Image src={imageUrl} fill alt={title ?? '영상 썸네일'} className="object-cover" />
                </div>
            ) : (
                <div className="h-46 w-full rounded-t-[20px] bg-bg-1" />
            )}
            <div className="flex flex-col p-4 w-full items-start self-stretch bg-bg-1 rounded-b-[20px]">
                {period && <div className="text-text-tertiary font-caption-14r">{period}</div>}
                <div className="self-stretch h-13.5 text-text-primary font-body-16sb line-clamp-2">{title}</div>
                <div className="flex items-start gap-[8.816px] self-stretch">
                    <div className="text-text-secondary font-body-14r">{leftside}</div>
                    {leftsideamount && <div className="text-text-secondary font-body-14r">{leftsideamount}</div>}
                    <div className="text-gray-600 font-body-14r">·</div>
                    <div className="text-text-secondary font-body-14r">{rightside}</div>
                    {rightsideamount && <div className="text-text-secondary font-body-14r">{rightsideamount}</div>}
                </div>
            </div>
        </div>
    )
}
