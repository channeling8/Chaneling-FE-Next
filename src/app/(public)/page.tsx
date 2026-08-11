import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: '/',
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: 'website',
    },
}

export { default } from './landing/page'
