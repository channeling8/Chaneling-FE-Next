'use client'

import { useRouter } from 'next/navigation'
import BackIcon from '@/assets/icons/back.svg'
import Header from '@/components/layout/Header'

export default function ReportDetailHeader() {
    const router = useRouter()

    return (
        <Header
            title="상세 분석 리포트"
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
    )
}
