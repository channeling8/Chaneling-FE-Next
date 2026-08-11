import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/config/site'
import { Providers } from '@/lib/providers'

export const metadata: Metadata = {
    metadataBase: siteConfig.url,
    applicationName: siteConfig.name,
    title: {
        default: siteConfig.title,
        template: siteConfig.titleTemplate,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.svg',
    },
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    formatDetection: {
        address: false,
        email: false,
        telephone: false,
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
