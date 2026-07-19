'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BackIcon from '@/assets/icons/back.svg'
import Chip from '@/components/Chip'
import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'

type PeriodPreset = 'all' | 'today' | 'last7Days' | 'last30Days' | 'thisMonth'

interface DateFieldProps {
    label: string
    max?: string
    min?: string
    onChange: (value: string) => void
    value: string
}

const periodPresets: Array<{ label: string; value: PeriodPreset }> = [
    { label: '전체', value: 'all' },
    { label: '오늘', value: 'today' },
    { label: '최근 7일', value: 'last7Days' },
    { label: '최근 30일', value: 'last30Days' },
    { label: '이번 달', value: 'thisMonth' },
]

function toDateInputValue(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function formatDate(value: string) {
    if (!value) return '연도-월-일'

    const [year, month, day] = value.split('-').map(Number)
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][new Date(year, month - 1, day).getDay()]

    return `${String(year).slice(-2)}년 ${month}월 ${day}일 (${weekday})`
}

function DateField({ label, max, min, onChange, value }: DateFieldProps) {
    return (
        <label className="relative flex h-12 w-full cursor-pointer items-center justify-between rounded-[20px] bg-bg-1 px-4 desktop:h-[51px]">
            <span className="pointer-events-none flex min-w-0 items-center gap-1 pr-10 font-body-16r text-text-secondary">
                <span className="shrink-0">{label}</span>
                <span aria-hidden>|</span>
                <span className={`truncate font-body-16m ${value ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {formatDate(value)}
                </span>
            </span>
            <input
                type="date"
                aria-label={label}
                className="absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent px-4 text-transparent outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:ml-auto [&::-webkit-calendar-picker-indicator]:size-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-datetime-edit]:opacity-0"
                max={max}
                min={min}
                onChange={(event) => onChange(event.target.value)}
                onClick={(event) => event.currentTarget.showPicker?.()}
                value={value}
            />
        </label>
    )
}

export default function ReportPeriodPage() {
    const router = useRouter()
    const [activePreset, setActivePreset] = useState<PeriodPreset | null>('all')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const selectPreset = (preset: PeriodPreset) => {
        setActivePreset(preset)

        if (preset === 'all') {
            setStartDate('')
            setEndDate('')
            return
        }

        const today = new Date()
        const start = new Date(today)

        if (preset === 'last7Days') {
            start.setDate(today.getDate() - 6)
        }

        if (preset === 'last30Days') {
            start.setDate(today.getDate() - 29)
        }

        if (preset === 'thisMonth') {
            start.setDate(1)
        }

        setStartDate(toDateInputValue(start))
        setEndDate(toDateInputValue(today))
    }

    const changeStartDate = (value: string) => {
        setActivePreset(null)
        setStartDate(value)
    }

    const changeEndDate = (value: string) => {
        setActivePreset(null)
        setEndDate(value)
    }

    const isPeriodValid =
        activePreset !== null || (startDate !== '' && endDate !== '' && startDate <= endDate)

    return (
        <div className="flex h-full w-full flex-col bg-bg-0 desktop:pt-3">
            <Header
                title="리포트 기간 설정"
                className="tablet:min-h-16 desktop:min-h-18"
                leading={
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex h-6 w-8 items-center justify-center"
                        aria-label="뒤로 가기"
                    >
                        <BackIcon />
                    </button>
                }
            />

            <PageContent
                as="main"
                className="flex min-h-0 flex-1 flex-col pb-24 pt-2 tablet:pb-5 tablet:pt-4 desktop:pt-2"
            >
                <h1 className="font-title-20sb text-text-primary">원하는 기간을 선택하여 영상을 분석해요</h1>

                <section className="mt-4">
                    <h2 className="font-body-14m text-text-secondary">빠른 기간 선택</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {periodPresets.map((preset) => (
                            <Chip
                                key={preset.value}
                                title={preset.label}
                                onClick={() => selectPreset(preset.value)}
                                isActive={activePreset === preset.value}
                                variant="period"
                            />
                        ))}
                    </div>
                </section>

                <section className="mt-4">
                    <h2 className="font-body-14r text-text-secondary">기간 직접 입력</h2>
                    <div className="mt-2 flex flex-col gap-2">
                        <DateField
                            label="시작일"
                            max={endDate || undefined}
                            onChange={changeStartDate}
                            value={startDate}
                        />
                        <DateField
                            label="종료일"
                            min={startDate || undefined}
                            onChange={changeEndDate}
                            value={endDate}
                        />
                    </div>
                </section>

                <button
                    type="button"
                    disabled={!isPeriodValid}
                    className="fixed bottom-8 left-4 right-4 flex h-12 cursor-pointer items-center justify-center rounded-[20px] bg-primary-60 px-2 font-body-16sb text-text-primary disabled:cursor-not-allowed disabled:bg-gray-30 disabled:text-text-secondary tablet:static tablet:mt-4 tablet:w-full desktop:h-[49px]"
                >
                    리포트 생성 시작
                </button>
            </PageContent>
        </div>
    )
}
