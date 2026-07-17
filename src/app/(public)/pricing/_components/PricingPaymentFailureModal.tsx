'use client'

import { useEffect } from 'react'

interface PricingPaymentFailureModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function PricingPaymentFailureModal({ isOpen, onClose }: PricingPaymentFailureModalProps) {
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
            aria-labelledby="pricing-payment-failure-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="flex w-full max-w-[296px] flex-col items-start gap-4 rounded-[20px] bg-bg-3 p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex w-full flex-col items-start gap-1">
                    <h2
                        id="pricing-payment-failure-title"
                        className="text-[18px] font-semibold leading-[1.4] tracking-[-0.025em] text-text-primary"
                    >
                        일시적인 결제 오류가 발생했습니다.
                    </h2>
                    <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.025em] text-text-secondary">
                        시스템 오류로 인해 결제가 완료되지 않았습니다. 다시 시도해 주시길 바라며, 문제가 지속될 경우 고객센터로
                        문의해 주시기 바랍니다.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="flex w-full items-center justify-center rounded-[10px] bg-red-error p-2 text-[16px] font-semibold leading-[1.5] tracking-[-0.025em] text-text-primary transition-colors hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active"
                >
                    확인
                </button>
            </div>
        </div>
    )
}
