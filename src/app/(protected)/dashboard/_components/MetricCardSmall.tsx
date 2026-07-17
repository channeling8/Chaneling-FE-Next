import StatusBadge from '@/components/StatusBadge'

interface MetricCardSmallProps {
    delta: number
    label: string
    score: number
    status: Parameters<typeof StatusBadge>[0]['status']
}

export default function MetricCardSmall({ delta, label, score, status }: MetricCardSmallProps) {
    return (
        <article className="flex min-h-[110px] min-w-0 flex-col gap-2 overflow-hidden rounded-[20px] bg-bg-1 p-4 tablet:min-h-[133px] desktop:min-h-[145px] desktop:justify-between">
            <div className="flex w-full min-w-0 items-center justify-between gap-2">
                <h2 className="min-w-0 truncate font-body-14m text-text-secondary">
                    {label}
                </h2>
                <StatusBadge status={status} />
            </div>

            <div className="flex flex-col gap-2">
                <p className="flex items-baseline whitespace-nowrap font-title-30r text-text-primary">
                    {score}
                    <span className="text-text-secondary">점</span>
                </p>
                <p className="flex items-center gap-2 whitespace-nowrap font-caption-12r text-text-tertiary">
                    <span className="font-caption-12m text-text-brand">+ {delta}</span>
                    지난 달 보다
                </p>
            </div>
        </article>
    )
}
