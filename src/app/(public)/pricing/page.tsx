'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
    cancelSubscription,
    getSubscriptionPage,
    previewPlanChange,
    subscribe,
    type SubscribeRequest,
    type SubscriptionPlan,
} from '@/api/subscription'
import { useAuthStore } from '@/stores/authStore'
import BillingTabs from './_components/BillingTabs'
import EnterpriseCard from './_components/EnterpriseCard'
import PricingCardPaymentModal from './_components/PricingCardPaymentModal'
import PricingHeader from './_components/PricingHeader'
import PricingPlanChangeModal from './_components/PricingPlanChangeModal'
import PricingPlanCard from './_components/PricingPlanCard'
import PricingPaymentFailureModal from './_components/PricingPaymentFailureModal'
import { getCurrentPlan, getRecommendedPlan } from './pricingPlan'
import { plans } from './pricingPlans'
import type { BillingCycle, PlanName } from './types'

type PlanChangeModalVariant = 'downgrade' | 'upgrade'
type PaidPlanName = Exclude<PlanName, 'Free'>

const planPriority: Record<PlanName, number> = {
    Free: 0,
    Creator: 1,
    Pro: 2,
}

const subscriptionPlanId: Record<PaidPlanName, SubscribeRequest['planId']> = {
    Creator: 'BASIC',
    Pro: 'ENTERPRISE',
}

const pricingPlanNameBySubscriptionPlan: Record<SubscriptionPlan, PlanName> = {
    FREE: 'Free',
    BASIC: 'Creator',
    ENTERPRISE: 'Pro',
}

export default function PricingPage() {
    const queryClient = useQueryClient()
    const isLoggedIn = useAuthStore((state) => state.isAuth)
    const user = useAuthStore((state) => state.user)
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
    const [planChangeModalVariant, setPlanChangeModalVariant] = useState<PlanChangeModalVariant | null>(null)
    const [pendingPlanChange, setPendingPlanChange] = useState<PlanName | null>(null)
    const [paymentPlan, setPaymentPlan] = useState<PaidPlanName | null>(null)
    const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false)
    const [isPaymentFailureOpen, setIsPaymentFailureOpen] = useState(false)
    const [isPlanChangeSubmitting, setIsPlanChangeSubmitting] = useState(false)
    const [planChangeError, setPlanChangeError] = useState<string | null>(null)
    const [locallyActivatedPlan, setLocallyActivatedPlan] = useState<PlanName | null>(null)
    const currentSubscriptionQuery = useQuery({
        queryKey: ['subscription', 'me'],
        queryFn: getSubscriptionPage,
        enabled: isLoggedIn,
        staleTime: 60_000,
    })
    const isCurrentPlanLoading = isLoggedIn && !locallyActivatedPlan && currentSubscriptionQuery.isPending
    const currentPlan: PlanName | null = !isLoggedIn
        ? 'Free'
        : (locallyActivatedPlan ??
          (currentSubscriptionQuery.data
              ? pricingPlanNameBySubscriptionPlan[currentSubscriptionQuery.data.plan]
              : currentSubscriptionQuery.isError
                ? getCurrentPlan(user, isLoggedIn)
                : null))
    const recommendedPlan = currentPlan ? getRecommendedPlan(currentPlan) : null
    const pendingPaidPlan = pendingPlanChange && pendingPlanChange !== 'Free' ? pendingPlanChange : null
    const previewPlan = paymentPlan ?? pendingPaidPlan
    const targetPlanId = previewPlan ? subscriptionPlanId[previewPlan] : null
    const targetBillingCycle = billingCycle === 'monthly' ? 'MONTHLY' : 'YEARLY'
    const paymentPreviewQuery = useQuery({
        queryKey: ['subscription', 'change-preview', targetPlanId, targetBillingCycle],
        queryFn: () => previewPlanChange(targetPlanId!, targetBillingCycle),
        enabled: Boolean(targetPlanId),
        staleTime: 0,
    })

    const handleSelectPlan = (planName: PlanName) => {
        if (!isLoggedIn || !currentPlan) return

        setPlanChangeError(null)

        if (planName !== 'Free' && currentPlan === 'Free') {
            setPaymentPlan(planName)
            return
        }

        setPendingPlanChange(planName)
        setPlanChangeModalVariant(planPriority[planName] > planPriority[currentPlan] ? 'upgrade' : 'downgrade')
    }

    const closePlanChangeModal = () => {
        if (isPlanChangeSubmitting) return
        setPlanChangeModalVariant(null)
        setPendingPlanChange(null)
        setPlanChangeError(null)
    }

    const handleConfirmPlanChange = async () => {
        if (!pendingPlanChange || isPlanChangeSubmitting) return

        if (pendingPlanChange !== 'Free') {
            setPaymentPlan(pendingPlanChange)
            closePlanChangeModal()
            return
        }

        setIsPlanChangeSubmitting(true)
        setPlanChangeError(null)

        try {
            await cancelSubscription()
            setPlanChangeModalVariant(null)
            setPendingPlanChange(null)
            void queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] })
        } catch {
            setPlanChangeError('구독을 취소하지 못했습니다. 잠시 후 다시 시도해주세요.')
        } finally {
            setIsPlanChangeSubmitting(false)
        }
    }

    const handlePaymentSubmit = async (request: SubscribeRequest) => {
        setIsPaymentSubmitting(true)

        try {
            const result = await subscribe(request)

            if (result.status === 'PAYMENT_FAILED' || result.status === 'SAVE_FAILED') {
                setIsPaymentFailureOpen(true)
                return false
            }

            if (result.status !== 'RESERVED' && paymentPlan) setLocallyActivatedPlan(paymentPlan)

            setPaymentPlan(null)
            void queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] })
            return true
        } catch {
            setIsPaymentFailureOpen(true)
            return false
        } finally {
            setIsPaymentSubmitting(false)
        }
    }

    return (
        <main
            className="flex min-h-screen flex-col bg-bg-0 text-text-primary"
            data-auth-state={isLoggedIn ? 'logged-in' : 'guest'}
        >
            <PricingHeader isLoggedIn={isLoggedIn} />

            <section className="flex w-full flex-1 flex-col items-center gap-8 px-4 pb-10 pt-4 tablet:px-4 desktop:px-16">
                <div className="flex w-full flex-col items-center gap-4">
                    <h2 className="font-title-20sb text-text-primary">플랜 업그레이드</h2>
                    <BillingTabs selected={billingCycle} onSelect={setBillingCycle} />
                </div>

                <div className="flex w-full max-w-[1312px] flex-col items-center gap-2">
                    <div className="grid w-full grid-cols-1 gap-2 tablet:grid-cols-3">
                        {plans.map((plan) => (
                            <PricingPlanCard
                                key={plan.name}
                                billingCycle={billingCycle}
                                currentPlan={currentPlan}
                                isLoggedIn={isLoggedIn}
                                isPlanLoading={isCurrentPlanLoading}
                                isRecommended={recommendedPlan === plan.name}
                                onSelectPlan={handleSelectPlan}
                                plan={plan}
                            />
                        ))}
                    </div>
                    <EnterpriseCard />
                    <p className="mt-2 font-caption-12r text-text-tertiary desktop:font-caption-14r">
                        플랜 변경 가능 · 미사용 시 7일 이내 전액 환불 · 부가세 포함
                    </p>
                </div>
            </section>

            {planChangeModalVariant && pendingPlanChange && (
                <PricingPlanChangeModal
                    actionError={planChangeError}
                    currentPlanEndDate={currentSubscriptionQuery.data?.nextBillingDate}
                    isOpen
                    isPending={isPlanChangeSubmitting}
                    isPreviewError={
                        pendingPlanChange !== 'Free' &&
                        paymentPreviewQuery.isError &&
                        !paymentPreviewQuery.isFetching
                    }
                    isPreviewLoading={
                        pendingPlanChange !== 'Free' &&
                        (paymentPreviewQuery.isPending || paymentPreviewQuery.isFetching)
                    }
                    onClose={closePlanChangeModal}
                    onConfirm={() => void handleConfirmPlanChange()}
                    onRetryPreview={() => void paymentPreviewQuery.refetch()}
                    preview={pendingPlanChange === 'Free' ? null : paymentPreviewQuery.data}
                    targetPlan={pendingPlanChange}
                    variant={planChangeModalVariant}
                />
            )}

            {paymentPlan && (
                <PricingCardPaymentModal
                    amount={paymentPreviewQuery.data?.immediateCharge ?? null}
                    amountError={paymentPreviewQuery.isError && !paymentPreviewQuery.isFetching}
                    billingCycle={billingCycle}
                    isOpen
                    isAmountLoading={paymentPreviewQuery.isPending || paymentPreviewQuery.isFetching}
                    isSubmitting={isPaymentSubmitting}
                    nextAmount={paymentPreviewQuery.data?.nextAmount ?? null}
                    nextBillingDate={paymentPreviewQuery.data?.nextBillingDate ?? null}
                    onClose={() => {
                        if (!isPaymentSubmitting) setPaymentPlan(null)
                    }}
                    onRetryAmount={() => void paymentPreviewQuery.refetch()}
                    onSubmit={handlePaymentSubmit}
                    planName={paymentPlan}
                    planId={subscriptionPlanId[paymentPlan]}
                />
            )}

            <PricingPaymentFailureModal
                isOpen={isPaymentFailureOpen}
                onClose={() => setIsPaymentFailureOpen(false)}
            />
        </main>
    )
}
