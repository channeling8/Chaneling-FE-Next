import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

const publicRoutes = ['/', '/pricing', '/docs/terms', '/docs/privacy'] as const

export default function sitemap(): MetadataRoute.Sitemap {
    return publicRoutes.map((route) => ({
        url: new URL(route, siteConfig.url).toString(),
    }))
}
