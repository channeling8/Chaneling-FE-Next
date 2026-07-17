import Link from 'next/link'
import { Fragment } from 'react'

export const Footer = () => {
    const links = [
        { href: '/docs/terms', label: '회사 소개' },
        { href: '/docs/terms', label: '서비스 이용약관' },
        { href: '/docs/privacy', label: '개인정보처리방침' },
    ]

    return (
        <footer className="flex w-full flex-col items-center gap-6 bg-bg-0 px-4 py-8 text-text-tertiary">
            <nav aria-label="푸터 메뉴" className="flex items-center gap-2 whitespace-nowrap font-caption-12m">
                {links.map((link) => (
                    <Fragment key={link.label}>
                        <Link href={link.href}>{link.label}</Link>
                        <span aria-hidden className="h-[18px] w-px bg-border-subtitle" />
                    </Fragment>
                ))}
                <a href="https://open.kakao.com/o/sTPlNEvh" target="_blank" rel="noopener noreferrer">
                    문의하기
                </a>
            </nav>
            <p className="font-caption-12r">© 2025 Chaneling. All rights reserved.</p>
        </footer>
    )
}
