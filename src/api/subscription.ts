import api from '@/lib/axios'
import type { ApiResponse } from '@/types'

export type SubscriptionPlan = 'FREE' | 'BASIC' | 'ENTERPRISE'
export type SubscriptionStatus = 'ACTIVE' | 'CANCEL_SCHEDULED' | 'PAST_DUE' | 'NONE'
export type SubscriptionBillingCycle = 'MONTHLY' | 'YEARLY'

export interface SubscriptionUsage {
    reportUsed: number
    reportLimit: number
    ideaUsed: number
    ideaLimit: number
}

export interface BillingHistoryItem {
    date: string
    amount: number
    receiptUrl: string | null
}

export interface SubscriptionPageData {
    plan: SubscriptionPlan
    status: SubscriptionStatus
    billingCycle: SubscriptionBillingCycle | null
    nextBillingDate: string | null
    canCancel: boolean
    usage: SubscriptionUsage
    billingHistory: BillingHistoryItem[]
}

export interface CancelSubscriptionResult {
    accessUntil: string
}

export interface SubscribeRequest {
    planId: Exclude<SubscriptionPlan, 'FREE'>
    billingCycle: SubscriptionBillingCycle
    cardNo: string
    expYear: string
    expMonth: string
    idNo: string
    cardPw: string
}

export type SubscribeStatus =
    | 'SUCCESS'
    | 'RESERVED'
    | 'REACTIVATED'
    | 'PAYMENT_FAILED'
    | 'SAVE_FAILED'
    | 'NO_CHANGE'

export interface SubscribeResult {
    status: SubscribeStatus
    orderId: string | null
    amount: number
    receiptUrl: string | null
    message: string
}

export interface PlanChangePreview {
    type: 'NEW' | 'UPGRADE' | 'DOWNGRADE' | 'CYCLE_CHANGE' | 'SAME'
    currentPlan: SubscriptionPlan
    currentCycle: SubscriptionBillingCycle | null
    targetPlan: Exclude<SubscriptionPlan, 'FREE'>
    targetCycle: SubscriptionBillingCycle
    immediateCharge: number
    nextAmount: number
    nextBillingDate: string
    remainingDays: number
}

export async function getSubscriptionPage(): Promise<SubscriptionPageData> {
    const { data } = await api.get<ApiResponse<SubscriptionPageData>>('/subscriptions/me')
    return {
        ...data.result,
        usage: data.result.usage ?? {
            reportUsed: 0,
            reportLimit: 0,
            ideaUsed: 0,
            ideaLimit: 0,
        },
        billingHistory: data.result.billingHistory ?? [],
    }
}

export async function cancelSubscription(): Promise<CancelSubscriptionResult> {
    const { data } = await api.delete<ApiResponse<CancelSubscriptionResult>>('/subscriptions')
    return data.result
}

export async function subscribe(request: SubscribeRequest): Promise<SubscribeResult> {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        const apiUrl = new URL(api.defaults.baseURL ?? window.location.origin, window.location.origin)

        if (apiUrl.protocol !== 'https:') {
            throw new Error('Payment requests require HTTPS.')
        }
    }

    const { data } = await api.post<ApiResponse<SubscribeResult>>('/subscriptions', request)
    return data.result
}

export async function previewPlanChange(
    targetPlan: Exclude<SubscriptionPlan, 'FREE'>,
    targetCycle: SubscriptionBillingCycle
): Promise<PlanChangePreview> {
    const { data } = await api.get<ApiResponse<PlanChangePreview>>('/subscriptions/change/preview', {
        params: { targetPlan, targetCycle },
    })
    return data.result
}
