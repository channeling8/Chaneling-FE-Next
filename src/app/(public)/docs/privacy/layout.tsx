import { createPublicPageMetadata } from '@/config/metadata'

export const metadata = createPublicPageMetadata({
    title: '개인정보처리방침',
    description: '채널링의 개인정보 수집·이용, 보관, 위탁, 이용자 권리 및 개인정보 보호조치를 확인하세요.',
    path: '/docs/privacy',
})

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children
}
