import Link from 'next/link'

interface PlanManagementSectionProps {
    onViewBilling?: (date: string) => void
    onCancelPlan?: () => void
}

const billingHistory = [
    { date: '2026년 2월 2일', amount: '9,900원' },
    { date: '2026년 3월 2일', amount: '9,900원' },
    { date: '2026년 4월 2일', amount: '9,900원' },
    { date: '2026년 5월 2일', amount: '9,900원' },
    { date: '2026년 6월 2일', amount: '9,900원' },
]

const usage = [
    { label: '리포트 생성 횟수', current: 5, limit: 10 },
    { label: '아이디어 생성 횟수', current: 20, limit: 30 },
]

function SectionLine() {
    return <div className="h-px w-full bg-border-default" />
}

export default function PlanManagementSection({ onViewBilling, onCancelPlan }: PlanManagementSectionProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <p className="font-caption-12m text-text-secondary">플랜 관리</p>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="font-body-16sb text-text-primary">Pro 플랜</h2>
                        <Link
                            href="/pricing"
                            className="shrink-0 rounded-[20px] bg-primary-60 px-3 py-1.5 font-body-14m text-text-primary transition-colors hover:bg-primary-70"
                        >
                            업그레이드
                        </Link>
                    </div>
                    <p className="truncate font-caption-12r text-text-secondary">
                        2026년 7월 2일에 자동으로 갱신됩니다
                    </p>
                </div>
            </div>

            <SectionLine />

            <div className="flex flex-col gap-2">
                <p className="font-caption-12m text-text-secondary">사용량</p>
                {usage.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 font-body-16sb">
                        <span className="truncate text-text-primary">{item.label}</span>
                        <span className="shrink-0">
                            <span className="font-body-16m text-text-brand">{item.current}</span>
                            <span className="font-body-16r text-text-secondary">/{item.limit}</span>
                        </span>
                    </div>
                ))}
            </div>

            <SectionLine />

            <div className="flex flex-col gap-2 text-text-secondary">
                <p className="font-caption-12m">청구 내역</p>
                <div className="flex flex-col gap-1 font-body-16r">
                    {billingHistory.map((billing) => (
                        <div key={billing.date} className="flex items-start justify-between">
                            <span className="w-26.75 shrink-0 desktop:w-34.5">{billing.date}</span>
                            <span className="shrink-0 whitespace-nowrap">{billing.amount}</span>
                            <button
                                type="button"
                                onClick={() => onViewBilling?.(billing.date)}
                                aria-label={`
${billing.date} 청구 내역 보기`}
                                className="shrink-0 whitespace-nowrap font-body-14r underline underline-offset-2 transition-colors hover:text-text-primary"
                            >
                                보기
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <SectionLine />

            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="font-body-16sb text-text-primary">플랜 취소</h2>
                    <button
                        type="button"
                        onClick={onCancelPlan}
                        aria-label="플랜 취소"
                        className="shrink-0 rounded-[20px] bg-bg-1 px-3 py-1.5 font-body-14m text-text-primary transition-colors hover:bg-bg-2"
                    >
                        취소
                    </button>
                </div>
                <p className="truncate font-caption-12r text-text-secondary">취소 후에도 만료일까지 이용 가능합니다</p>
            </div>
        </div>
    )
}
