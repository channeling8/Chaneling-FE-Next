'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const hasFooter = pathname === '/' || pathname === '/landing' || pathname === '/pricing'

    return (
        <div className="flex min-h-screen flex-col bg-bg-0">
            <div className="flex flex-1 flex-col">{children}</div>
            {hasFooter && <Footer />}
        </div>
    )
}
