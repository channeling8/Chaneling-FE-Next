import { createPublicPageMetadata } from '@/config/metadata'

export const metadata = createPublicPageMetadata({
    title: '서비스 이용약관',
    description: '채널링 서비스의 이용 조건과 회원, 구독, 결제, 해지 및 환불 정책을 확인하세요.',
    path: '/docs/terms',
})

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children
}
