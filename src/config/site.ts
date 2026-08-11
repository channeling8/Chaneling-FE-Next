const PRODUCTION_SITE_URL = 'https://chaneling.com'
const LOCAL_SITE_URL = 'http://localhost:5173'

function resolveSiteUrl() {
    const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
    const fallbackSiteUrl = process.env.NODE_ENV === 'production' ? PRODUCTION_SITE_URL : LOCAL_SITE_URL
    const siteUrl = configuredSiteUrl || fallbackSiteUrl

    try {
        const url = new URL(siteUrl)

        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            throw new Error('http 또는 https 프로토콜이 필요합니다.')
        }

        return new URL(url.origin)
    } catch (error) {
        const reason = error instanceof Error ? error.message : '알 수 없는 오류'

        throw new Error(`NEXT_PUBLIC_SITE_URL이 올바른 URL이 아닙니다: ${siteUrl} (${reason})`)
    }
}

export const siteConfig = {
    name: '채널링',
    englishName: 'Chaneling',
    url: resolveSiteUrl(),
    locale: 'ko_KR',
    title: '채널링 | 유튜브 AI 분석·채널 성장 파트너',
    titleTemplate: '%s | 채널링',
    description: '유튜브 영상과 채널 데이터를 AI로 분석하고, 콘텐츠 개선 인사이트와 채널 성장 전략을 확인하세요.',
} as const
