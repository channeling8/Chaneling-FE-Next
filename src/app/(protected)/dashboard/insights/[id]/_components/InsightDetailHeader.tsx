import Link from 'next/link'
import ArrowIcon from '@/assets/icons/arrow.svg'

export default function InsightDetailHeader() {
    return (
        <header className="sticky top-0 z-40 flex w-full items-center gap-2 bg-bg-0 py-4 desktop:py-5">
            <Link
                href="/dashboard"
                aria-label="대시보드로 돌아가기"
                className="-ml-1 flex size-8 shrink-0 items-center justify-center rounded-md text-icon-primary transition-colors hover:bg-bg-2 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-active"
            >
                <ArrowIcon aria-hidden className="size-6 rotate-180" />
            </Link>
            <h1 className="font-title-18sb text-text-primary">채널링의 제안 상세</h1>
        </header>
    )
}
