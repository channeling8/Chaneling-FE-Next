import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/lib/providers'

export const metadata: Metadata = {
    title: '채널링 - 유튜브 분석 서비스',
    description: '유튜브 영상을 AI로 분석하고 인사이트를 얻으세요.',
    openGraph: {
        title: '채널링',
        description: '유튜브 영상을 AI로 분석하고 인사이트를 얻으세요.',
        type: 'website',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
