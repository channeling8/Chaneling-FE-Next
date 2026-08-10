'use client'

import { FormEvent, useEffect, useId, useRef, useState } from 'react'
import type { SubscribeRequest } from '@/api/subscription'
import XIcon from '@/assets/icons/X.svg'
import type { BillingCycle, PlanName } from '../types'

type PaidPlanName = Exclude<PlanName, 'Free'>
type PaymentField = 'cardNo' | 'expMonth' | 'expYear' | 'idNo' | 'cardPw' | 'agreement' | 'refundAgreement'
type PaymentErrors = Partial<Record<PaymentField, string>>

interface PricingCardPaymentModalProps {
    amount: number | null
    amountError: boolean
    billingCycle: BillingCycle
    isOpen: boolean
    isAmountLoading: boolean
    isSubmitting: boolean
    nextAmount: number | null
    nextBillingDate: string | null
    onClose: () => void
    onRetryAmount: () => void
    onSubmit: (request: SubscribeRequest) => Promise<boolean>
    planName: PaidPlanName
    planId: SubscribeRequest['planId']
}

const onlyDigits = (value: FormDataEntryValue | null) => String(value ?? '').replace(/\D/g, '')

const isValidCardNumber = (cardNo: string) => {
    if (cardNo.length < 15 || cardNo.length > 19) return false

    let sum = 0
    let shouldDouble = false

    for (let index = cardNo.length - 1; index >= 0; index -= 1) {
        let digit = Number(cardNo[index])

        if (shouldDouble) {
            digit *= 2
            if (digit > 9) digit -= 9
        }

        sum += digit
        shouldDouble = !shouldDouble
    }

    return sum % 10 === 0
}

const isValidExpiry = (expMonth: string, expYear: string) => {
    if (!/^(0[1-9]|1[0-2])$/.test(expMonth) || !/^\d{2}$/.test(expYear)) return false

    const today = new Date()
    const currentYear = today.getFullYear() % 100
    const year = Number(expYear)
    const month = Number(expMonth)

    return year > currentYear || (year === currentYear && month >= today.getMonth() + 1)
}

const fieldClassName =
    'h-10 w-full rounded-[10px] border border-border-normal bg-bg-2 px-3 font-body-14m text-text-primary outline-none placeholder:text-text-tertiary focus:border-border-active disabled:cursor-not-allowed disabled:opacity-60'

const formatCurrency = (amount: number) => `${amount.toLocaleString('ko-KR')}원`

const formatDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number)
    if (!year || !month || !day) return date
    return `${year}년 ${month}월 ${day}일`
}

export default function PricingCardPaymentModal({
    amount,
    amountError,
    billingCycle,
    isOpen,
    isAmountLoading,
    isSubmitting,
    nextAmount,
    nextBillingDate,
    onClose,
    onRetryAmount,
    onSubmit,
    planName,
    planId,
}: PricingCardPaymentModalProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const titleId = useId()
    const descriptionId = useId()
    const [errors, setErrors] = useState<PaymentErrors>({})

    useEffect(() => {
        if (!isOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !isSubmitting) onClose()
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, isSubmitting, onClose])

    if (!isOpen) return null

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isSubmitting) return

        const form = event.currentTarget
        const formData = new FormData(form)
        const cardNo = onlyDigits(formData.get('cardNo'))
        const expMonth = onlyDigits(formData.get('expMonth'))
        const expYear = onlyDigits(formData.get('expYear'))
        const idNo = onlyDigits(formData.get('idNo'))
        const cardPw = onlyDigits(formData.get('cardPw'))
        const nextErrors: PaymentErrors = {}

        if (!isValidCardNumber(cardNo)) nextErrors.cardNo = '카드번호를 확인해주세요.'
        if (!/^(0[1-9]|1[0-2])$/.test(expMonth)) nextErrors.expMonth = '월을 확인해주세요.'
        if (!/^\d{2}$/.test(expYear)) nextErrors.expYear = '연도를 확인해주세요.'
        if (!nextErrors.expMonth && !nextErrors.expYear && !isValidExpiry(expMonth, expYear)) {
            nextErrors.expYear = '유효기간이 지난 카드입니다.'
        }
        if (idNo.length !== 6 && idNo.length !== 10) nextErrors.idNo = '6자리 또는 10자리로 입력해주세요.'
        if (!/^\d{2}$/.test(cardPw)) nextErrors.cardPw = '앞 2자리를 입력해주세요.'
        if (formData.get('agreement') !== 'on') nextErrors.agreement = '정기 결제에 동의해주세요.'
        if (formData.get('refundAgreement') !== 'on') {
            nextErrors.refundAgreement = '환불 제한 사항을 확인해주세요.'
        }

        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        const didSucceed = await onSubmit({
            planId,
            billingCycle: billingCycle === 'monthly' ? 'MONTHLY' : 'YEARLY',
            cardNo,
            expYear,
            expMonth,
            idNo,
            cardPw,
        })

        if (didSucceed) form.reset()
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm tablet:p-8"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isSubmitting) onClose()
            }}
        >
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                autoComplete="off"
                className="my-auto flex w-full max-w-[420px] flex-col gap-5 rounded-[20px] bg-bg-3 p-6 shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-col gap-1">
                        <h2 id={titleId} className="font-title-18sb text-text-primary">
                            {planName} 플랜 결제
                        </h2>
                        <p id={descriptionId} className="font-body-14m text-text-secondary">
                            결제 정보는 구독 처리에만 사용되며 Channeling에 카드 원문으로 저장되지 않습니다.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        aria-label="결제 창 닫기"
                        className="h-6 w-6 shrink-0 text-text-secondary disabled:opacity-50"
                    >
                        <XIcon className="h-full w-full" />
                    </button>
                </div>

                <div className="flex flex-col gap-2 rounded-[12px] bg-bg-2 p-3">
                    <dl className="flex flex-col gap-2 font-body-14m">
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-text-secondary">선택 요금제</dt>
                            <dd className="text-text-primary">
                                {planName} · {billingCycle === 'monthly' ? '월간 결제' : '연간 결제'}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <dt className="text-text-secondary">결제 금액</dt>
                            <dd className="font-body-16sb text-text-primary">
                                {isAmountLoading ? '계산 중' : amount === null ? '-' : formatCurrency(amount)}
                            </dd>
                        </div>
                        {nextAmount !== null && nextBillingDate && (
                            <div className="flex items-start justify-between gap-4 font-caption-12r">
                                <dt className="text-text-tertiary">다음 정기 결제</dt>
                                <dd className="text-right text-text-secondary">
                                    {formatCurrency(nextAmount)} · {formatDate(nextBillingDate)}
                                </dd>
                            </div>
                        )}
                    </dl>
                    <p className="text-right font-caption-12r text-text-tertiary">부가세 포함</p>
                    {amountError && (
                        <div className="flex items-center justify-between gap-3 rounded-lg bg-bg-1 px-3 py-2">
                            <p className="font-caption-12r text-red-error">결제 금액을 불러오지 못했습니다.</p>
                            <button
                                type="button"
                                onClick={onRetryAmount}
                                className="shrink-0 font-caption-12m text-text-primary underline underline-offset-2"
                            >
                                다시 시도
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1.5 font-body-14m text-text-secondary">
                        카드번호
                        <input
                            autoFocus
                            name="cardNo"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            maxLength={23}
                            placeholder="숫자만 입력"
                            aria-invalid={Boolean(errors.cardNo)}
                            disabled={isSubmitting}
                            className={fieldClassName}
                        />
                        {errors.cardNo && <span className="font-caption-12r text-red-error">{errors.cardNo}</span>}
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                        <label className="flex flex-col gap-1.5 font-body-14m text-text-secondary">
                            유효기간 월
                            <input
                                name="expMonth"
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-exp-month"
                                maxLength={2}
                                placeholder="MM"
                                aria-invalid={Boolean(errors.expMonth)}
                                disabled={isSubmitting}
                                className={fieldClassName}
                            />
                            {errors.expMonth && (
                                <span className="font-caption-12r text-red-error">{errors.expMonth}</span>
                            )}
                        </label>
                        <label className="flex flex-col gap-1.5 font-body-14m text-text-secondary">
                            유효기간 연도
                            <input
                                name="expYear"
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-exp-year"
                                maxLength={2}
                                placeholder="YY"
                                aria-invalid={Boolean(errors.expYear)}
                                disabled={isSubmitting}
                                className={fieldClassName}
                            />
                            {errors.expYear && (
                                <span className="font-caption-12r text-red-error">{errors.expYear}</span>
                            )}
                        </label>
                    </div>

                    <label className="flex flex-col gap-1.5 font-body-14m text-text-secondary">
                        생년월일 또는 사업자번호
                        <input
                            name="idNo"
                            type="password"
                            inputMode="numeric"
                            autoComplete="off"
                            maxLength={10}
                            placeholder="개인 6자리 / 법인 10자리"
                            aria-invalid={Boolean(errors.idNo)}
                            disabled={isSubmitting}
                            className={fieldClassName}
                        />
                        {errors.idNo && <span className="font-caption-12r text-red-error">{errors.idNo}</span>}
                    </label>

                    <label className="flex flex-col gap-1.5 font-body-14m text-text-secondary">
                        카드 비밀번호 앞 2자리
                        <input
                            name="cardPw"
                            type="password"
                            inputMode="numeric"
                            autoComplete="off"
                            maxLength={2}
                            placeholder="••"
                            aria-invalid={Boolean(errors.cardPw)}
                            disabled={isSubmitting}
                            className={fieldClassName}
                        />
                        {errors.cardPw && <span className="font-caption-12r text-red-error">{errors.cardPw}</span>}
                    </label>
                </div>

                <label className="flex items-start gap-2 font-caption-12r text-text-secondary">
                    <input
                        name="agreement"
                        type="checkbox"
                        disabled={isSubmitting}
                        className="mt-0.5 h-4 w-4 accent-primary-60"
                    />
                    <span>
                        선택한 주기에 따른 정기 결제와 카드 정보 제공에 동의합니다.
                        {errors.agreement && <span className="mt-1 block text-red-error">{errors.agreement}</span>}
                    </span>
                </label>

                <label className="flex items-start gap-2 font-caption-12r text-text-secondary">
                    <input
                        name="refundAgreement"
                        type="checkbox"
                        disabled={isSubmitting}
                        className="mt-0.5 h-4 w-4 accent-primary-60"
                    />
                    <span>
                        결제 후 유료 제공 사용량을 사용하시는 경우 환불이 불가능합니다.
                        {errors.refundAgreement && (
                            <span className="mt-1 block text-red-error">{errors.refundAgreement}</span>
                        )}
                    </span>
                </label>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="h-10 flex-1 rounded-[10px] border border-gray-40 bg-gray-30 font-body-16sb text-text-secondary disabled:opacity-50"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || isAmountLoading || amount === null || amountError}
                        className="h-10 flex-1 rounded-[10px] bg-primary-60 font-body-16sb text-text-primary transition-colors hover:bg-primary-50 disabled:cursor-wait disabled:opacity-60"
                    >
                        {isSubmitting ? '결제 중' : isAmountLoading ? '금액 확인 중' : '결제하기'}
                    </button>
                </div>
            </form>
        </div>
    )
}
