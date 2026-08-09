import Link from 'next/link'
import type { SubscriptionPageData } from '@/api/subscription'

interface PlanManagementSectionProps {
    onCancelPlan?: () => void
    onRetry?: () => void
    subscription?: SubscriptionPageData
}

const PLAN_LABEL: Record<SubscriptionPageData['plan'], string> = {
    FREE: 'Free 플랜',
    BASIC: 'Creator 플랜',
    ENTERPRISE: 'Pro 플랜',
}

const BILLING_CYCLE_LABEL: Record<NonNullable<SubscriptionPageData['billingCycle']>, string> = {
    MONTHLY: '월간',
    YEARLY: '연간',
}

function SectionLine() {
    return <div className="h-px w-full bg-border-default" />
}

function formatBillingDate(date: string | null) {
    if (!date) return ''

    const [year, month, day] = date.split('-').map(Number)
    if (!year || !month || !day) return date

    return `${year}년 ${month}월 ${day}일`
}

function getSubscriptionDescription(subscription: SubscriptionPageData) {
    const nextBillingDate = formatBillingDate(subscription.nextBillingDate)

    if (subscription.status === 'CANCEL_SCHEDULED') {
        return nextBillingDate ? `${nextBillingDate}까지 이용할 수 있습니다` : '구독 해지가 예약되어 있습니다'
    }

    if (subscription.status === 'PAST_DUE') {
        return '결제에 실패했습니다. 결제 정보를 확인해주세요'
    }

    if (subscription.status === 'ACTIVE') {
        return nextBillingDate ? `${nextBillingDate}에 자동으로 갱신됩니다` : '구독 중인 플랜입니다'
    }

    return '무료 플랜을 이용 중입니다'
}

export default function PlanManagementSection({ onCancelPlan, onRetry, subscription }: PlanManagementSectionProps) {
    if (!subscription) {
        return (
            <div className="flex flex-col gap-3">
                <p className="font-caption-12m text-text-secondary">플랜 관리</p>
                <p className="font-body-14r text-text-secondary">구독 정보를 불러오지 못했습니다.</p>
                <button
                    type="button"
                    onClick={onRetry}
                    className="w-fit rounded-[20px] bg-bg-1 px-3 py-1.5 font-body-14m text-text-primary transition-colors hover:bg-bg-2"
                >
                    다시 시도
                </button>
            </div>
        )
    }

    const usage = [
        { label: '리포트 생성 횟수', current: subscription.usage.reportUsed, limit: subscription.usage.reportLimit },
        { label: '아이디어 생성 횟수', current: subscription.usage.ideaUsed, limit: subscription.usage.ideaLimit },
    ]
    const billingCycleLabel = subscription.billingCycle ? BILLING_CYCLE_LABEL[subscription.billingCycle] : null

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <p className="font-caption-12m text-text-secondary">플랜 관리</p>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="font-body-16sb text-text-primary">
                            {PLAN_LABEL[subscription.plan]}
                            {billingCycleLabel && (
                                <span className="ml-1 font-body-14r text-text-secondary">· {billingCycleLabel}</span>
                            )}
                        </h2>
                        <Link
                            href="/pricing"
                            className="shrink-0 rounded-[20px] bg-primary-60 px-3 py-1.5 font-body-14m text-text-primary transition-colors hover:bg-primary-70"
                        >
                            {subscription.plan === 'FREE' ? '업그레이드' : '플랜 변경'}
                        </Link>
                    </div>
                    <p className="truncate font-caption-12r text-text-secondary">
                        {getSubscriptionDescription(subscription)}
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
                    {subscription.billingHistory.map((billing) => (
                        <div key={billing.date} className="flex items-start justify-between">
                            <span className="w-26.75 shrink-0 desktop:w-34.5">{formatBillingDate(billing.date)}</span>
                            <span className="shrink-0 whitespace-nowrap">{billing.amount.toLocaleString()}원</span>
                            {billing.receiptUrl ? (
                                <a
                                    href={billing.receiptUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`${formatBillingDate(billing.date)} 청구 내역 보기`}
                                    className="shrink-0 whitespace-nowrap font-body-14r underline underline-offset-2 transition-colors hover:text-text-primary"
                                >
                                    보기
                                </a>
                            ) : (
                                <span className="shrink-0 font-body-14r text-text-tertiary">-</span>
                            )}
                        </div>
                    ))}
                    {subscription.billingHistory.length === 0 && (
                        <p className="font-body-14r text-text-tertiary">청구 내역이 없습니다.</p>
                    )}
                </div>
            </div>

            {subscription.plan !== 'FREE' && (
                <>
                    <SectionLine />

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="font-body-16sb text-text-primary">플랜 취소</h2>
                            <button
                                type="button"
                                onClick={onCancelPlan}
                                aria-label="플랜 취소"
                                disabled={!subscription.canCancel}
                                className="shrink-0 rounded-[20px] bg-bg-1 px-3 py-1.5 font-body-14m text-text-primary transition-colors hover:bg-bg-2 disabled:cursor-not-allowed disabled:text-text-disabled"
                            >
                                {subscription.status === 'CANCEL_SCHEDULED' ? '해지 예약됨' : '취소'}
                            </button>
                        </div>
                        <p className="truncate font-caption-12r text-text-secondary">
                            취소 후에도 만료일까지 이용 가능합니다
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}
