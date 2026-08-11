import { createPublicPageMetadata } from '@/config/metadata'

export const metadata = createPublicPageMetadata({
    title: '요금제',
    description: '채널링의 Free, Creator, Pro 요금제와 월간·연간 구독 혜택을 비교하고 채널에 맞는 플랜을 선택하세요.',
    path: '/pricing',
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children
}
