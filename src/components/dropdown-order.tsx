'use client'

import { useEffect, useRef, useState } from 'react'
import Dropdown from '@/assets/icons/dropdown.svg'

interface DropdownOrderProps {
    onChange?: (option: string) => void
}

export default function DropdownOrder({ onChange }: DropdownOrderProps) {
    const dropdownOptions = ['최신순', '인기순', '날짜순']

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('최신순')

    const dropdownOrderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isDropdownOpen) return

        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownOrderRef.current && !dropdownOrderRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    const handleDropdownClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
        setIsDropdownOpen(false)
        onChange?.(option)
    }

    return (
        <div ref={dropdownOrderRef} className="relative">
            <button
                type="button"
                className="flex items-center gap-1 py-2 pl-4 pr-3 bg-bg-1 rounded-[20px] cursor-pointer relative z-20"
                onClick={handleDropdownClick}
            >
                <span className="font-body-12m text-text-primary">{selectedOption}</span>

                <Dropdown className={`${isDropdownOpen ? 'scale-y-[-1]' : ''} text-text-secondary`} />
            </button>

            {isDropdownOpen && (
                <div className="flex flex-col w-42 absolute top-full right-0 mt-2 z-50">
                    {dropdownOptions.map((option) => (
                        <button
                            key={option}
                            type="button"
                            className="flex flex-col justify-center items-start px-4 py-3 gap-2 bg-bg-2 hover:bg-bg-1 font-body-14m desktop:!text-[14px] cursor-pointer first:rounded-t-[20px] last:rounded-b-[20px]"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
