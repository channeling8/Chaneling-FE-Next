'use client'

import { useState, useRef, useId } from 'react'

export interface TextFieldProps extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'value' | 'maxLength'
> {
    value?: string
    onChange?: (value: string) => void
    label?: string
    maxLength?: number
    showCounter?: boolean // 카운터 표시 여부 (기본: true)
    placeholder?: string
    helperText?: string
    isActive?: boolean
    isError?: boolean
    errorMessage?: string
    className?: string
    inputClassName?: string
    labelClassName?: string
    textareaClassName?: string
    heightVariant?: 'small' | 'large' // 높이 크기 분기 (기본: small: 88px, large: 151px)
}

export default function TextField({
    value: controlledValue,
    onChange,
    label,
    maxLength = 25,
    showCounter = true,
    placeholder,
    helperText,
    isActive = false,
    isError = false,
    errorMessage,
    className = '',
    inputClassName = '',
    labelClassName = '',
    textareaClassName = '',
    heightVariant = 'small',
    id: externalId,
    onFocus: externalOnFocus,
    onBlur: externalOnBlur,
    ...rest
}: TextFieldProps) {
    // 제어/비제어 호환
    const [internalValue, setInternalValue] = useState('')
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const autoId = useId()
    const inputId = externalId ?? autoId

    const textLength = value.length
    const showPlaceholder = textLength === 0

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const next = e.target.value
        if (maxLength && next.length > maxLength) return // max length 차단
        if (!isControlled) setInternalValue(next)
        onChange?.(next)
    }

    return (
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            {/* 메인 Input 래퍼 */}
            <div
                className={[
                    'relative flex flex-col w-full px-4 py-3 bg-bg-1 rounded-[20px]',
                    heightVariant === 'large' ? 'h-37.75' : 'h-22 desktop:h-25', // variant에 따른 높이 분기
                    isActive
                        ? 'shadow-[inset_0_0_0_1px_var(--color-border-active)]'
                        : isError
                          ? 'shadow-[inset_0_0_0_1px_var(--color-border-error)]'
                          : '',
                    'transition-colors duration-150 cursor-text focus-within:shadow-[inset_0_0_0_1px_var(--color-border-active)]',
                    inputClassName,
                ].join(' ')}
                onClick={() => inputRef.current?.focus()}
            >
                {/* 라벨, 카운터 */}
                {(label || showCounter) && (
                    <div className="flex items-start justify-between shrink-0 mb-1">
                        {label ? (
                            <label
                                htmlFor={inputId}
                                className={`font-caption-12m text-text-secondary tracking-[-0.3px] ${labelClassName}`}
                            >
                                {label}
                            </label>
                        ) : (
                            <div />
                        )}
                        {showCounter && (
                            <div className="flex items-center gap-0.5 font-caption-12r text-text-secondary tracking-[-0.3px]">
                                <span
                                    className={
                                        textLength === 0 ? 'text-text-secondary font-caption-12m' : 'text-text-primary'
                                    }
                                >
                                    {textLength}
                                </span>
                                <span>/</span>
                                <span>{maxLength}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* 텍스트 컨텐츠 */}
                <div className="relative flex-1 flex flex-col justify-start">
                    {showPlaceholder && (
                        <div className="absolute inset-0 flex flex-col justify-start pointer-events-none text-text-secondary">
                            <p
                                className={`font-body-14r tracking-[-0.35px] ${textareaClassName}`}
                                style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
                            >
                                {placeholder}
                            </p>
                            {helperText && (
                                <p
                                    className={`font-body-14r tracking-[-0.35px] ${textareaClassName}`}
                                    style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
                                >
                                    {helperText}
                                </p>
                            )}
                        </div>
                    )}

                    {/* 실제 입력 태그 */}
                    <textarea
                        ref={inputRef}
                        id={inputId}
                        value={value}
                        onChange={handleChange}
                        onFocus={externalOnFocus}
                        onBlur={externalOnBlur}
                        aria-placeholder={placeholder}
                        className={[
                            'absolute inset-0 w-full h-full bg-transparent outline-none m-0 p-0 resize-none',
                            heightVariant === 'large' ? 'overflow-y-auto custom-scrollbar pr-1' : 'overflow-hidden',
                            'font-body-14r tracking-[-0.35px] text-text-primary caret-gray-90',
                            showPlaceholder ? 'text-transparent' : '',
                            textareaClassName,
                        ].join(' ')}
                        {...rest}
                    />
                </div>
            </div>
            {/* 에러 메시지 */}
            {isError && errorMessage && (
                <p className="px-4 font-body-14r tracking-[-0.35px] text-border-error" role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
    )
}
