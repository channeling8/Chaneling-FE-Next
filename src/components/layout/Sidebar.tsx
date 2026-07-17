'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode, useState } from 'react'
import DashboardIcon from '@/assets/icons/dashboard.svg'
import FeedbackIcon from '@/assets/icons/feedback.svg'
import IdeaIcon from '@/assets/icons/idea.svg'
import LogoIcon from '@/assets/icons/logo.svg'
import ReportIcon from '@/assets/icons/report.svg'
import CloseIcon from '@/assets/icons/sidebar-close.svg'
import ProfileImage from '@/components/ProfileImage'

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

interface SidebarItemProps {
    href: string
    icon: ReactNode
    isActive?: boolean
    isDesktopCollapsed: boolean
    label: string
    onNavigate?: () => void
}

function SidebarItem({
    href,
    icon,
    isActive = false,
    isDesktopCollapsed,
    label,
    onNavigate,
}: SidebarItemProps) {
    return (
        <Link
            href={href}
            onClick={onNavigate}
            aria-label={label}
            className={`group relative flex h-10 w-full items-center rounded-lg p-2 transition-all duration-300 desktop:shrink-0 ${isDesktopCollapsed ? 'desktop:gap-0' : 'gap-2'} ${isActive ? 'bg-bg-2' : 'bg-transparent hover:bg-bg-2'}`}
        >
            <span className="flex size-6 shrink-0 items-center justify-center text-icon-primary">
                {icon}
            </span>
            <span
                aria-hidden={isDesktopCollapsed}
                className={`min-w-0 overflow-hidden whitespace-nowrap font-body-14m text-text-primary transition-[max-width,opacity] duration-300 desktop:text-[16px] ${isDesktopCollapsed ? 'desktop:max-w-0 desktop:opacity-0' : 'max-w-28 opacity-100'}`}
            >
                {label}
            </span>
            {isDesktopCollapsed && (
                <span
                    aria-hidden
                    className="pointer-events-none absolute left-12 top-1/2 z-50 hidden h-10 -translate-y-1/2 items-center whitespace-nowrap rounded-lg bg-bg-2 px-2 font-body-16m text-text-primary opacity-0 shadow-[2px_0_2px_rgba(20,20,21,0.5)] transition-opacity desktop:flex group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                    {label}
                </span>
            )}
        </Link>
    )
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname()
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)

    if (pathname === '/onboarding') return null

    const mainMenus = [
        { name: '대시보드', path: '/dashboard', icon: <DashboardIcon /> },
        { name: '영상 리포트', path: '/reports', icon: <ReportIcon /> },
        { name: '트렌드 · 아이디어', path: '/ideas', icon: <IdeaIcon /> },
    ]

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-out desktop:hidden ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-[200px] transform-gpu flex-col bg-bg-1 px-4 py-8 shadow-[2px_0_2px_0_rgba(20,20,21,0.5)] transition-[width,transform,translate] duration-300 ease-out tablet:py-3 desktop:static desktop:z-20 desktop:h-screen desktop:translate-x-0 desktop:transform-none desktop:py-8 ${isDesktopCollapsed ? 'desktop:w-[72px]' : 'desktop:w-[192px]'} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{
                    height: '100dvh',
                    maxHeight: 'min(100dvh, -webkit-fill-available)',
                }}
            >
                <div className={`custom-scrollbar flex min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto ${isDesktopCollapsed ? 'desktop:overflow-visible' : ''}`}>
                    <div className="flex h-8 w-full shrink-0 items-center justify-between">
                        <div
                            className={`group/logo relative flex h-8 shrink-0 items-center overflow-hidden font-bold transition-[width,transform] duration-300 ${isDesktopCollapsed ? 'desktop:w-8 desktop:translate-x-1' : 'w-[120px] translate-x-0'}`}
                        >
                            <LogoIcon
                                className={`size-8 shrink-0 transition-opacity duration-150 ${isDesktopCollapsed ? 'group-hover/logo:opacity-0 group-focus-within/logo:opacity-0' : ''}`}
                            />
                            <span
                                aria-hidden={isDesktopCollapsed}
                                className={`-ml-[1.33px] overflow-hidden whitespace-nowrap text-[17.616px] tracking-tight text-primary-50 transition-[max-width,opacity] duration-300 ${isDesktopCollapsed ? 'desktop:max-w-0 desktop:opacity-0' : 'max-w-20 opacity-100'}`}
                            >
                                Chaneling
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsDesktopCollapsed(false)}
                                aria-hidden={!isDesktopCollapsed}
                                disabled={!isDesktopCollapsed}
                                className={`absolute inset-0 flex size-8 items-center justify-center text-icon-primary transition-opacity duration-150 ${isDesktopCollapsed ? 'pointer-events-auto opacity-0 group-hover/logo:opacity-100 group-focus-within/logo:opacity-100' : 'pointer-events-none opacity-0'}`}
                                aria-label="사이드바 펼치기"
                                tabIndex={isDesktopCollapsed ? 0 : -1}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex size-8 items-center justify-center text-icon-primary desktop:hidden"
                            aria-label="사이드바 닫기"
                        >
                            <CloseIcon />
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsDesktopCollapsed(true)}
                            aria-hidden={isDesktopCollapsed}
                            disabled={isDesktopCollapsed}
                            className={`hidden h-6 shrink-0 items-center justify-center overflow-hidden text-icon-primary transition-[width,opacity] duration-300 desktop:flex ${isDesktopCollapsed ? 'pointer-events-none w-0 opacity-0' : 'w-6 opacity-100'}`}
                            aria-label="사이드바 접기"
                            tabIndex={isDesktopCollapsed ? -1 : 0}
                        >
                            <CloseIcon className="size-6 shrink-0" />
                        </button>
                    </div>

                    <nav className="flex w-full shrink-0 flex-col gap-2" aria-label="주요 메뉴">
                        {mainMenus.map((menu) => (
                            <SidebarItem
                                key={menu.name}
                                href={menu.path}
                                icon={menu.icon}
                                isActive={pathname === menu.path || pathname?.startsWith(`${menu.path}/`)}
                                isDesktopCollapsed={isDesktopCollapsed}
                                label={menu.name}
                                onNavigate={onClose}
                            />
                        ))}
                    </nav>
                </div>

                <div className="mt-auto flex w-full shrink-0 flex-col gap-2">
                    <SidebarItem
                        href="/feedback"
                        icon={<FeedbackIcon className="size-[18px]" />}
                        isActive={pathname === '/feedback'}
                        isDesktopCollapsed={isDesktopCollapsed}
                        label="피드백 보내기"
                        onNavigate={onClose}
                    />
                    <div className="group/profile relative w-full">
                        <div
                            className={`flex w-full flex-col overflow-hidden rounded-lg p-2 transition-[max-height,gap,background-color] duration-300 hover:bg-bg-2 ${pathname === '/settings' ? 'bg-bg-2' : 'bg-transparent'} ${isDesktopCollapsed ? 'desktop:max-h-10 desktop:gap-0' : 'max-h-[109px] gap-2'}`}
                        >
                            <Link
                                href="/settings"
                                onClick={onClose}
                                aria-label="채널 설정"
                                className={`flex w-full shrink-0 items-center transition-[height,gap] duration-300 ${isDesktopCollapsed ? 'desktop:h-6 desktop:gap-0' : 'gap-2'}`}
                            >
                                <ProfileImage size={24} />
                                <span
                                    aria-hidden={isDesktopCollapsed}
                                    className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,max-height,opacity] duration-300 ${isDesktopCollapsed ? 'desktop:max-h-0 desktop:max-w-0 desktop:opacity-0' : 'max-h-12 max-w-[120px] flex-1 opacity-100'}`}
                                >
                                    <span className="block truncate font-caption-12r text-text-secondary desktop:text-[14px]">
                                        Free
                                    </span>
                                    <span className="block truncate font-body-14m text-text-primary desktop:text-[16px]">
                                        채널이름
                                    </span>
                                </span>
                            </Link>

                            <Link
                                href="/pricing"
                                onClick={onClose}
                                aria-hidden={isDesktopCollapsed}
                                className={`flex w-36 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-gray-30 px-0.5 font-body-14m text-text-primary transition-[max-height,padding,opacity,background-color] duration-300 hover:bg-gray-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active desktop:w-full desktop:text-[16px] ${isDesktopCollapsed ? 'pointer-events-none desktop:max-h-0 desktop:py-0 desktop:opacity-0' : 'max-h-10 py-2 opacity-100'}`}
                                tabIndex={isDesktopCollapsed ? -1 : 0}
                            >
                                플랜 업그레이드
                            </Link>
                        </div>

                        {isDesktopCollapsed && (
                            <span
                                aria-hidden
                                className="pointer-events-none absolute left-12 top-1/2 z-50 hidden h-10 -translate-y-1/2 items-center whitespace-nowrap rounded-lg bg-bg-2 px-2 font-body-16m text-text-primary opacity-0 shadow-[2px_0_2px_rgba(20,20,21,0.5)] transition-opacity desktop:flex group-hover/profile:opacity-100 group-focus-within/profile:opacity-100"
                            >
                                채널이름
                            </span>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}
