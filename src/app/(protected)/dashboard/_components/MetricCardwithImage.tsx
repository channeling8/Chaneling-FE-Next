import { type CSSProperties } from 'react'

interface MetricCardWithImageProps {
    channelName: string
    delta: number
    imageUrl: string | null
    subscribers: string
}

export default function MetricCardWithImage({
    channelName,
    delta,
    imageUrl,
    subscribers,
}: MetricCardWithImageProps) {
    const formattedDelta = `${delta > 0 ? '+' : ''} ${delta}`
    const thumbnailStyle = imageUrl
        ? ({ '--video-thumb': `url('${imageUrl}')` } as CSSProperties)
        : undefined

    return (
        <article
            className="bg-video-card flex aspect-square w-full flex-col items-start justify-between overflow-hidden rounded-[20px] p-5"
            style={thumbnailStyle}
        >
            <h2 className="font-title-18sb text-text-primary">
                안녕하세요
                <br />
                <span className="block max-w-full truncate">{channelName}</span>
            </h2>

            <div className="flex w-full flex-col items-start">
                <span className="font-body-14m text-text-primary">구독자</span>
                <strong className="whitespace-nowrap font-title-40r text-text-primary">
                    {subscribers}
                </strong>
                <p className="flex items-center gap-2 whitespace-nowrap font-caption-12r text-text-secondary">
                    <span className="font-caption-12m text-text-brand">{formattedDelta}</span>
                    지난 달 보다
                </p>
            </div>
        </article>
    )
}
