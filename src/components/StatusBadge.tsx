interface StatusBadgeProps {
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
}

const statusStyle = {
    최상: 'bg-blue-op8 text-blue',
    조언: 'bg-blue-op8 text-blue',
    우수: 'bg-green-op8 text-green',
    긍정: 'bg-green-op8 text-green',
    '최적화 원활': 'bg-green-op8 text-green',
    보통: 'bg-bg-2 text-text-secondary',
    중립: 'bg-bg-2 text-text-secondary',
    양호: 'bg-bg-2 text-text-secondary',
    주의: 'bg-amber-op8 text-amber',
    '개선 필요': 'bg-amber-op8 text-amber',
    '최적화 필요': 'bg-amber-op8 text-amber',
    위험: 'bg-red-error-op8 text-red-error',
    부정: 'bg-red-error-op8 text-red-error',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <div
            className={`inline-flex items-center justify-center w-fit rounded-lg px-1 py-0.5 font-body-14m ${statusStyle[status]}`}
        >
            {status}
        </div>
    )
}
