'use client'

import { useRouter } from 'next/navigation'
import BackIcon from '@/assets/icons/back.svg'
import Header from '@/components/layout/Header'

interface PricingHeaderProps {
    isLoggedIn: boolean
}

export default function PricingHeader({ isLoggedIn }: PricingHeaderProps) {
    const router = useRouter()

    return (
        <Header
            title="구독 관리"
            data-auth-state={isLoggedIn ? 'logged-in' : 'guest'}
            leading={
                <button
                    type="button"
                    onClick={() => router.back()}
                    aria-label="뒤로 가기"
                    className="flex size-6 shrink-0 items-center justify-center text-icon-primary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-active"
                >
                    <BackIcon />
                </button>
            }
        />
    )
}
