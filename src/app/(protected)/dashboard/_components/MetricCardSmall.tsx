import StatusBadge from '@/components/StatusBadge'
import InfoIcon from '@/assets/icons/infoIcon.svg'
import DashboardTooltip from './DashboardTooltip'

interface MetricCardSmallProps {
    delta: number | null
    label: string
    score: number | null
    status: Parameters<typeof StatusBadge>[0]['status'] | null
    onClick: () => void
    isOpen: boolean
}

export default function MetricCardSmall({ delta, label, score, status, onClick, isOpen }: MetricCardSmallProps) {
    const formattedDelta = delta === null ? '-' : `${delta > 0 ? '+' : ''} ${delta}`

    return (
        <article className="flex relative min-h-27.5 min-w-0 flex-col gap-2 rounded-[20px] bg-bg-1 p-4 tablet:min-h-33.25 desktop:min-h-36.25 desktop:justify-between">
            <div className="flex w-full min-w-0 items-center justify-between gap-2">
                <div className="flex gap-0.5 items-center">
                    <h2 className="min-w-0 truncate font-body-14m text-text-secondary">{label}</h2>

                    <button className="size-4 [&_svg]:w-full [&_svg]:h-full " onClick={onClick}>
                        <InfoIcon />
                    </button>
                </div>
                {status && <StatusBadge status={status} />}
            </div>

            <div className="flex flex-col gap-2">
                <p className="flex items-baseline whitespace-nowrap font-title-30r text-text-primary">
                    {score ?? '-'}
                    {score !== null && <span className="text-text-secondary">점</span>}
                </p>
                <p className="flex items-center gap-2 whitespace-nowrap font-caption-12r text-text-tertiary">
                    <span className="font-caption-12m text-text-brand">{formattedDelta}</span>
                    지난 달 보다
                </p>
            </div>
            {isOpen && <DashboardTooltip label={label} />}
        </article>
    )
}
