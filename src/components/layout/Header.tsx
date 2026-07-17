'use client'

import MenuIcon from '@/assets/icons/menu.svg'
import { useLayoutStore } from '@/stores/layoutStore'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

interface HeaderProps extends Omit<ComponentPropsWithoutRef<'header'>, 'title'> {
    className?: string
    leading?: ReactNode
    leadingClassName?: string
    title: string
    trailing?: ReactNode
    showMenu?: boolean
}

/**
 * 공통 Header 컴포넌트
 *
 * - 화면 상단 공통 header로 사용
 * - 구조: [leading] [title] ——————— [trailing]
 * - spacing은 Figma header design system 기준을 따른다.
 *
 * @example 1
 * // 기본 (타이틀만)
 * <Header title="대시보드" />
 *
 * @example 2
 * // 뒤로가기 + 오른쪽 버튼
 * <Header
 *   title="상세 리포트"
 *   leading={<BackButton />}
 *   trailing={<ShareButton />}
 * />
 */

export default function Header({
    className = '',
    leading,
    leadingClassName = '',
    title,
    trailing,
    showMenu = false,
    ...props
}: HeaderProps) {
    const openSidebar = useLayoutStore((state) => state.openSidebar)

    const activeLeadingClassName = leadingClassName || (showMenu ? 'desktop:hidden' : '')

    return (
        <header
            className={`flex min-h-14 w-full items-center justify-between bg-bg-0 px-4 py-3 tablet:px-5 tablet:py-4 desktop:px-16 desktop:py-5 ${className}`}
            {...props}
        >
            <div className="flex items-center gap-2">
                {leading && <div className={`flex shrink-0 items-center ${leadingClassName}`}>{leading}</div>}
                {showMenu && (
                    <div className={`flex shrink-0 items-center ${activeLeadingClassName}`}>
                        {leading || (
                            <button
                                type="button"
                                onClick={openSidebar}
                                className="-ml-1 flex size-8 items-center justify-center text-icon-primary transition-colors hover:text-text-primary"
                                aria-label="메뉴 열기"
                            >
                                <MenuIcon />
                            </button>
                        )}
                    </div>
                )}
                <span className="font-title-18sb text-text-primary whitespace-nowrap">{title}</span>
            </div>
            {trailing && <div className="flex items-center gap-2 shrink-0">{trailing}</div>}
        </header>
    )
}
