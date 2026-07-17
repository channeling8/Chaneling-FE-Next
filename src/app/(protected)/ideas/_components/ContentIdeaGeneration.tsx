import { useEffect, useRef, useState } from 'react'

import Dropdown from '@/assets/icons/dropdown.svg'
import { DropdownVideoType } from './DropdownVideotype'
import TextField from '@/components/TextField'
import GenerationButton from './GenerationButton'

export default function ContentIdeaGeneration() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleDropdownClick = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>, option: string) => {
        e.stopPropagation()
        setSelectedOption(option)
        handleDropdownClick()
    }

    const dropdownRef = useRef<HTMLDivElement>(null)

    const [selectedOption, setSelectedOption] = useState('')

    useEffect(() => {
        if (!isDropdownOpen) return

        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col py-1 items-start gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-text-primary font-title-18sb">콘텐츠 아이디어 생성</h1>
                    <div className="text-text-secondary font-body-14r">
                        입력 없이 생성하기만 눌러도 채널 맞춤형으로 제안해드려요
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div
                        className={`flex flex-col p-4 items-start gap-1 rounded-[20px] bg-bg-1 relative border self-stretch ${
                            isDropdownOpen ? ' border-text-secondary' : 'border-transparent'
                        }`}
                    >
                        <div className="font-caption-12m text-text-secondary">영상형식</div>
                        <div
                            className="flex items-start justify-between self-stretch select-none cursor-pointer relative z-10"
                            onClick={handleDropdownClick}
                            ref={dropdownRef}
                        >
                            {selectedOption == '' && (
                                <div className="font-body-14r text-text-secondary">영상 형식을 선택해 주세요.</div>
                            )}
                            {selectedOption != '' && (
                                <div className="font-body-16m text-text-primary">{selectedOption}</div>
                            )}
                            {!isDropdownOpen && <Dropdown className="cursor-pointer text-text-secondary" />}
                            {isDropdownOpen && (
                                <>
                                    <Dropdown className="cursor-pointer scale-y-[-1] text-text-secondary" />

                                    <DropdownVideoType handleOptionValue={handleOptionClick} />
                                </>
                            )}
                        </div>
                    </div>
                    <TextField
                        label="핵심 키워드"
                        className="w-full"
                        placeholder="생각나는 키워드를 입력해주세요"
                        helperText="(예: 바이브코딩, 도쿄 여행, 가을 메이크업)"
                    />
                    <TextField
                        label="추가 입력 사항"
                        maxLength={300}
                        heightVariant="large"
                        className="w-full"
                        placeholder="어떤 점을 강조하고 싶으신가요?"
                        helperText="(예: 쉬운 설명, 유머, 영상미)"
                    />
                </div>
                <GenerationButton />
            </div>
        </div>
    )
}
