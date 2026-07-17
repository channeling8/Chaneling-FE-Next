'use client'

import { useEffect } from 'react'

type PricingPlanChangeModalVariant = 'downgrade' | 'upgrade'

interface PricingPlanChangeModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm?: () => void
    variant: PricingPlanChangeModalVariant
}

const modalContent: Record<PricingPlanChangeModalVariant, { actionLabel: string; description: string; title: string }> = {
    downgrade: {
        actionLabel: '변경',
        description:
            '다음 정기 결제일인 [M월 D일]부터 해당 요금제가 적용됩니다. 남은 기간 동안은 현재 요금제의 모든 혜택을 그대로 이용하실 수 있습니다.',
        title: '플랜 변경 전 확인해 주세요.',
    },
    upgrade: {
        actionLabel: '결제',
        description:
            '남은 기간에 대한 차액 [0,000]원이 즉시 결제되며, 완료 즉시 확장된 기능을 모두 이용하실 수 있습니다. 다음 정기 결제일([M월 D일])부터는 매월 [00,000]원이 청구됩니다.',
        title: 'PRO 플랜으로 업그레이드할까요?',
    },
}

export default function PricingPlanChangeModal({ isOpen, onClose, variant }: PricingPlanChangeModalProps) {
    const { actionLabel, description, title } = modalContent[variant]

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-plan-change-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8 backdrop-blur-sm"
            onClick={onClose}
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
                </div>

                <div className="flex w-full items-start gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex w-[120px] shrink-0 items-center justify-center rounded-[10px] border border-gray-40 bg-gray-30 px-4 py-2 text-[16px] font-semibold leading-[1.5] tracking-[-0.025em] text-text-secondary transition-colors hover:bg-gray-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex w-[120px] shrink-0 items-center justify-center rounded-[10px] bg-primary-60 px-4 py-2 text-[16px] font-semibold leading-[1.5] tracking-[-0.025em] text-text-inverse transition-colors hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active"
                    >
                        {actionLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
