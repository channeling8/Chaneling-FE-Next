import type { User } from '@/types'

export type BillingCycle = 'monthly' | 'yearly'
export type PlanName = 'Free' | 'Creator' | 'Pro'

export type UserWithPlan = User & {
    currentPlan?: string
    plan?: string
    planName?: string
    subscriptionPlan?: string
    subscriptionTier?: string
}

export interface PricingFeature {
    label: string
    value: string
}

export interface PricingPlan {
    name: PlanName
    description: string
    prices: Record<BillingCycle, { price: string; originalPrice?: string; unit?: string }>
    features: PricingFeature[]
    selectButtonLabel: string
}
