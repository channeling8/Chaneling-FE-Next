import type { BillingCycle, PlanName, PricingPlan } from '../types'

interface PricingPlanCardProps {
    billingCycle: BillingCycle
    currentPlan: PlanName
    isLoggedIn: boolean
    isRecommended: boolean
    onSelectPlan?: (plan: PlanName) => void
    plan: PricingPlan
}

export default function PricingPlanCard({
    billingCycle,
    currentPlan,
    isLoggedIn,
    isRecommended,
    onSelectPlan,
    plan,
}: PricingPlanCardProps) {
    const price = plan.prices[billingCycle]
    const isCurrentPlan = isLoggedIn && currentPlan === plan.name
    const buttonLabel = !isLoggedIn && plan.name === 'Free' ? '지금 시작' : plan.selectButtonLabel
    const shouldBreakAdditionalFeature = plan.name === 'Pro'

    return (
        <article
            className={`relative flex min-h-[184px] w-full flex-col items-start gap-4 rounded-[20px] p-6 tablet:min-h-[343px] desktop:min-h-[326px] ${
                isRecommended
                    ? 'border border-primary-60 bg-[linear-gradient(144deg,rgba(233,73,90,0.32)_6%,rgba(233,73,90,0.08)_94%)]'
                    : 'bg-bg-1'
            }`}
        >
            {isRecommended && (
                <span className="absolute right-[19px] top-[19px] rounded-lg bg-primary-60 px-2 py-1 font-caption-14m text-text-primary">
                    추천
                </span>
            )}

            <div className="flex w-[128px] flex-col items-start gap-1">
                <h2 className="font-body-14m text-text-primary desktop:font-body-16m">{plan.name}</h2>
                <p className="font-caption-12r text-text-secondary desktop:font-caption-14r">
                    {plan.description}
                </p>
            </div>

            <div className="flex items-end whitespace-nowrap">
                <p className="font-title-30r text-text-primary desktop:font-title-30r">{price.price}</p>
                {(price.unit || price.originalPrice) && (
                    <div className="flex items-center gap-1 pb-1 font-caption-12r text-text-secondary desktop:font-caption-14r">
                        {price.unit && <span>{price.unit}</span>}
                        {price.originalPrice && <span className="line-through">{price.originalPrice}</span>}
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={() => onSelectPlan?.(plan.name)}
                disabled={isCurrentPlan}
                aria-current={isCurrentPlan ? 'true' : undefined}
                className={`flex w-full items-center justify-center rounded-[10px] p-2 font-body-16sb transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active ${
                    isCurrentPlan
                        ? 'cursor-default border border-gray-40 bg-gray-30 text-text-tertiary'
                        : 'bg-primary-60 text-text-primary hover:bg-primary-50'
                }`}
            >
                {isCurrentPlan ? '현재 플랜' : buttonLabel}
            </button>

            <dl className="flex w-full flex-col gap-2 font-caption-12r desktop:font-caption-14r">
                {plan.features.map((feature) => (
                    <div key={`${plan.name}-${feature.label}`} className="flex w-full items-start justify-between gap-4">
                        <dt className="shrink-0 whitespace-nowrap text-text-secondary">{feature.label}</dt>
                        <dd className="min-w-0 text-right text-text-primary">
                            {shouldBreakAdditionalFeature && feature.label === '추가 기능' ? (
                                <>
                                    <span className="tablet:hidden desktop:block">{feature.value}</span>
                                    <span className="hidden tablet:block desktop:hidden">
                                        이메일 리포트 &<br />
                                        실험 기능 얼리 액세스
                                    </span>
                                </>
                            ) : (
                                feature.value
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </article>
    )
}
