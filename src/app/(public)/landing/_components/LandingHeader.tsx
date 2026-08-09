'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import LogoIcon from '@/assets/icons/logo.svg'
import LandingAuthButton from './LandingAuthButton'

export default function LandingHeader() {
    const headerRef = useRef<HTMLElement>(null)
    const [isPastHero, setIsPastHero] = useState(false)

    useEffect(() => {
        const header = headerRef.current
        const hero = header?.closest('section')

        if (!header || !hero) return

        let animationFrameId: number | null = null

        const updateHeaderBackground = () => {
            const hasPassedHero = hero.getBoundingClientRect().bottom <= header.getBoundingClientRect().bottom
            setIsPastHero((current) => (current === hasPassedHero ? current : hasPassedHero))
            animationFrameId = null
        }

        const handleViewportChange = () => {
            if (animationFrameId !== null) return
            animationFrameId = window.requestAnimationFrame(updateHeaderBackground)
        }

        updateHeaderBackground()
        window.addEventListener('scroll', handleViewportChange, { passive: true })
        window.addEventListener('resize', handleViewportChange)

        return () => {
            window.removeEventListener('scroll', handleViewportChange)
            window.removeEventListener('resize', handleViewportChange)

            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId)
            }
        }
    }, [])

    return (
        <header
            ref={headerRef}
            className={`fixed inset-x-0 top-0 z-40 h-14 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300 tablet:h-16 desktop:h-[72px] ${
                isPastHero
                    ? 'border-white/8 bg-black/70 backdrop-blur-md'
                    : 'border-transparent bg-transparent'
            }`}
        >
            <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 tablet:px-5 desktop:px-16">
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
            </div>
        </header>
    )
}
