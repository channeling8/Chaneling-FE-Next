'use client'

import { useEffect } from 'react'
import type { PlanChangePreview } from '@/api/subscription'
import type { PlanName } from '../types'

type PricingPlanChangeModalVariant = 'downgrade' | 'upgrade'

interface PricingPlanChangeModalProps {
    actionError?: string | null
    currentPlanEndDate?: string | null
    isOpen: boolean
    isPending?: boolean
    isPreviewError?: boolean
    isPreviewLoading?: boolean
    onClose: () => void
    onConfirm: () => void
    onRetryPreview?: () => void
    preview?: PlanChangePreview | null
    targetPlan: PlanName
    variant: PricingPlanChangeModalVariant
}

const formatCurrency = (amount: number) => `${amount.toLocaleString('ko-KR')}원`

const formatDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number)
    if (!year || !month || !day) return date
    return `${month}월 ${day}일`
}

export default function PricingPlanChangeModal({
    actionError,
    currentPlanEndDate,
    isOpen,
    isPending = false,
    isPreviewError = false,
    isPreviewLoading = false,
    onClose,
    onConfirm,
    onRetryPreview,
    preview,
    targetPlan,
    variant,
}: PricingPlanChangeModalProps) {
    const isFreeChange = targetPlan === 'Free'
    const actionLabel = isFreeChange ? '구독 취소' : variant === 'upgrade' ? '결제' : '변경'
    const title = isFreeChange
        ? 'Free 플랜으로 변경할까요?'
        : variant === 'upgrade'
          ? `${targetPlan} 플랜으로 업그레이드할까요?`
          : '플랜 변경 전 확인해 주세요.'

    let description = '변경 내용을 계산하고 있어요.'

    if (isFreeChange) {
        description = currentPlanEndDate
            ? `${formatDate(currentPlanEndDate)}까지 현재 플랜의 모든 혜택을 이용할 수 있으며, 이후 Free 플랜으로 변경됩니다.`
            : '구독 취소 후 현재 결제 기간이 끝나면 Free 플랜으로 변경됩니다.'
    } else if (isPreviewError) {
        description = '플랜 변경 정보를 불러오지 못했습니다.'
    } else if (preview && variant === 'upgrade') {
        description = `남은 기간에 대한 차액 ${formatCurrency(preview.immediateCharge)}이 즉시 결제되며, 완료 즉시 확장된 기능을 이용할 수 있습니다. 다음 정기 결제일(${formatDate(preview.nextBillingDate)})부터는 ${formatCurrency(preview.nextAmount)}이 청구됩니다.`
    } else if (preview) {
        description = `다음 정기 결제일인 ${formatDate(preview.nextBillingDate)}부터 해당 요금제가 적용됩니다. 남은 기간 동안은 현재 요금제의 모든 혜택을 그대로 이용할 수 있습니다.`
    }

    const isConfirmDisabled = isPending || (!isFreeChange && (isPreviewLoading || isPreviewError || !preview))

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !isPending) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, isPending, onClose])

    if (!isOpen) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-plan-change-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8 backdrop-blur-sm"
            onClick={() => {
                if (!isPending) onClose()
            }}
        >
            <div
                className="flex w-full max-w-[296px] flex-col items-start gap-4 rounded-[20px] bg-bg-3 p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex w-full flex-col items-start gap-1">
                    <h2
                        id="pricing-plan-change-title"
                        className="text-[18px] font-semibold leading-[1.4] tracking-[-0.025em] text-text-primary"
                    >
                        {title}
                    </h2>
                    <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.025em] text-text-secondary">
                        {description}
                    </p>
                    {isPreviewError && !isFreeChange && onRetryPreview && (
                        <button
                            type="button"
                            onClick={onRetryPreview}
                            className="mt-2 font-caption-12m text-text-primary underline underline-offset-2"
                        >
                            다시 시도
                        </button>
                    )}
                    {actionError && <p className="mt-2 font-caption-12r text-red-error">{actionError}</p>}
                </div>

                <div className="flex w-full items-start gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="flex w-[120px] shrink-0 items-center justify-center rounded-[10px] border border-gray-40 bg-gray-30 px-4 py-2 text-[16px] font-semibold leading-[1.5] tracking-[-0.025em] text-text-secondary transition-colors hover:bg-gray-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isConfirmDisabled}
                        className="flex w-[120px] shrink-0 items-center justify-center rounded-[10px] bg-primary-60 px-4 py-2 text-[16px] font-semibold leading-[1.5] tracking-[-0.025em] text-text-inverse transition-colors hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? '처리 중' : isPreviewLoading && !isFreeChange ? '확인 중' : actionLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
