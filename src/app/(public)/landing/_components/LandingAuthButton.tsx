'use client'

import GoogleIcon from '@/assets/icons/google.svg'
import { redirectToGoogleLogin } from '@/api/auth'

interface LandingAuthButtonProps {
    variant?: 'google' | 'text'
}

export default function LandingAuthButton({ variant = 'google' }: LandingAuthButtonProps) {
    if (variant === 'text') {
        return (
            <button
                type="button"
                onClick={redirectToGoogleLogin}
                className="whitespace-nowrap rounded-[10px] px-4 py-2 font-body-14sb text-text-primary transition-colors hover:bg-white/8 desktop:text-[14px]"
            >
                시작하기
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={redirectToGoogleLogin}
            className="flex h-10 items-center gap-2.5 rounded-lg bg-gray-95 px-3 text-[14px] font-medium leading-none text-[#1f1f1f] transition-colors hover:bg-white"
        >
            <GoogleIcon aria-hidden className="size-5 shrink-0" />
            구글 계정으로 로그인
        </button>
    )
}
