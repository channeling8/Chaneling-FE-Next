'use client'

import { useState, useRef, useId, type InputHTMLAttributes } from 'react'
import SearchIcon from '@/assets/icons/search.svg'

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: string
    onChange?: (value: string) => void
    isError?: boolean
    onClear?: () => void
    sizeVariant?: 'mobile' | 'tablet' | 'desktop'
}

export default function SearchBar({
    value: controlledValue,
    onChange,
    isError = false,
    onClear,
    placeholder = '해당 영상 제목을 입력해주세요',
    sizeVariant = 'mobile',
    id: externalId,
    ...rest
}: SearchBarProps) {
    // 제어/비제어 모드 호환
    const [internalValue, setInternalValue] = useState('')
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const autoId = useId()
    const inputId = externalId ?? autoId

    const isActive = isFocused

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const next = e.target.value
        if (!isControlled) setInternalValue(next)
        onChange?.(next)
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
                </div>
            </div>
        </div>
    )
}
