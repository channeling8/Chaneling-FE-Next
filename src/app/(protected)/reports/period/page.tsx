'use client'

import { createReport } from '@/api/report'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import BackIcon from '@/assets/icons/back.svg'
import Chip from '@/components/Chip'
import Header from '@/components/layout/Header'
import PageContent from '@/components/layout/PageContent'
import { Modal } from '@/components/Modal'
import { useVideoStore } from '@/stores/videoStore'
import ReportDetailSkeleton from '../_components/ReportDetailSkeleton'

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

function normalizeDateValue(value: string | null) {
    const dateValue = value?.match(/^\d{4}-\d{2}-\d{2}/)?.[0]
    if (!dateValue) return null

    const [year, month, day] = dateValue.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const isValidDate =
        date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

    return isValidDate ? dateValue : null
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

function ReportPeriodContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [activePreset, setActivePreset] = useState<PeriodPreset | null>('all')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [creationError, setCreationError] = useState('')
    const selectedVideoId = useVideoStore((state) => state.selectedVideoId)
    const setSelectedVideoId = useVideoStore((state) => state.setSelectedVideoId)
    const queryVideoId = Number(searchParams.get('videoId'))
    const videoId = Number.isInteger(queryVideoId) && queryVideoId > 0 ? queryVideoId : (selectedVideoId ?? 0)
    const isVideoIdValid = Number.isInteger(videoId) && videoId > 0
    const today = toDateInputValue(new Date())
    const videoUploadDate = normalizeDateValue(searchParams.get('uploadDate'))
    const isVideoUploadDateValid = videoUploadDate !== null && videoUploadDate <= today
    const createReportMutation = useMutation({
        mutationFn: createReport,
        onSuccess: ({ reportId, videoId: createdVideoId }) => {
            setSelectedVideoId(createdVideoId)
            router.replace(`/reports/${reportId}?videoId=${createdVideoId}`)
        },
        onError: () => {
            setCreationError('잠시 후 다시 시도해 주세요.')
        },
    })

    const selectPreset = (preset: PeriodPreset) => {
        setActivePreset(preset)

        if (preset === 'all') {
            setStartDate('')
            setEndDate('')
            return
        }

        const todayDate = new Date()
        const start = new Date(todayDate)

        if (preset === 'last7Days') {
            start.setDate(todayDate.getDate() - 6)
        }

        if (preset === 'last30Days') {
            start.setDate(todayDate.getDate() - 29)
        }

        if (preset === 'thisMonth') {
            start.setDate(1)
        }

        const presetStartDate = toDateInputValue(start)
        setStartDate(
            isVideoUploadDateValid && presetStartDate < videoUploadDate ? videoUploadDate : presetStartDate
        )
        setEndDate(today)
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
        activePreset !== null ||
        (startDate !== '' &&
            endDate !== '' &&
            startDate <= endDate &&
            isVideoUploadDateValid &&
            startDate >= videoUploadDate &&
            endDate <= today)

    const handleCreateReport = () => {
        if (!isVideoIdValid) {
            setCreationError('분석할 영상을 다시 선택해 주세요.')
            return
        }

        if (!isVideoUploadDateValid) {
            setCreationError('영상 업로드 날짜를 다시 확인해 주세요.')
            return
        }

        const requestStartDate = activePreset === 'all' ? videoUploadDate : startDate
        const requestEndDate = activePreset === 'all' ? today : endDate

        setCreationError('')
        createReportMutation.mutate({
            videoId,
            startDate: requestStartDate,
            endDate: requestEndDate,
        })
    }

    if (createReportMutation.isPending || createReportMutation.isSuccess) {
        return (
            <ReportDetailSkeleton
                currentStep={1}
                title="리포트 생성 중"
                statusMessage="유튜브 데이터를 수집하고 있습니다."
            />
        )
    }

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
                            max={endDate || today}
                            min={videoUploadDate ?? undefined}
                            onChange={changeStartDate}
                            value={startDate}
                        />
                        <DateField
                            label="종료일"
                            max={today}
                            min={startDate || videoUploadDate || undefined}
                            onChange={changeEndDate}
                            value={endDate}
                        />
                    </div>
                </section>

                <button
                    type="button"
                    disabled={!isPeriodValid}
                    onClick={handleCreateReport}
                    className="fixed bottom-8 left-4 right-4 flex h-12 cursor-pointer items-center justify-center rounded-[20px] bg-primary-60 px-2 font-body-16sb text-text-primary disabled:cursor-not-allowed disabled:bg-gray-30 disabled:text-text-secondary tablet:static tablet:mt-4 tablet:w-full desktop:h-[49px]"
                >
                    리포트 생성 시작
                </button>
            </PageContent>

            <Modal isOpen={Boolean(creationError)} onClose={() => setCreationError('')}>
                <Modal.Header title="리포트를 생성하지 못했어요" caption={creationError} />
                <Modal.Footer>
                    <Modal.Button type="button" variant="error" onClick={() => setCreationError('')}>
                        확인
                    </Modal.Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default function ReportPeriodPage() {
    return (
        <Suspense
            fallback={<ReportDetailSkeleton title="리포트 기간 설정" statusMessage="기간 설정을 불러오고 있습니다." />}
        >
            <ReportPeriodContent />
        </Suspense>
    )
}
