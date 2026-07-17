'use client'

import { useState, useRef, useId, type InputHTMLAttributes } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import InputDeleteIcon from '@/assets/icons/input-delete.svg'

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string
  onChange?: (value: string) => void
  isError?: boolean
  errorMessage?: string
  onClear?: () => void
  sizeVariant?: 'mobile' | 'tablet' | 'desktop'
}

export default function SearchInput({
  value: controlledValue,
  onChange,
  isError = false,
  errorMessage = '유효한 유튜브 URL을 입력해주세요',
  onClear,
  placeholder = '영상 링크를 입력해주세요',
  className = '',
  sizeVariant = 'mobile',
  id: externalId,
  ...rest
}: SearchInputProps) {
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

  const widthClass: Record<Required<SearchInputProps>['sizeVariant'], string> = {
    mobile: 'w-[328px]',
    tablet: 'w-[328px]', // TODO: 디자인 확정 시 수치 교체
    desktop: 'w-[328px]', // TODO: 디자인 확정 시 수치 교체
  }

  return (
    <div className={`flex flex-col gap-[4px] ${widthClass[sizeVariant]} ${className}`}>
      <div
        className={[
          'relative flex items-center gap-[8px]',
          'w-full h-[48px] pl-[16px] pr-[44px] py-[12px] rounded-[20px]',
          'bg-bg-1',
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
        <SearchIcon className="shrink-0 size-[24px] text-icon-primary" />

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
            className="absolute right-[16px] top-1/2 -translate-y-1/2 shrink-0 size-[20px] flex items-center justify-center text-icon-primary hover:text-text-primary transition-colors focus:outline-none"
          >
            <InputDeleteIcon className="w-full h-full" />
          </button>
        )}
      </div>

      {isError && errorMessage && (
        <p className="px-[16px] text-[14px] leading-[1.5] tracking-[-0.35px] text-border-error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
