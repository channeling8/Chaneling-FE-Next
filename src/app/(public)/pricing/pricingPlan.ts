import type { PlanName, UserWithPlan } from './types'

function normalizePlanName(plan?: string | null): PlanName | null {
    if (!plan) return null

    const normalizedPlan = plan.trim().toLowerCase()

    if (normalizedPlan === 'free') return 'Free'
    if (normalizedPlan === 'creator') return 'Creator'
    if (normalizedPlan === 'pro') return 'Pro'

    return null
}

export function getCurrentPlan(user: UserWithPlan | null, isLoggedIn: boolean): PlanName {
    if (!isLoggedIn) return 'Free'

    return (
        normalizePlanName(user?.subscriptionPlan) ??
        normalizePlanName(user?.subscriptionTier) ??
        normalizePlanName(user?.currentPlan) ??
        normalizePlanName(user?.planName) ??
        normalizePlanName(user?.plan) ??
        'Free'
    )
}

export function getRecommendedPlan(currentPlan: PlanName): PlanName | null {
    if (currentPlan === 'Free') return 'Creator'
    if (currentPlan === 'Creator') return 'Pro'

    return null
}
