import Link from 'next/link'
import LogoIcon from '@/assets/icons/logo.svg'
import LandingAuthButton from './LandingAuthButton'

export default function LandingHeader() {
    return (
        <header className="relative z-10 mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 tablet:h-16 tablet:px-5 desktop:h-[72px] desktop:px-16">
            <Link href="/" aria-label="채널링 홈" className="flex w-[88px] items-center">
                <LogoIcon aria-hidden className="size-6 brightness-0 invert" />
                <span className="text-[14px] font-semibold leading-none tracking-[-0.04em] text-white">
                    Chaneling
                </span>
            </Link>
            <nav aria-label="주요 메뉴" className="flex items-center">
                <Link
                    href="/pricing"
                    className="whitespace-nowrap rounded-[10px] px-4 py-2 font-body-14sb text-text-primary transition-colors hover:bg-white/8 desktop:text-[14px]"
                >
                    요금제
                </Link>
                <LandingAuthButton variant="text" />
            </nav>
        </header>
    )
}
