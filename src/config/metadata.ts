import type { Metadata } from 'next'
import { siteConfig } from './site'

interface PublicPageMetadataOptions {
    title: string
    description: string
    path: `/${string}`
}

export function createPublicPageMetadata({ title, description, path }: PublicPageMetadataOptions): Metadata {
    const fullTitle = `${title} | ${siteConfig.name}`

    return {
        title,
        description,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title: fullTitle,
            description,
            url: path,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
        },
    }
}

export const noIndexMetadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
}
