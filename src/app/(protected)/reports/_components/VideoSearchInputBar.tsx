'use client'

import { useState, useRef, useId, type InputHTMLAttributes } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import InputDeleteIcon from '@/assets/icons/input-delete.svg'
import SendIcon from '@/assets/icons/send.svg'

export interface VideoSearchInputBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: string
    onChange?: (value: string) => void
    isError?: boolean
    errorMessage?: string
    onClear?: () => void
    onClick?: () => void
}

export default function VideoSearchInputBar({
    value: controlledValue,
    onChange,
    isError = false,
    errorMessage = '유효한 유튜브 URL을 입력해주세요',
    onClear,
    onClick,
    placeholder = '영상 링크를 입력해주세요',
    id: externalId,
    ...rest
}: VideoSearchInputBarProps) {
    // 제어/비제어 모드 호환
    const [internalValue, setInternalValue] = useState('')
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const autoId = useId()
    const inputId = externalId ?? autoId

    const hasValue = value.length > 0
    const showClearButton = hasValue
    const isActive = isFocused

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const next = e.target.value
        if (!isControlled) setInternalValue(next)
        onChange?.(next)
    }

    function handleClear() {
        if (onClear) {
            onClear()
        } else {
            if (!isControlled) setInternalValue('')
            onChange?.('')
        }
        inputRef.current?.focus()
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-2">
                <div
                    className={[
                        'flex px-4 py-3 gap-2 items-center justify-start w-full bg-bg-1 rounded-[20px] relative',
                        // inset shadow로 크기 변화 없는 테두리 처리
                        isActive
                            ? 'shadow-[inset_0_0_0_1px_var(--color-border-active)]'
                            : isError
                              ? 'shadow-[inset_0_0_0_1px_var(--color-border-error)]'
                              : '',
                        'transition-colors duration-150 cursor-text',
                    ].join(' ')}
                    onClick={() => inputRef.current?.focus()}
                >
                    <SearchIcon className="shrink-0" />

                    <input
                        ref={inputRef}
                        id={inputId}
                        type="text"
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        className={[
                            'flex-1 min-w-0 bg-transparent outline-none',
                            'font-body-16r tracking-[-0.025em]',
                            'placeholder:text-text-secondary',
                            'text-text-primary',
                            'caret-gray-90',
                        ].join(' ')}
                        {...rest}
                    />
                    {showClearButton && (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="입력 초기화"
                            className="absolute right-4 top-1/2 -translate-y-1/2 shrink-0 size-5 cursor-pointer flex items-center justify-center text-icon-primary hover:text-text-primary transition-colors focus:outline-none"
                        >
                            <InputDeleteIcon className="w-full h-full" />
                        </button>
                    )}
                </div>
                <button
                    type="button"
                    onClick={onClick}
                    className={`p-3 rounded-[20px] ${hasValue ? `bg-primary-60 text-icon-primary cursor-pointer` : ` bg-bg-3 text-icon-secondary`}`}
                >
                    <SendIcon />
                </button>
            </div>

            {isError && (
                <p className="px-4 font-body-16r text-border-error" role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
    )
}
