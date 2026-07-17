import StatusBadge from '@/components/StatusBadge'

interface SummaryCardProps {
    status:
        | '최상'
        | '조언'
        | '우수'
        | '긍정'
        | '최적화 원활'
        | '보통'
        | '중립'
        | '양호'
        | '주의'
        | '개선 필요'
        | '최적화 필요'
        | '위험'
        | '부정'
    summaryTitle: string
    details: string
}

export default function SummaryCard({ status, summaryTitle, details }: SummaryCardProps) {
    return (
        <div className="p-5 w-full bg-bg-1 flex flex-col gap-2 rounded-[20px]">
            <StatusBadge status={status} />
            <h1 className="font-body-16sb text-text-primary">{summaryTitle}</h1>
            <p className="font-caption-14r desktop:font-[16px] text-text-secondary">{details}</p>
        </div>
    )
}
